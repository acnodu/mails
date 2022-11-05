import axios from 'axios';
import axiosRetry from 'axios-retry';

import sha1 from 'js-sha1';
import { useUserStore } from '@/stores/user';

const apiClient = axios.create({
  baseURL: 'https://eu.api.ovh.com/1.0',
  headers: {
    'content-type': 'application/json',
  },
});

axiosRetry(apiClient, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
});

export function displayApiCallError(error) {
  if (
    error != null
       && typeof error === 'object'
       && Object.prototype.hasOwnProperty.call(error, 'response')
       && Object.prototype.hasOwnProperty.call(error.response, 'data')
       && Object.prototype.hasOwnProperty.call(error.response.data, 'message')) {
    alert(error.response.data.message);
  }
  return Promise.reject(error);
}

apiClient.interceptors.request.use((request) => {
  const userStore = useUserStore();

  request.headers['X-Ovh-Timestamp'] = Math.round(Date.now() / 1000);

  // eslint-disable-next-line max-len
  const token = `$1$${sha1(`${userStore.AS}+${userStore.CK}+${request.method.toUpperCase()}+${request.baseURL}${request.url}+${JSON.stringify(request.data) || ''}+${request.headers['X-Ovh-Timestamp']}`)}`;

  request.headers['X-Ovh-Application'] = userStore.AK;
  request.headers['X-Ovh-Consumer'] = userStore.CK;
  request.headers['X-Ovh-Signature'] = token;

  return request;
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => displayApiCallError(error),
);

export { apiClient };

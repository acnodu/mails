import { apiClient } from '@/boot/axios';

export default {
  getDomains() {
    return apiClient.get('/email/domain');
  },

  getRedirections(domain) {
    return apiClient.get(`/email/domain/${domain}/redirection`);
  },

  getRedirectionDetails(domain, id) {
    return apiClient.get(`/email/domain/${domain}/redirection/${id}`);
  },
};

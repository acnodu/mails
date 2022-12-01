import { apiClient } from '@/boot/axios';

export default {
  getDomains() {
    return apiClient.get('/email/domain');
  },

  getRedirections(domain) {
    return apiClient.get(`/email/domain/${domain}/redirection`);
  },

  deleteRedirection(domain, id) {
    return apiClient.delete(`/email/domain/${domain}/redirection/${id}`);
  },

  getRedirectionDetails(domain, id) {
    return apiClient.get(`/email/domain/${domain}/redirection/${id}`);
  },

  postMail(from, to, domain) {
    return apiClient.post(`/email/domain/${domain}/redirection`, {
      from,
      to,
      localCopy: false,
    });
  },
};

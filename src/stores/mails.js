import { defineStore } from 'pinia';
import { mailsService } from '@/services';

export const useMailsStore = defineStore({
  id: 'mails',
  state: () => ({
    domains: [],
    selectedDomain: '',

    redirections: [],
  }),

  actions: {
    async init() {
      await this.getDomains();
      await this.setSelectedDomain(this.selectedDomain || this.domains[0]);
    },

    async getDomains() {
      return mailsService.getDomains().then((domains) => {
        this.domains = domains;
      });
    },

    async setSelectedDomain(domain) {
      if (this.domains.indexOf(domain) === -1) {
        return false;
      }

      this.selectedDomain = domain;
      this.redirections = [];

      return this.getRedirections();
    },

    async getRedirections() {
      if (this.selectedDomain === '') {
        return [];
      }

      const redirections = await mailsService.getRedirections(this.selectedDomain);
      this.redirections = redirections.map((id) => ({ id }));

      await this.getRedirectionsDetails();
      return true;
    },

    async getRedirectionsDetails() {
      await Promise.all(
        this.redirections.map(async (redirection) => {
          await mailsService.getRedirectionDetails(
            this.selectedDomain,
            redirection.id,
          ).then((details) => {
            const redirectionIndex = this.redirections.map((item) => item.id).indexOf(redirection.id);
            this.redirections[redirectionIndex] = details;
          });
        }),
      );
    },
  },
});

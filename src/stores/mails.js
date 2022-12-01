import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { mailsService } from '@/services';

function timeout(ms) {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const useMailsStore = defineStore({
  id: 'mails',
  state: () => ({
    domains: [],
    selectedDomain: useStorage('selectedDomain', ''),

    redirections: [],
  }),

  actions: {
    async init() {
      await this.getDomains();
      await this.setSelectedDomain(this.selectedDomain || this.domains[0]);
    },

    async getDomains() {
      return mailsService.getDomains().then((domains) => {
        this.domains = domains.sort();
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
          await mailsService
            .getRedirectionDetails(this.selectedDomain, redirection.id)
            .then((details) => {
              const redirectionIndex = this.redirections
                .map((item) => item.id)
                .indexOf(redirection.id);
              this.redirections[redirectionIndex] = details;
            });
        }),
      );
    },

    createRedirection({ from, to, domain }) {
      return mailsService.postMail(from, to, domain).then(async () => {
        await timeout(1000);
        await this.getRedirections();
      });
    },

    deleteRedirection({ domain, id }) {
      return mailsService.deleteRedirection(domain, id).then(() => {
        const index = this.redirections.findIndex((redirect) => redirect.id === id);
        this.redirections.splice(index, 1);
      });
    },
  },

  persistence: {
    enable: true,
    mode: 'localStorage',
  },
});

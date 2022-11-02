import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { userService } from '@/services';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    logged: false,

    AK: useStorage('AK', '543ba087ce09ec46'),
    AS: useStorage('AS', '6be7ce2d390cf25a97370e08733c4385'),
    CK: useStorage('CK', '239228476055ed87c0053cb5b691f88c'),

    infos: {},
  }),

  actions: {
    async init() {
      if (this.AK === '' || this.AS === '' || this.CK === '') {
        await this.logout();
        return false;
      }

      await this.set();

      return true;
    },

    async login(AK, AS, CK) {
      this.AK = AK;
      this.AS = AS;
      this.CK = CK;

      return this.set()
        .then(() => true)
        .catch(() => {
          this.logout();
          return false;
        });
    },

    async set() {
      return userService
        .me()
        .then((data) => {
          this.logged = true;
          this.infos = data;
          return true;
        })
        .catch(() => {
          this.logout();
        });
    },

    async logout() {
      this.logged = false;
      this.AK = '';
      this.AS = '';
      this.CK = '';
      this.infos = {};
    },
  },

  persistence: {
    enable: true,
    mode: 'localStorage',
  },
});

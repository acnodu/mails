import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { userService } from '@/services';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    logged: false,

    AK: useStorage('AK', ''),
    AS: useStorage('AS', ''),
    CK: useStorage('CK', ''),

    infos: {},
  }),

  actions: {
    async init() {
      console.log('init');
      if (this.AK === '' || this.AS === '' || this.CK === '') {
        console.log('false login');
        return false;
      }

      console.log('set');
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

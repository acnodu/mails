import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { userService } from '@/services';

const md5 = require('md5');

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    logged: false,

    loginStep: '',

    AK: process.env.VUE_APP_APP_KEY || 'ENV_APP_KEY',
    AS: process.env.VUE_APP_APP_SECRET || 'ENV_APP_SECRET',
    CK: process.env.VUE_APP_CONSUMER_KEY || 'ENV_CONSUMER_KEY',
    ENV_PASSWORD: process.env.VUE_APP_AUTH_MD5_PASSWORD || 'ENV_AUTH_MD5_PASSWORD',

    password: useStorage('password', ''),
    infos: {},
  }),

  actions: {
    async init() {
      if (this.password === '' || this.password !== this.ENV_PASSWORD) {
        this.loginStep = 'password';
        return false;
      }

      this.loginStep = 'ovhCredentials';

      await this.setUserInfos();
      return true;
    },

    async login(password) {
      if (md5(password) === this.ENV_PASSWORD) {
        this.password = md5(password);
        return true;
      }

      return false;
    },

    async setUserInfos() {
      return userService
        .me()
        .then((data) => {
          this.logged = true;
          this.infos = data;

          return true;
        })
        .catch(() => false);
    },

    async logout() {
      this.logged = false;
      this.passwordIsGood = false;
      this.ovhCredentialsAreGood = false;

      this.password = '';
      this.infos = {};
    },
  },

  persistence: {
    enable: true,
    mode: 'localStorage',
  },
});

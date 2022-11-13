import axios from 'axios';
import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import version from '@/assets/version.json';
import { useUserStore } from '@/stores/user';
import { useMailsStore } from '@/stores/mails';

export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    isLoaded: false,

    currentVersion: version,
    updateAvailable: false,
    showUpdateMessage: useStorage('hideUpdateMessage', true),
    refreshIfUpdate: useStorage('refreshIfUpdate', true),
  }),

  actions: {
    async init() {
      const userStore = useUserStore();
      const mailsStore = useMailsStore();

      await this.checkUpdate();
      await userStore.init();

      if (userStore.logged) {
        await mailsStore.init();
      }

      this.isLoaded = true;
    },

    async checkUpdate() {
      const distVersion = await axios.get(
        'https://raw.githubusercontent.com/acnodu/mails/main/package.json',
      );

      if (distVersion.status !== 200) {
        return false;
      }

      if (this.currentVersion === distVersion.data.version) {
        this.showUpdateMessage = true;
        this.refreshIfUpdate = true;
        return false;
      }

      if (this.refreshIfUpdate) {
        this.refreshIfUpdate = false;
        window.location.reload(true);
        return true;
      }

      this.updateAvailable = true;
      this.refreshIfUpdate = true;
      return true;
    },
  },

  persistence: {
    enable: true,
    mode: 'localStorage',
  },
});

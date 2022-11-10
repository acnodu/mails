import { defineStore } from 'pinia';
import axios from 'axios';
import { useUserStore } from '@/stores/user';
import { useMailsStore } from '@/stores/mails';
import version from '@/assets/version.json';

export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    isLoaded: false,

    currentVersion: version,
    updateAvailable: false,
  }),

  actions: {
    async init() {
      await this.checkLocalVersion();
      this.updateAvailable = await this.checkUpdate();
      const userStore = useUserStore();
      await userStore.init();
      if (userStore.logged) {
        const mailsStore = useMailsStore();
        await mailsStore.init();
        this.isLoaded = true;
      } else {
        this.isLoaded = true;
      }
    },

    async checkUpdate() {
      const distVersion = await axios.get(
        'https://raw.githubusercontent.com/acnodu/mails/main/jsconfig.json',
      );

      if (distVersion.status !== 200) {
        return false;
      }

      if (distVersion.data.version === this.currentVersion) {
        return false;
      }

      return true;
    },

    async checkLocalVersion() {
      const localVersion = await axios.get('/version.json');

      if (localVersion.data !== this.currentVersion) {
        window.location.reload(true);
        return false;
      }
      return true;
    },
  },
});

import { defineStore } from 'pinia';
import axios from 'axios';
import { useUserStore } from '@/stores/user';
import { useMailsStore } from '@/stores/mails';
import version from '@/assets/version.json';

export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    isLoaded: false,
  }),

  actions: {
    async init() {
      const distVersion = await axios.get('/version.json');
      if (distVersion.data !== version) {
        window.location.reload(true);
      } else {
        const userStore = useUserStore();

        await userStore.init();
        if (userStore.logged) {
          const mailsStore = useMailsStore();
          await mailsStore.init();
          this.isLoaded = true;
        } else {
          this.isLoaded = true;
        }
      }
    },
  },
});

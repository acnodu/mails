import { defineStore } from 'pinia';
import { useUserStore } from '@/stores/user';
import { useMailsStore } from '@/stores/mails';

export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    isLoaded: false,
  }),

  actions: {
    async init() {
      const userStore = useUserStore();

      await userStore.init();
      console.log('next');
      console.log(userStore);

      if (userStore.logged) {
        console.log('loggé');
        const mailsStore = useMailsStore();
        await mailsStore.init();
        this.isLoaded = true;
      } else {
        this.isLoaded = true;
      }
    },
  },
});

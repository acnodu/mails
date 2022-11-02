import { createRouter, createWebHashHistory } from 'vue-router';
import { useMainStore } from '@/stores/main';
import { useUserStore } from '@/stores/user';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../layouts/LoginLayout.vue'),
  },
  {
    path: '/',
    name: 'home',
    component: () => import('../layouts/MainLayout.vue'),

  },
  {
    path: '/edit/:mailid',
    name: 'editMail',
    component: () => import('../layouts/EditLayout.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const mainStore = useMainStore();

  if (!mainStore.isLoaded) {
    mainStore.init().then(() => {
      next();
    });
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  if (to.name !== 'login' && !userStore.logged) next({ name: 'login' });
  if (to.name === 'login' && userStore.logged) next({ name: 'home' });
  else next();
});

export default router;

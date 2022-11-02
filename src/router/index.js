import { createRouter, createWebHistory } from 'vue-router';
import { useMainStore } from '@/stores/main';

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
  history: createWebHistory(process.env.BASE_URL),
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

export default router;

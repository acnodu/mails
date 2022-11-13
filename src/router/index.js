import { createRouter, createWebHashHistory } from 'vue-router';
import { useMainStore } from '@/stores/main';
import { useUserStore } from '@/stores/user';

import {
  Login, Home, Edit, New, NewSuccess, Settings,
} from '@/layouts';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/new',
    name: 'new',
    component: New,
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings,
  },
  {
    path: '/new/success',
    name: 'newSuccess',
    component: NewSuccess,
  },
  {
    path: '/edit/:mailid',
    name: 'editMail',
    component: Edit,
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

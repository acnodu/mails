<template>
  <div class="container mb-5">
    <div class="row">
      <router-view v-if="isLoaded" />
      <LoadingLayout v-else />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { LoadingLayout } from './layouts';
import { useMainStore } from '@/stores/main';
import { useUserStore } from '@/stores/user';

const user = useUserStore();
const mainStore = useMainStore();
const isLoaded = computed(() => mainStore.isLoaded);

if (user.AK === '543ba087ce09ec46') {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = '/css/kripy.css';

  document.getElementsByTagName('head')[0].appendChild(link);
}
</script>

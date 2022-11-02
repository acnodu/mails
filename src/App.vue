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

const mainStore = useMainStore();
const isLoaded = computed(() => mainStore.isLoaded);
</script>

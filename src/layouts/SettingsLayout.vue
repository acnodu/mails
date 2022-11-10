<template>
  <Header
    title="App settings"
    sub-title="Redirections"
    sub-icon="bi-chevron-left"
    :to="{name:'home'}"
  />

  {{ version }}

  {{ storeTest.updateAvailable }}
  <br>

  <div @click="forceUpdate">
    Force Update
  </div>
</template>

<script setup>
import { Header } from '@/components';
import version from '@/assets/version.json';
import { useMainStore } from '@/stores/main';

const storeTest = useMainStore();

const forceUpdate = () => {
  window.location.reload(true);
};
</script>

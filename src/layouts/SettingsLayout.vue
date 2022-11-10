<template>
  <Header
    title="App settings"
    sub-title="Redirections"
    sub-icon="bi-chevron-left"
    :to="{name:'home'}"
  />

  {{ version }}

  <pre>
{{ store }}
    </pre>
</template>

<script setup>
import { Header } from '@/components';
import version from '@/assets/version.json';
import { useMainStore } from '@/stores/main';

const store = useMainStore();
</script>

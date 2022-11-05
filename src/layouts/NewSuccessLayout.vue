<template>
  <Header
    title="Created"
    sub-title="Redirections"
    sub-icon="bi-chevron-left"
    :to="{name:'home'}"
  />

  <div class="col-12 text-center mt-5 mb-4">
    <i
      style="font-size: 95px;"
      class="bi bi-check-circle text-success"
    />
  </div>

  <div class="col-12 px-5 text-center">
    <p>
      The redirect from "<b>{{ route.query.from }}</b>" to "<b>{{ route.query.to }}</b>" has been created !
    </p>

    <router-link
      type="button"
      class="btn btn-outline-success mt-4"
      :to="{name: 'home'}"
    >
      Go Home
    </router-link>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { Header } from '@/components';

const route = useRoute();
</script>

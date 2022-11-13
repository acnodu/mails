<template>
  <HomeOffcanvas />

  <div class="col-12">
    <h2
      class="mb-0"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasTop"
      aria-controls="offcanvasTop"
    >
      {{ domain }} <i
        style="font-size: 12px;"
        class="bi bi-chevron-down"
      />
    </h2>
  </div>
</template>

<script setup>
import {
  HomeOffcanvas,
} from '@/components';

defineProps({
  domain: {
    type: String,
    default: '',
  },
});
</script>

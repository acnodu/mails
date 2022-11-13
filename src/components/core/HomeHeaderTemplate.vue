<template>
  <HomeOffcanvas />

  <div
    id="homeHeader"
    class="col-12 mb-0 fixed-top bg-black pb-2"
  >
    <div class="row align-items-end gx-0 mt-4 pt-3">
      <div class="col-10">
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

      <div class="col-2 text-end">
        <i
          class="bi bi-plus-circle"
          style="color: #6B94D8;"
          @click="goToNew"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import {
  HomeOffcanvas,
} from '@/components';

const router = useRouter();

defineProps({
  domain: {
    type: String,
    default: '',
  },
});

const goToNew = () => {
  router.push({ name: 'new' });
};
</script>

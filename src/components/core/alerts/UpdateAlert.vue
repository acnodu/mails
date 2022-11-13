<template>
  <div
    v-if="showUpdateMessage"
    class="col-12 mb-3"
  >
    <div
      class="alert alert-primary alert-dismissible fade show mb-0"
      role="alert"
    >
      <strong>A new update is available</strong><br>
      Update your docker to benefit from the latest improvements.

      <button
        type="button"
        class="btn-close shadow-none"
        data-bs-dismiss="alert"
        aria-label="Close"
        @click="closeAlert"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useMainStore } from '@/stores/main';

const mainStore = useMainStore();

const showUpdateMessage = computed(() => {
  if (mainStore.showUpdateMessage && mainStore.updateAvailable) {
    return true;
  }
  return false;
});

const closeAlert = () => {
  mainStore.showUpdateMessage = false;
};
</script>

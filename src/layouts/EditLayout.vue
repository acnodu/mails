<template>
  <Header
    title="Edit redirection"
    sub-title="Redirections"
    sub-icon="bi-chevron-left"
    :to="{name:'home'}"
  />

  <div
    v-if="currentRedirection"
    class="col-12"
  >
    <FloatingInput
      v-model="currentRedirection.from"
      label="From:"
      class="mb-2"
      :disabled="true"
    />

    <FloatingInput
      id="test"
      v-model="currentRedirection.to"
      class="mb-4"
      label="To:"
    />
  </div>

  <div class="col-6">
    <button
      type="button"
      class="btn btn-lg w-100 btn-outline-secondary"
      @click="goHome"
    >
      Cancel
    </button>
  </div>

  <div class="col-6">
    <button
      type="button"
      class="btn btn-lg w-100 btn-success"
    >
      Save
    </button>
  </div>

  <div class="col-12 text-center mt-4">
    <router-link
      class="text-danger"
      :to="{name:'home'}"
    >
      Delete this mail
    </router-link>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMailsStore } from '@/stores/mails';
import { FloatingInput, Header } from '@/components';

const route = useRoute();
const router = useRouter();

const mailStore = useMailsStore();
const mailid = computed(() => route.params.mailid);
const currentRedirection = computed(() => mailStore.redirections.find((r) => r.id === mailid.value));

const goHome = () => {
  router.push({ name: 'home' });
};
onMounted(() => {
  if (!currentRedirection.value) {
    router.push({ name: 'home' });
  }
});
</script>

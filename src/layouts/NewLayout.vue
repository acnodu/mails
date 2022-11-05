<template>
  <Header
    title="Create redirection"
    sub-title="Redirections"
    sub-icon="bi-chevron-left"
    :to="{name:'home'}"
  />

  <div class="col-12">
    <FloatingInput
      v-model="from"
      autocomplete="off"
      type="text"
      autocapitalize="off"
      label="From:"
      class="mb-2"
      :disabled="isLoading"
    />

    <FloatingInput
      v-model="to"
      autocomplete="off"
      type="text"
      autocapitalize="off"
      label="To:"
      class="mb-2"
      :disabled="isLoading"
    />
  </div>

  <div class="col-6">
    <button
      type="button"
      class="btn btn-outline-danger w-100"
      :disabled="isLoading"
    >
      Cancel
    </button>
  </div>

  <div class="col-6">
    <button
      type="button"
      :disabled="!isValid || isLoading"
      class="btn btn-success w-100"
      @click="createRedirection"
    >
      Create
    </button>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Header, FloatingInput } from '@/components';
import { useMailsStore } from '@/stores/mails';

const router = useRouter();
const mails = useMailsStore();

const isLoading = ref(false);
const from = ref('testage@acnodu.fr');
const to = ref('acnodu@acnodu.fr');

const isValid = computed(() => {
  if (
    from.value.slice(-`@${mails.selectedDomain}`.length) === `@${mails.selectedDomain}`
    && from.value.length > mails.selectedDomain.length + 1
    && to.value) {
    return true;
  }

  return false;
});

const createRedirection = () => {
  isLoading.value = true;

  mails.createRedirection({
    from: from.value,
    to: to.value,
    domain: mails.selectedDomain,
  }).then(() => {
    isLoading.value = false;

    router.push({
      name: 'newSuccess',
      query: {
        from: from.value,
        to: to.value,
      },
    });
  }).catch(() => {
    isLoading.value = false;
  });
};
</script>

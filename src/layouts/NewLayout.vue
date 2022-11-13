<template>
  <Header
    title="Create redirection"
    sub-title="Redirections"
    sub-icon="bi-chevron-left"
    :to="{name:'home'}"
  />

  <div class="col-12">
    <div class="input-group input-group-lg mb-2">
      <input
        v-model="from"
        autocomplete="off"
        autocapitalize="off"
        :disabled="isLoading"
        type="text"
        class="form-control bg-black border-dark text-light shadow-none"
        name="code1"
        placeholder="From:"
        style="border-right: none;"
      >
      <span class="input-group-text bg-black border-dark text-light shadow-none">@{{ mails.selectedDomain }}</span>
    </div>

    <div class="input-group input-group-lg mb-4">
      <input
        v-model="to"
        type="text"
        class="form-control bg-black border-dark text-light shadow-none"
        name="code1"
        placeholder="To:"
        :disabled="isLoading"
      >
    </div>
  </div>

  <div class="col-6">
    <button
      type="button"
      class="btn btn-lg btn-outline-secondary w-100"
      :disabled="isLoading"
      @click="goHome"
    >
      Cancel
    </button>
  </div>

  <div class="col-6">
    <Button
      class="btn btn-lg btn-success w-100"
      :disabled="!isValid"
      :loading="isLoading"
      label="Create"
      @click="createRedirection"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Button, Header } from '@/components';
import { useMailsStore } from '@/stores/mails';
import { useUserStore } from '@/stores/user';

const user = useUserStore();
const router = useRouter();
const mails = useMailsStore();

const isLoading = ref(false);
const from = ref('');
const to = ref(user.DEFAULT_FORWARD || '');

const isValid = computed(() => {
  if (from.value && to.value) {
    return true;
  }

  return false;
});

const goHome = () => {
  router.push({ name: 'home' });
};

const createRedirection = () => {
  isLoading.value = true;

  mails.createRedirection({
    from: `${from.value}@${mails.selectedDomain}`,
    to: to.value,
    domain: mails.selectedDomain,
  }).then(() => {
    isLoading.value = false;

    router.push({
      name: 'newSuccess',
      query: {
        from: `${from.value}@${mails.selectedDomain}`,
        to: to.value,
      },
    });
  }).catch(() => {
    isLoading.value = false;
  });
};
</script>

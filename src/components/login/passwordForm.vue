<template>
  <Header title="Please sign" />

  <div class="col-12">
    <form action="">
      <FloatingInput
        v-model="password"
        type="password"
        label="Password"
      />

      <Button
        class="w-100 btn-lg btn-primary mt-3"
        :disabled="isDisabled"
        :loading="isLoading"
        label="Sign in"
        @click="login"
      />
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import { Button, FloatingInput, Header } from '@/components';

const userStore = useUserStore();

const password = ref('');
const isDisabled = ref(false);
const isLoading = ref(false);

const login = () => {
  userStore.login(password.value).then((success) => {
    if (success) {
      window.location.reload(true);
    } else {
      // eslint-disable-next-line no-alert
      alert('The password is invalid.');
    }
  });
};
</script>

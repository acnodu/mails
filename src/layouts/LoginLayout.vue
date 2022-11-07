<template>
  <Header title="Please sign.." />

  <div
    class="col-12"
  >
    <main
      class="form-signin"
    >
      <FloatingInput
        id="AK"
        v-model="applicationKey"
        autocomplete="off"
        type="text"
        autocapitalize="off"
        label="Application Key:"
      />

      <FloatingInput
        id="AS"
        v-model="applicationSecret"
        type="password"
        label="Application Secret:"
      />

      <FloatingInput
        id="CK"
        v-model="consumerKey"
        type="password"
        label="Consumer Key:"
      />

      <Button
        class="w-100 btn-lg btn-primary mt-3"
        :disabled="isDisabled"
        :loading="isLoading"
        label="Sign in"
        @click="login"
      />

      <p class="mt-3 text-muted">
        How to generate my secrets keys
      </p>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { Button, FloatingInput, Header } from '@/components';
import { useUserStore } from '@/stores/user';
import { useMainStore } from '@/stores/main';

const router = useRouter();
const userStore = useUserStore();
const mainStore = useMainStore();

const isLoading = ref(false);

const applicationKey = ref(userStore.AK);
const applicationSecret = ref(userStore.AS);
const consumerKey = ref(userStore.CK);

const isDisabled = computed(() => {
  if (applicationKey.value === '' || applicationSecret.value === '' || consumerKey.value === '' || isLoading.value === true) {
    return true;
  }
  return false;
});

const login = () => {
  isLoading.value = true;

  userStore.login(applicationKey.value, applicationSecret.value, consumerKey.value).then(() => {
    mainStore.init().then(() => {
      isLoading.value = false;
      router.push({ name: 'home' });
    });
  });
};

// onMounted(() => {
//   if (navigator.standalone) {
//     setTimeout(() => {
//       document.location.href = 'http://your.com/whatever.php?randomjunk=1234')
//     }, 1000);
//   }
// });
</script>

<style>
.form-signin input[id="AK"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[id="AS"] {
  margin-bottom: -1px;
  border-radius: 0;
}
.form-signin input[id="CK"] {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>

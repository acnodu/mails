<template>
  <PasswordForm v-if="loginStep === 'password'" />
  <OVHForm v-if="loginStep === 'ovhCredentials'" />
</template>

<script setup>
import { PasswordForm, OVHForm } from '@/components';
import { useUserStore } from '@/stores/user';

const UserStore = useUserStore();

const { loginStep } = UserStore;
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

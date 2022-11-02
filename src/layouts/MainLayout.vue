<template>
  <Header
    title="Redirections"
    :options="[{
      icon: 'bi-plus-square',
      color: '#6B94D8'
    }]"
  />

  <div
    v-if="redirections.length >= 10"
    class="col-12"
  >
    <div
      class="input-group mb-3"
      :class="[searchIsFocused?'input-group-lg':'']"
    >
      <span
        id="basic-addon1"
        class="input-group-text bg-dark border-0 text-light shadow-none"
      ><i class="bi bi-search" /></span>
      <input
        type="text"
        class="form-control bg-dark border-0 text-light shadow-none"
        placeholder="Search"
        @focus="searchIsFocused = true"
        @blur="searchIsFocused = false"
      >
    </div>
  </div>

  <div class="col-12">
    <MailItem
      v-for="(redirection, index) in redirections"
      :key="index"
      :redirection="redirection"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useMailsStore } from '@/stores/mails';
import { MailItem, Header } from '@/components';

const searchIsFocused = ref(false);

const mailsStore = useMailsStore();

const redirections = computed({
  get() {
    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    return mailsStore.redirections.sort((a, b) => ((a.from > b.from) ? 1 : ((b.from > a.from) ? -1 : 0)));
  },
});

</script>

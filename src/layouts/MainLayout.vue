<template>
  <Header
    title="Redirections"
    :options="[{
      icon: 'bi-plus-square',
      color: '#712cf9'
    }]"
  />

  <div class="col-12">
    <MailItem
      v-for="(redirection, index) in redirections"
      :key="index"
      :redirection="redirection"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useMailsStore } from '@/stores/mails';
import { MailItem, Header } from '@/components';

const mailsStore = useMailsStore();

const redirections = computed({
  get() {
    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    return mailsStore.redirections.sort((a, b) => ((a.from > b.from) ? 1 : ((b.from > a.from) ? -1 : 0)));
  },
});

</script>

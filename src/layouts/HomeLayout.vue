<template>
  <Header
    title="Redirections"
    :options="[{
      icon: 'bi-plus-square',
      color: '#6B94D8',
      to: {name:'new'}
    }]"
    :animable="true"
    :class="[hideHeader?'animatedHidden':'header']"
  />

  <div
    v-if="mailsStore.redirections.length >= 8"
    class="col-12"
    :class="[hideHeader?'test mt-3':'normal']"
  >
    <div
      class="input-group mb-3"
    >
      <span
        v-if="searchIsFocus"
        id="basic-addon1"
        class="input-group-text bg-dark border-0 text-light shadow-none"
        @click="search = ''"
      >
        <i class="bi bi-x-lg" />
      </span>

      <span
        v-else
        id="basic-addon1"
        class="input-group-text bg-dark border-0 text-light shadow-none"
      >
        <i class="bi bi-search" />
      </span>

      <input
        v-model="search"
        type="text"
        class="form-control bg-dark border-0 text-light shadow-none"
        placeholder="Search"
        autocomplete="off"
        @focus="searchIsFocus=true"
        @blur="searchIsFocus=false"
        @input="search=search.toLowerCase()"
      >
      <span
        v-if="search"
        id="basic-addon1"
        class="input-group-text bg-dark border-0 text-light shadow-none text-muted"
      >{{ redirectionsList.length }}/{{ mailsStore.redirections.length }}</span>
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

const searchIsFocus = ref(false);
const search = ref('');
const mailsStore = useMailsStore();

const hideHeader = computed(() => {
  if (searchIsFocus.value || search.value !== '') {
    return true;
  }

  return false;
});

const redirectionsList = computed(() => {
  const list = mailsStore.redirections;

  if (search.value === '') {
    return list;
  }

  return list.filter((r) => r.from.includes(search.value) || r.to.includes(search.value));
});

const redirections = computed({
  get() {
    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    return redirectionsList.value.sort((a, b) => ((a.from > b.from) ? 1 : ((b.from > a.from) ? -1 : 0)));
  },
});

</script>

<style scoped>
.header{
  top: 0;
  transition: all 0.2s linear;
}

.animatedHidden{
  top: -100px;
  position: absolute;
  transition: all 0.2s linear;
}

.normal{
  margin-top: 82.73px;

  transition: all 0.2s linear;
}

.test{
  transition: all 0.2s linear;
}
</style>

<template>
  <HomeHeader
    :domain="mailsStore.selectedDomain"
    :selectedemails="selectedEmails"
    :class-name="[hideHeader?'animatedHidden':'header']"
    @purgeselectedmails="selectedEmails=[]"
  />

  <div
    class="col-12 sticky-top bg-black"
    :class="[hideHeader?'test py-3':'normal mb-3']"
  >
    <div
      class="input-group"
    >
      <span
        id="basic-addon1"
        class="input-group-text bg-dark border-0 text-light shadow-none"
      >
        <i
          v-if="!hideHeader"
          class="bi bi-search"
        />
        <i
          v-else
          class="bi bi-x-lg"
          @click="search = ''"
        />
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

  <UpdateAlert />

  <div class="col-12">
    <div class="card text-light border-0">
      <ul class="list-group list-group-flush">
        <MailItem
          v-for="(redirection, index) in redirections"
          :key="index"
          :selectedemails="selectedEmails"
          :redirection="redirection"
          @toggleselectedmail="toggleSelectedMail"
        />
      </ul>
    </div>
  </div>

  <div
    v-if="redirections.length === 0 && search !== ''"
    class="col-12"
  >
    <div class="card">
      <div class="card-body">
        <p class="card-text text-light">
          <b>{{ search }}@{{ selectedDomain }}</b> redirect does not exist.
        </p>

        <div class="col mx-auto d-grid gap-2">
          <router-link
            class="btn btn-success"
            :to="{name:'new', query: {from:search}}"
          >
            Create It
          </router-link>
        </div>
      </div>
    </div>
  </div>

  <div class="col-12 text-center text-muted py-3">
    <i style="font-size: 10px;">Application version: <span @click="forceReload">{{ version }}</span></i>
  </div>
</template>

<script setup>
import {
  computed, ref, onMounted, watch,
} from 'vue';
import { useMailsStore } from '@/stores/mails';
import {
  MailItem, HomeHeader, UpdateAlert,
} from '@/components';
import version from '@/assets/version.json';

const mailsStore = useMailsStore();

const search = ref('');
const headerHeight = ref(0);
const selectedEmails = ref([]);
const searchIsFocus = ref(false);

const selectedDomain = computed(() => mailsStore.selectedDomain);
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

const toggleSelectedMail = (redirection) => {
  if (selectedEmails.value.includes(redirection)) {
    const index = selectedEmails.value.findIndex((obj) => obj.id === redirection.id);
    selectedEmails.value.splice(index, 1);
  } else {
    selectedEmails.value.push(redirection);
  }
};

const forceReload = () => {
  window.location.reload(true);
};

onMounted(() => {
  headerHeight.value = `${document.getElementById('homeHeader').offsetHeight + 1}px`;
});

watch(selectedDomain, () => {
  selectedEmails.value = [];
});
</script>

<style scoped>
.normal{
  margin-top: 78px;
  transition: all 0.1s linear;
}

.test{
  margin-top: 0px;
  transition: all 0.15s linear;
}
</style>

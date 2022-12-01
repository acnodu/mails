<template>
  <div
    id="offcanvasTop"
    class="offcanvas offcanvas-top h-100 text-white bg-black"
    tabindex="-1"
    aria-labelledby="offcanvasTopLabel"
  >
    <div class="offcanvas-header px-0 mt-4 pt-3">
      <h2 class="offcanvas-title mb-0">
        <b>Select domain</b>
      </h2>
      <i
        id="close"
        class="bi bi-x-circle"
        data-bs-dismiss="offcanvas"
        :class="[isLoading?'invisible':'']"
      />
    </div>

    <div class="offcanvas-body px-0">
      <div
        v-for="(domain, index) in mailStore.domains"
        :key="index"
        class="col-12"
      >
        <h6
          class="mb-3 row"
          @click="setNewDomain(domain)"
        >
          <div class="col-1">
            <div
              v-if="isLoading && domain === mailStore.selectedDomain"
              class="spinner-grow spinner-grow-sm text-success"
              role="status"
            />

            <i
              v-if="!isLoading && domain === mailStore.selectedDomain"
              class="bi bi-arrow-right text-success"
            />
          </div>
          <div
            class="col"
            :class="[domain === mailStore.selectedDomain?'text-success':'']"
          >
            <b>{{ domain }}</b>
          </div>
        </h6>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useMailsStore } from '@/stores/mails';

const mailStore = useMailsStore();
const isLoading = ref(false);

const setNewDomain = (domain) => {
  if (domain !== mailStore.selectedDomain) {
    if (!isLoading.value) {
      isLoading.value = true;

      mailStore.setSelectedDomain(domain).then(() => {
        document.getElementById('close').click();
        isLoading.value = false;
      });
    }
  }
};
</script>

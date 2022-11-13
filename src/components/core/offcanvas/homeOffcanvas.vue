<template>
  <div
    id="offcanvasTop"
    class="offcanvas offcanvas-top h-100 text-white bg-black"
    tabindex="-1"
    aria-labelledby="offcanvasTopLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title">
        Select domain
      </h5>
      <i
        id="close"
        class="bi bi-x-circle"
        data-bs-dismiss="offcanvas"
        :class="[isLoading?'invisible':'']"
      />
    </div>

    <div class="offcanvas-body container">
      <div class="row align-items-center">
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
                class="bi bi-check-lg text-success"
              />
            </div>
            <div class="col">
              {{ domain }}
            </div>
          </h6>
        </div>
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
  if (!isLoading.value) {
    isLoading.value = true;

    mailStore.setSelectedDomain(domain).then(() => {
      document.getElementById('close').click();
      isLoading.value = false;
    });
  }
};
</script>

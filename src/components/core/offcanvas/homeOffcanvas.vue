<template>
  <div
    id="offcanvasTop"
    class="offcanvas offcanvas-top text-bg-dark"
    tabindex="-1"
    aria-labelledby="offcanvasTopLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title">
        Select domain
      </h5>
    </div>

    <div class="offcanvas-body py-0">
      <h6
        v-for="(domain, index) in mailStore.domains"
        :key="index"
        class="row mb-3"
        @click="setNewDomain(domain)"
      >
        <div class="col-1">
          <i
            v-if="domain === mailStore.selectedDomain"
            class="bi bi-check-lg text-success"
          />
        </div>
        <div class="col">
          {{ domain }}
        </div>
      </h6>
    </div>
  </div>
</template>

<script setup>
import { useMailsStore } from '@/stores/mails';

const mailStore = useMailsStore();

const setNewDomain = (domain) => {
  mailStore.setSelectedDomain(domain);
};
</script>

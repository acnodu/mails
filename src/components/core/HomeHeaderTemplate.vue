<template>
  <SelectDomainOffcanvas />
  <DeleteMailsOffcanvas
    :selectedemails="selectedemails"
    @purgeselectedmails="$emit('purgeselectedmails')"
  />

  <div
    id="homeHeader"
    class="col-12 mb-0 fixed-top bg-black pb-2"
    :class="className"
  >
    <div class="row align-items-end gx-0 mt-4 pt-3">
      <div class="col-10">
        <h2
          class="mb-0"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasTop"
          aria-controls="offcanvasTop"
        >
          <b>{{ domain }} <i
            style="font-size: 12px;"
            class="bi bi-chevron-down"
          /></b>
        </h2>
      </div>

      <div class="col-2 text-end">
        <i
          v-if="selectedemails.length > 0"
          class="bi bi-trash3"
          style="color: #dc3545; font-size: 18px; margin-right: 10px;"
          data-bs-toggle="offcanvas"
          data-bs-target="#deleteMailsOffcanvas"
          aria-controls="deleteMailsOffcanvas"
        />

        <i
          class="bi bi-plus-circle ml-5"
          style="color: #6B94D8; font-size: 18px;"
          @click="goToNew"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import {
  SelectDomainOffcanvas, DeleteMailsOffcanvas,
} from '@/components';

const router = useRouter();

defineEmits(['purgeselectedmails']);

defineProps({
  domain: {
    type: String,
    default: '',
  },

  className: {
    type: Array,
    default: () => [],
  },

  selectedemails: {
    type: Array,
    required: true,
  },
});

const goToNew = () => {
  router.push({ name: 'new' });
};
</script>

<style scoped>
.header{
  top: 0;
  transition: all 0.15s linear;
}

.animatedHidden{
  top: -79px;
  position: absolute;
  transition: all 0.1s linear;
}
</style>

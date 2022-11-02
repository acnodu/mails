<template>
  <div
    id="staticBackdrop"
    class="offcanvas offcanvas-start text-light bg-black"
    data-bs-backdrop="static"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
  >
    <div class="offcanvas-header">
      <h5
        id="staticBackdropLabel"
        class="offcanvas-title"
      >
        Edit mail {{ redirection.id }}
      </h5>
      <button
        id="close"
        type="button"
        class="btn-close d-none"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      />
    </div>
    <div class="offcanvas-body">
      <div>
        <FloatingInput
          id="from"
          v-model="from"
          autocomplete="off"
          type="text"
          autocapitalize="off"
          label="From:"
          :disabled="true"
        />

        <FloatingInput
          id="to"
          v-model="to"
          autocomplete="off"
          type="text"
          autocapitalize="off"
          label="To:"
        />

        {{ newTo }}<br>
        <div class="row mt-3">
          <div class="col-6">
            <button
              type="button"
              class="btn btn-danger w-100"
              @click="cancel"
            >
              Cancel
            </button>
          </div>
          <div class="col-6">
            <button
              type="button"
              class="btn btn-success w-100"
              :disabled="isDisabled"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { FloatingInput } from '@/components';

const newTo = ref('');

const emit = defineEmits(['resetEdit']);

const props = defineProps({
  redirection: {
    type: Object,
    required: true,
  },
});

const from = computed(() => props.redirection.from);

const to = computed({
  get() {
    return props.redirection.to;
  },

  set(n) {
    newTo.value = n;
  },
});

const isDisabled = computed(() => {
  if (newTo.value === '' || newTo.value === props.redirection.to) {
    return true;
  }
  return false;
});

const cancel = () => {
  newTo.value = '';
  emit('resetEdit');
  document.getElementById('close').click();
};
</script>

<style>
input[id="from"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
input[id="to"] {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>

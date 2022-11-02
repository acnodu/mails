<template>
  <div
    class="card bg-dark border-dark text-light mb-2"
  >
    <div class="card-body  py-2 ">
      <div class="row placeholder-glow align-items-center ">
        <div class="col-10">
          <p
            class="card-text mb-0"
          >
            {{ from }}
          </p>
          <p class="card-text mb-0">
            <small
              class="text-muted"
            >{{ to }}</small>
          </p>
        </div>

        <div
          v-if="isEditable"
          class="col-2 text-right"
        >
          <MailContextualMenu :redirection="redirection" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { MailContextualMenu } from '@/components';

const props = defineProps({
  redirection: {
    type: Object,
    required: true,
  },
});

const to = computed(() => (props.redirection.to || ''));
const from = computed(() => (props.redirection.from ? props.redirection.from.split('@')[0] : ''));

const isEditable = computed(() => {
  if (to.value === '' || from.value === '') {
    return false;
  }
  return true;
});
</script>

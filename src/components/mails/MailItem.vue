<template>
  <li class="list-group-item">
    <router-link
      class="row placeholder-glow align-items-center"
      :to="{name: 'editMail', params:{mailid:id}}"
    >
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
        class="col-2 text-end h-100"
        style="font-size: 24px;"
        @click.prevent="toggleSelect"
      >
        <i
          v-if="isSelected === false"
          class="bi bi-circle text-muted"
        />

        <i
          v-if="isSelected === true"
          class="bi bi-check-circle text-success"
        />
      </div>
    </router-link>
  </li>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  redirection: {
    type: Object,
    required: true,
  },

  selectedemails: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['toggleselectedmail']);

const to = computed(() => (props.redirection.to || ''));
const id = computed(() => (props.redirection.id || ''));
const from = computed(() => (props.redirection.from ? props.redirection.from.split('@')[0] : ''));
const isSelected = computed(() => props.selectedemails.includes(props.redirection));

const toggleSelect = () => {
  emit('toggleselectedmail', props.redirection);
};
</script>

<style scoped>
a, a:hover{
  color: inherit;
  text-decoration: none;
}
</style>

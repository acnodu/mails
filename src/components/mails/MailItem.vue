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
});

const to = computed(() => (props.redirection.to || ''));
const id = computed(() => (props.redirection.id || ''));
const from = computed(() => (props.redirection.from ? props.redirection.from.split('@')[0] : ''));
</script>

<style scoped>
a, a:hover{
  color: inherit;
  text-decoration: none;
}
</style>

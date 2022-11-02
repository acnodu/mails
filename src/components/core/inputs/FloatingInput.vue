<template>
  <div class="form-floating">
    <input
      v-bind="$attrs"
      :id="id"
      :disabled="disabled"
      :value="modelValue"
      :placeholder="label"
      class="form-control shadow-none"
      :class="inputClass"
      :autofocus="autofocus"
      @input="$emit('update:modelValue', $event.target.value)"
    >
    <label for="floatingInput">{{ label }}</label>
  </div>
</template>

<script setup>
import { computed } from 'vue';

defineEmits(['update:modelValue']);

const props = defineProps({
  label: {
    type: [String, Boolean],
    default: false,
  },

  disabled: {
    type: Boolean,
    default: false,
  },

  modelValue: {
    type: String,
    default: '',
  },

  autofocus: {
    type: Boolean,
    default: false,
  },

  id: {
    type: String,
    default: '',
  },

  mode: {
    type: String,
    default: 'black',
  },
});

const inputClass = computed(() => {
  switch (props.mode) {
    case 'dark':
      return 'bg-dark border-light text-light';
    default:
      return 'bg-black border-dark text-light';
  }
});
</script>

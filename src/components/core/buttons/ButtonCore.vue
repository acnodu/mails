<template>
  <button
    class="btn"
    type="submit"
    :disabled="disabled"
  >
    <span
      class="spinner-grow spinner-grow-sm"
      role="status"
      aria-hidden="true"
      :class="[loading?'':'visually-hidden']"
    />
    <span :class="[loading?'visually-hidden':'']">{{ label }}</span>
  </button>
</template>

<script setup>
defineProps({
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },

  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },

  label: {
    type: String,
    required: false,
    default: '',
  },
});
</script>

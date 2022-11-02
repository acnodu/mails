<template>
  <div
    class="col-12 pt-4 pb-2 mb-2 sticky-top bg-black"
  >
    <div class="row">
      <div class="col-9 pt-4">
        <h1 class="mb-0">
          <b>{{ title }}</b>
        </h1>
      </div>

      <div
        class="col-3"
        style="position: relative;"
      >
        <div
          v-if="icon === 'profile'"
          class="profile"
          @click="goTo"
        >
          <i class="bi bi-person-fill" />
        </div>

        <div
          v-if="icon === 'back'"
          class="back"
          @click="goTo"
        >
          <i class="bi bi-arrow-left-short" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  title: {
    type: String,
    default: '',
  },

  icon: {
    type: String,
    default: null,
  },

  to: {
    type: Object,
    default: () => {},
  },
});

const goTo = () => {
  router.push(props.to);
};
</script>

<style scoped>
.profile{
  bottom: 0;
  right: calc(var(--bs-gutter-x) * .5);
  width: 48px;
  height: 48px;
  position: absolute;
  background: var(--bs-dark);
  border-radius: 24px;
  text-align: center;
  font-size: 45px;
  overflow: hidden;
}

.back{
  font-size: 55px;
  position: absolute;
  right: calc(var(--bs-gutter-x) * .5);
}
</style>

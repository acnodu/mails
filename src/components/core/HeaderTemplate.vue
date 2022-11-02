<template>
  <div
    class="col-12 pb-2 mb-2 sticky-top bg-black"
  >
    <div
      v-if="subTitle === null"
      class="row mt-5"
    >
      <div class="col-12 ">
        <h1 class="mb-0">
          <b>{{ title }}</b>
        </h1>
      </div>
    </div>

    <div
      v-else
      class="row mt-4"
    >
      <div class="col-12">
        <p
          class="mb-0"
          style="font-size: 13px;"
        >
          <i
            class="bi"
            :class="subIcon"
          />
          {{ subTitle }}
        </p>
      </div>
      <div class="col-12 pt-1">
        <h1 class="mb-0">
          <b>{{ title }}</b>
        </h1>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { useRouter } from 'vue-router';

defineProps({
  title: {
    type: String,
    default: '',
  },

  subTitle: {
    type: String,
    default: null,
  },

  subIcon: {
    type: String,
    default: null,
  },

  to: {
    type: Object,
    default: () => {},
  },
});

// const goTo = () => {
//   router.push(props.to);
// };
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

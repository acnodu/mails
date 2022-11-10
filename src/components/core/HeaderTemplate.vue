<template>
  <div
    class="col-12 pb-2 mb-2 bg-black"
    :class="[animable?'fixed-top':'sticky-top']"
  >
    <div class="row align-items-end">
      <div
        v-if="subTitle === null"
        class="col-8 mt-4 pt-3"
      >
        <h1 class="mb-0">
          <b>{{ title }}</b>
        </h1>
      </div>

      <div
        v-else
        class="col-8 mt-3"
      >
        <p
          class="mb-0"
          style="font-size: 13px;"
          @click="goTo()"
        >
          <i
            class="bi"
            :class="subIcon"
          />
          {{ subTitle }}
        </p>

        <h1 class="mb-0 pt-1">
          <b>{{ title }}</b>
        </h1>
      </div>

      <div
        class="col-4 text-end"
        style="line-height: 0;"
      >
        <i
          v-for="(option, index) in options"
          :key="index"
          :style="`font-size: 26px; margin-left: 12px; color: ${option.color||'white'};`"
          :class="option.icon"
          class="bi"
          @click="goTo(option.to)"
        />
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

  subTitle: {
    type: String,
    default: null,
  },

  subIcon: {
    type: String,
    default: null,
  },

  options: {
    type: Array,
    default: () => [],
  },

  to: {
    type: Object,
    default: () => {},
  },

  animable: {
    type: Boolean,
    default: false,
  },
});

const goTo = (name = undefined) => {
  router.push(name || props.to);
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

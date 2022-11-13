<template>
  <div class="col-12 text-center mt-5 pt-5">
    <div class="wrapper">
      <svg
        id="Layer_1"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 98.5 98.5"
        enable-background="new 0 0 98.5 98.5"
        xml:space="preserve"
      >
        <path
          class="checkmark"
          fill="none"
          stroke-width="8"
          stroke-miterlimit="10"
          d="M81.7,17.8C73.5,9.3,62,4,49.2,4C24.3,4,4,24.3,4,49.2s20.3,45.2,45.2,45.2s45.2-20.3,45.2-45.2c0-8.6-2.4-16.6-6.5-23.4l0,0L45.6,68.2L24.7,47.3"
        />
      </svg>
    </div>
  </div>

  <div class="col-12 px-2 text-center">
    <p class="my-5">
      The new redirect "<b>{{ route.query.from }}</b>"<br>to "<b>{{ route.query.to }}</b>" has been created !
    </p>

    <router-link
      type="button"
      class="btn btn-outline-success"
      :to="{name: 'home'}"
    >
      Go Home
    </router-link>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { } from '@/components';

const route = useRoute();
</script>

<style scoped>
.wrapper {
  width: 100px;
  margin: 4em auto 0;
}

.checkmark {
  stroke: #198754;
  stroke-dashoffset: 745.74853515625;
  stroke-dasharray: 745.74853515625;
  animation: dash 2s ease-out forwards;
}

@keyframes dash {
  0% {
    stroke-dashoffset: 745.74853515625;
  }
  100% {
    stroke-dashoffset: 0;
  }
}
</style>

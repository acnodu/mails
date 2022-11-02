<template>
  <div class="d-flex justify-content-end">
    <button
      type="button"
      class="btn btn-dark text-muted"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <i class="bi bi-three-dots" />
    </button>

    <ul
      class="dropdown-menu dropdown-menu-end dropdown-menu-dark shadow-none border-dark"
    >
      <router-link :to="{name: 'editMail', params: {mailid: redirection.id}}">
        <li
          class="py-1 dropdown-item"
        >
          <i
            class="bi bi-pencil"
          /> Edit
        </li>
      </router-link>

      <li><hr class="dropdown-divider"></li>

      <li>
        <a
          class="py-1 dropdown-item text-danger"
          href="#"
        ><b><i class="bi bi-trash3" /> Delete</b></a>
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  redirection: {
    type: Object,
    default: () => {},
  },
});

</script>

<style scoped>
i{
  margin-right: 10px!important;
}
a{
  text-decoration: none;
}
.border-dark{
    color: #6c757d!important;
    border-color: #6c757d!important;
}
</style>

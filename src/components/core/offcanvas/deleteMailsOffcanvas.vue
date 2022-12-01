<template>
  <div
    id="deleteMailsOffcanvas"
    class="offcanvas offcanvas-top h-100 text-white bg-black"
    tabindex="-1"
    aria-labelledby="deleteMailsOffcanvasLabel"
  >
    <div class="offcanvas-header px-0 mt-4 pt-3">
      <h2 class="offcanvas-title mb-0">
        <b>Delete Redirection(s)</b>
      </h2>
      <i
        id="closeDeleteMailsOffcanvas"
        class="bi bi-x-circle"
        data-bs-dismiss="offcanvas"
        :class="[isUnderDelete?'invisible':'']"
      />
    </div>

    <div class="offcanvas-body px-0">
      <div
        v-for="(mail, index) in selectedemails"
        :key="index"
        class="col-12"
      >
        <h6
          class="mb-3 row"
        >
          <div
            class="col-1"
          >
            <i
              v-if="isDeleted.includes(mail.id)"
              class="bi bi-check text-success"
            />

            <div
              v-if="! isDeleted.includes(mail.id) && isUnderDelete"
              class="spinner-grow spinner-grow-sm text-success"
              role="status"
            />

            <i
              v-if="! isDeleted.includes(mail.id) && ! isUnderDelete"
              class="bi bi-arrow-right text-light"
            />
          </div>
          <div
            class="col"
            :class="[isDeleted.includes(mail.id)?'text-success':'text-light']"
          >
            <b>{{ mail.from }}</b>
          </div>
        </h6>
      </div>

      <div class="col-12 mt-4 pt-3">
        <div class="form-check mt-0 pt-0">
          <input
            id="flexCheckDefault"
            v-model="confirmDelete"
            class="form-check-input text-success"
            type="checkbox"
            :disabled="isUnderDelete"
          >
          <label
            class="form-check-label"
            for="flexCheckDefault"
          >
            I confirm that I want to delete my redirects
          </label>
        </div>

        <Button
          class="btn btn-outline-danger w-100 mt-4 btn-lg"
          :disabled="! confirmDelete"
          :loading="isUnderDelete"
          label="Delete redirects"
          @click="deleteRedirects"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useMailsStore } from '@/stores/mails';
import {
  Button,
} from '@/components';

const mails = useMailsStore();

const isUnderDelete = ref(false);
const confirmDelete = ref(false);
const isDeleted = ref([]);

const props = defineProps({
  selectedemails: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits('purgeselectedmails');

const deleteRedirects = async () => {
  isUnderDelete.value = true;

  await Promise.all(
    props.selectedemails.map(async (redirect) => {
      const payload = { domain: mails.selectedDomain, id: redirect.id };

      await mails.deleteRedirection(payload).then(() => {
        isDeleted.value.push(redirect.id);
      });
    }),
  );

  document.getElementById('closeDeleteMailsOffcanvas').click();
  isUnderDelete.value = false;
  isDeleted.value = [];

  emit('purgeselectedmails');
};
</script>

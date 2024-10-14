<script setup>
import { ref } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
const value = ref('')
</script>
<template>
  <div class="p-3">
    <div class="rounded-3xl border w-full flex items-center bg-white">
      <Button icon="pi pi-search" class="border-transparent text-neutral-950 bg-white" rounded outlined aria-label="Search" />
      <InputText type="text" v-model="value" :fluid="true" class="border-none border-transparent rounded-3xl px-1 shadow-none" placeholder="Search" />
    </div>
  </div>
</template>
<style scoped></style>

<script setup>
import { ref, useTemplateRef } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
const inputDom = useTemplateRef('inputDom')
const value = ref('')
defineExpose({
  inputDom: inputDom
})
</script>
<template>
  <div class="p-3" ref="inputDom">
    <div class="rounded-3xl border w-full flex items-center bg-white">
      <!-- <i class="pi pi-search text-2xl px-2"></i> -->
      <Button
        icon="pi pi-search"
        class="border-transparent text-neutral-950 bg-white"
        rounded
        outlined
        aria-label="Search"
      />
      <InputText
        type="text"
        v-model="value"
        :fluid="true"
        class="border-none border-transparent rounded-3xl px-1 shadow-none"
        placeholder="Search"
      />
    </div>
  </div>
</template>
<style scoped></style>

<script setup>
import Checkbox from 'primevue/checkbox'
const checkBoxData = defineModel('checkBoxData')
defineProps({
  categoryData: {
    type: Object,
    default: () => ({})
  }
})
</script>
<template>
  <ul class="flex flex-col gap-y-2">
    <li>
      <p class="font-medium">{{ categoryData.label }}</p>
      <p></p>
    </li>
    <li v-for="optionItem in categoryData.options" :key="optionItem.name" class="flex items-center gap-x-2">
      <Checkbox v-model="checkBoxData" :inputId="optionItem.name" :value="optionItem.name" />
      <label :for="optionItem.name" class="flex flex-grow">
        <p>{{ optionItem.name }}</p>
        <span class="ms-auto text-[12px] text-primary-800 flex items-center">+ $ {{ optionItem.price }}</span>
      </label>
    </li>
  </ul>
</template>
<style scoped></style>

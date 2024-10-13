<script setup>
import RadioButton from 'primevue/radiobutton'
const raddioData = defineModel('raddioData')
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
    <li v-for="optionItem in categoryData.options" :key="optionItem">
      <RadioButton v-model="raddioData" :inputId="optionItem.name" :value="optionItem.name" />
      <label :for="optionItem.name" class="ml-2">{{ optionItem.value }}</label>
    </li>
  </ul>
</template>
<style scoped></style>

<script setup>
import Chip from 'primevue/chip'
import Textarea from 'primevue/textarea'
import { useCheckoutStore } from '@/stores/checkout'
const checkoutStore = useCheckoutStore()
</script>
<template>
  <div class="p-3 flex flex-col gap-y-2">
    <div class="flex items-center justify-between">
      <h3>特殊需求</h3>
      <Chip label="選填" class="py-[2px] px-[10px] text-[12px] bg-primary-200"></Chip>
    </div>
    <Textarea fluid rows="3" v-model="checkoutStore.checkoutFormData.note" />
  </div>
</template>
<style scoped></style>

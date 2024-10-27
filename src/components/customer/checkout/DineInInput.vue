<script setup>
import { ref } from 'vue'
import Chip from 'primevue/chip'
import InputText from 'primevue/inputtext'
import { useCheckoutStore } from '@/stores/customer/checkout'
const checkoutStore = useCheckoutStore()
</script>
<template>
  <div class="p-3 flex flex-col gap-y-3">
    <div class="flex items-center justify-between">
      <h2 class="font-bold text-xl">
        <label for="dineInNumber">內用桌號</label>
      </h2>
      <Chip label="必填" class="py-[2px] px-[10px] text-[12px] bg-primary-200"></Chip>
    </div>
    <InputText type="text" id="dineInNumber" v-model="checkoutStore.checkoutFormData.table" placeholder="請填寫桌號" fluid class="rounded-3xl" />
  </div>
</template>
<style scoped></style>

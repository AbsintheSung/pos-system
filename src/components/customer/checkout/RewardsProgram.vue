<script setup>
import { ref } from 'vue'
import Chip from 'primevue/chip'
import InputText from 'primevue/inputtext'
import { useCheckoutStore } from '@/stores/checkout'
const checkoutStore = useCheckoutStore()
const rewardPoints = ref(null) //集點
</script>
<template>
  <div class="p-3 flex flex-col gap-y-3">
    <div class="flex items-center justify-between">
      <h2 class="font-bold text-xl">
        <label for="rewardPoints">會員集點</label>
      </h2>
      <Chip label="選填" class="py-[2px] px-[10px] text-[12px] bg-primary-200"></Chip>
    </div>
    <InputText type="text" id="rewardPoints" v-model="checkoutStore.checkoutFormData.phone" placeholder="請輸入手機號碼" fluid class="rounded-3xl" />
  </div>
</template>
<style scoped></style>

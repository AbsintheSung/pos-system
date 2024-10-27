<script setup>
import { ref } from 'vue'
import { useCheckoutStore } from '@/stores/customer/checkout'
import Chip from 'primevue/chip'
import DatePicker from 'primevue/datepicker'
import dayjs from 'dayjs'

const checkoutStore = useCheckoutStore()
const reserveDate = ref() //遇缺自取-時間(日)
const updateDate = () => {
  const now = dayjs(reserveDate.value)
  const formattedDate = now.format('YYYY-MM-DD')
  const formattedTime = now.format('HH:mm')
  checkoutStore.checkoutFormData.takeDate = formattedDate
  checkoutStore.checkoutFormData.takeTime = formattedTime
  console.log(checkoutStore.checkoutFormData)
}
const updateTime = () => {
  const now = dayjs(reserveDate.value)
  const formattedTime = now.format('HH:mm')
  checkoutStore.checkoutFormData.takeTime = formattedTime
  console.log(checkoutStore.checkoutFormData)
}
</script>
<template>
  <div class="p-3 flex flex-col gap-y-3">
    <div class="flex items-center justify-between">
      <h2 class="font-bold text-xl">自取時間</h2>
      <Chip label="必填" class="py-[2px] px-[10px] text-[12px] bg-primary-200"></Chip>
    </div>
    <DatePicker
      v-model="reserveDate"
      showButtonBar
      fluid
      pt:root:class="custome-input-radius"
      pt:panel:class="mt-2"
      :showOtherMonths="false"
      @update:modelValue="updateDate"
    />
    <DatePicker
      id="datepicker-timeonly"
      v-model="reserveDate"
      timeOnly
      fluid
      :stepMinute="5"
      pt:root:class="custome-input-radius"
      pt:panel:class="mt-2"
      @update:modelValue="updateTime"
    />
  </div>
</template>
<style scoped>
:deep(.custome-input-radius) {
  > .p-datepicker-input {
    border-radius: 1.5rem !important;
  }
}
</style>

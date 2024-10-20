<script setup>
import { ref } from 'vue'
import Chip from 'primevue/chip'
import DatePicker from 'primevue/datepicker'
const reserveDate = ref(new Date()) //遇缺自取-時間(日)
</script>
<template>
  <div class="p-3 flex flex-col gap-y-3">
    <div class="flex items-center justify-between">
      <h2 class="font-bold text-xl">自取時間</h2>
      <Chip label="必填" class="py-[2px] px-[10px] text-[12px] bg-primary-200"></Chip>
    </div>
    <DatePicker v-model="reserveDate" showButtonBar fluid pt:root:class="custome-input-radius" pt:panel:class="mt-2" :showOtherMonths="false" />
    <DatePicker
      id="datepicker-timeonly"
      v-model="reserveDate"
      timeOnly
      fluid
      :stepMinute="5"
      pt:root:class="custome-input-radius"
      pt:panel:class="mt-2"
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

<script setup>
import { ref, watch } from 'vue'
import { useCheckoutStore } from '@/stores/customer/checkout'
import dayjs from 'dayjs'
import Chip from 'primevue/chip'
import InputText from 'primevue/inputtext'
import DatePicker from 'primevue/datepicker'

const checkoutStore = useCheckoutStore()
const reserveDate = ref() //遇缺自取-時間(日)
const updateDate = () => {
  const now = dayjs(reserveDate.value)
  const formattedDate = now.format('YYYY-MM-DD')
  const formattedTime = now.format('HH:mm')
  checkoutStore.checkoutFormData.takeDate = formattedDate
  checkoutStore.checkoutFormData.takeTime = formattedTime
  // console.log(checkoutStore.checkoutFormData)
}
const updateTime = () => {
  const now = dayjs(reserveDate.value)
  const formattedTime = now.format('HH:mm')
  checkoutStore.checkoutFormData.takeTime = formattedTime
  // console.log(checkoutStore.checkoutFormData)
}

defineProps({
  getPickUpFoodState: {
    type: Object,
    default: () => ({})
  }
})
</script>
<template>
  <form class="p-3 flex flex-col gap-y-3">
    <!-- 內用桌號區塊 -->
    <div class="flex items-center justify-between flex-wrap gap-y-3" v-show="getPickUpFoodState.dineInSection">
      <h2 class="font-bold text-xl">
        <label for="dineInNumber">內用桌號</label>
      </h2>
      <Chip label="必填" class="py-[2px] px-[10px] text-[12px] bg-primary-200"></Chip>
      <InputText type="text" id="dineInNumber" v-model="checkoutStore.checkoutFormData.table" placeholder="請填寫桌號" fluid class="rounded-3xl" />
    </div>

    <!-- 時間區塊 -->
    <div class="flex flex-col gap-y-3" v-show="getPickUpFoodState.reserveSection">
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

    <!-- 集點區塊 -->
    <div class="flex items-center justify-between flex-wrap gap-y-3">
      <h2 class="font-bold text-xl">
        <label for="rewardPoints">會員集點</label>
      </h2>
      <Chip label="選填" class="py-[2px] px-[10px] text-[12px] bg-primary-200"></Chip>
      <InputText
        type="text"
        id="rewardPoints"
        v-model="checkoutStore.checkoutFormData.phone"
        placeholder="請輸入手機號碼"
        fluid
        class="rounded-3xl"
      />
    </div>
  </form>
</template>
<style scoped>
/* 時間區塊 */
:deep(.custome-input-radius) {
  > .p-datepicker-input {
    border-radius: 1.5rem !important;
  }
}
</style>

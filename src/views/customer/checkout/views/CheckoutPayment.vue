<script setup>
import { ref, computed } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import SelectButton from 'primevue/selectbutton'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import RadioButton from 'primevue/radiobutton'

// PayStates 枚舉
const PayStates = {
  CASH_PAYMENT: 'cashPayment', //現金付款
  LINE_PAYMENT: 'linePayment' //linePay付款
}

// ReceiptStates 枚舉
const ReceiptStates = {
  PHONE_CARRIER: 'phoneCarrier', //手機載具
  UNIFIED_NUMBER: 'unifiedNumber', //公司統一編號
  DONATION_RECEIPT: 'donationReceipt', //捐贈發票
  PAPER_RECEIPT: 'paperReceipt' //紙本
}

const windowScroll = useWindowScroll()
const windowScrollY = ref(windowScroll.y)
const payState = ref(PayStates.CASH_PAYMENT)
const selectedReceipt = ref(ReceiptStates.PAPER_RECEIPT)

const payOptions = ref([
  { name: '現金付款', value: PayStates.CASH_PAYMENT },
  { name: 'Line Pay', value: PayStates.LINE_PAYMENT }
])

const receiptOptions = ref([
  { name: '手機載具', value: ReceiptStates.PHONE_CARRIER, hasInput: false, placeholder: '請輸入載具號碼(/-ABCD12)' },
  { name: '公司統一編號', value: ReceiptStates.UNIFIED_NUMBER, hasInput: false, placeholder: '請輸入統一編號' },
  { name: '捐贈發票', value: ReceiptStates.DONATION_RECEIPT, hasInput: false, placeholder: '' },
  { name: '發票紙本證明聯', value: ReceiptStates.PAPER_RECEIPT, hasInput: false, placeholder: '' }
])

const handleReceipt = (val) => {
  const index = receiptOptions.value.findIndex((item) => item.value === val)
  receiptOptions.value.forEach((item) => (item.hasInput = false))
  if (val === ReceiptStates.PHONE_CARRIER || val === ReceiptStates.UNIFIED_NUMBER) {
    receiptOptions.value[index].hasInput = true
  }
}

const handlePay = (val) => {
  windowScrollY.value = 0
  console.log(val)
}
</script>
<template>
  <div class="p-3 flex flex-col gap-y-2">
    <h2 class="font-bold text-xl">付款資訊</h2>
    <SelectButton
      v-model="payState"
      :options="payOptions"
      optionLabel="name"
      optionValue="value"
      :allowEmpty="false"
      aria-labelledby="basic"
      pt:root:class="bg-primary-50 border-transparent flex gap-x-3 pay-button"
      @update:modelValue="handlePay"
    />
  </div>
  <div class="p-3 flex flex-col gap-y-2">
    <h2>發票資訊</h2>
    <div class="flex flex-col gap-4">
      <div v-for="receiptItem in receiptOptions" :key="receiptItem.value" class="flex items-center flex-wrap gap-y-2">
        <RadioButton
          v-model="selectedReceipt"
          :inputId="receiptItem.value"
          name="dynamic"
          :value="receiptItem.value"
          @update:modelValue="handleReceipt"
        />
        <label :for="receiptItem.value" class="ml-2">{{ receiptItem.name }}</label>
        <InputText v-if="receiptItem.hasInput" type="text" :placeholder="receiptItem.placeholder" class="rounded-3xl" fluid />
      </div>
    </div>
  </div>
  <div class="p-3 flex flex-col gap-y-2">
    <h2 class="font-bold text-xl">訂單內容</h2>
    <Card class="border-neutral-950 border shadow-none" pt:body:class="p-3">
      <template #content>
        <div class="flex items-center gap-x-3">
          <div class="bg-primary-100 p-1 flex justify-center items-center w-9 h-9 rounded-md">
            <p class="font-bold">1</p>
          </div>
          <h3 class="font-bold">經典美式咖啡</h3>
          <span class="text-neutral-400 font-normal text-[14px]">少冰</span>
          <div class="flex-grow">
            <p class="font-medium text-end">$120</p>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>
<style lang="scss" scoped>
:deep(.p-togglebutton) {
  padding: 8px 24px;
  background-color: $neutral-50;
  border: 1px solid $neutral-300;
  border-radius: 1.5rem;
}
:deep(.p-togglebutton-checked) {
  color: $primary-700;
  border: 1px solid $primary-700;
}
:deep(.p-togglebutton-checked)::before {
  background-color: transparent;
  box-shadow: none;
}
:deep(.p-togglebutton-label) {
  font-size: 0.75em;
}
:deep(.pay-button) {
  > .p-togglebutton {
    width: 50%;
  }
}
</style>

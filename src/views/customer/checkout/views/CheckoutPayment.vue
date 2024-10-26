<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useWindowScroll } from '@vueuse/core'
import { useElementBounding } from '@vueuse/core'
import { useOrderStore } from '@/stores/order.js'
import { useCheckoutStore } from '@/stores/checkout'
import { useCookie } from '@/composables/useCookie'
import SelectButton from 'primevue/selectbutton'
import Card from 'primevue/card'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import RadioButton from 'primevue/radiobutton'
const router = useRouter()
const orderStore = useOrderStore()
const checkoutStore = useCheckoutStore()
const useCookies = useCookie()
const footerButtonDiv = ref(null)
const getFooterButtonDiv = useElementBounding(footerButtonDiv)
// PayStates 枚舉
const PayStates = {
  CASH_PAYMENT: 'cashPayment', //現金付款
  LINE_PAYMENT: 'linePayment' //linePay付款
}

// ReceiptStates 枚舉
const ReceiptStates = {
  PHONE_CARRIER: '載具', //手機載具
  UNIFIED_NUMBER: '統編', //公司統一編號
  DONATION_RECEIPT: '捐贈發票', //捐贈發票
  PAPER_RECEIPT: '紙本' //紙本
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
  if (payState.value === PayStates.CASH_PAYMENT) {
    checkoutStore.checkoutCash.invoice = val
    checkoutStore.checkoutCash.invoiceCarrier = ''
  }
  if (payState.value === PayStates.LINE_PAYMENT) {
    checkoutStore.checkoutLinePay.invoice = val
    checkoutStore.checkoutLinePay.invoiceCarrier = ''
  }
  // checkoutStore.checkoutCash.invoice = val
  // checkoutStore.checkoutCash.invoiceCarrier = ''
}

const handlePay = (val) => {
  windowScrollY.value = 0
  selectedReceipt.value = ReceiptStates.PAPER_RECEIPT
}

const handleNextStage = async () => {
  if (payState.value === PayStates.CASH_PAYMENT) {
    const response = await checkoutStore.fetchUpdateCheckoutCash()
    if (response.statusCode === 200) {
      router.push('/customer/checkout/completed')
    }
  }
  if (payState.value === PayStates.LINE_PAYMENT) {
    const response = await checkoutStore.fetchUpdateCheckoutLinePay()
    if (response.statusCode === 200) {
      window.location.href = response.data.paymentUrl
      // router.push('/customer/checkout/completed')
    }
  }
  // const response = await checkoutStore.fetchUpdateCheckoutCash()
  // if (response.statusCode === 200) {
  //   router.push('/customer/checkout/completed')
  // }
}
const handlePreviousStage = () => {
  // windowScrollY.value = 0
  router.push('/customer/checkout/orderinfo')
}

onMounted(() => {
  if (!useCookies.checkOrderInfoExist()) {
    router.push('/customer/checkout/orderinfo')
  }
  checkoutStore.checkoutCash.invoice = selectedReceipt.value
})
watch(
  () => payState.value,
  () => {
    receiptOptions.value.forEach((item) => (item.hasInput = false))
  }
)
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
        <InputText
          v-model="checkoutStore.checkoutCash.invoiceCarrier"
          v-if="receiptItem.hasInput"
          type="text"
          :placeholder="receiptItem.placeholder"
          class="rounded-3xl"
          fluid
        />
      </div>
    </div>
  </div>
  <div class="p-3 flex flex-col gap-y-2">
    <h2 class="font-bold text-xl">訂單內容</h2>
    <ul class="flex flex-col gap-y-3">
      <li v-for="orderItem in orderStore.getCartList" :key="orderItem.orderItemId">
        <Card class="border-neutral-950 border shadow-none" pt:body:class="p-3">
          <template #content>
            <div class="flex items-center gap-x-3">
              <div class="bg-primary-100 p-1 flex-shrink-0 flex justify-center items-center w-9 h-9 rounded-md">
                <p class="font-bold">{{ orderItem.serving }}</p>
              </div>
              <h3 class="font-bold whitespace-nowrap">{{ orderItem.name }}</h3>
              <p class="text-neutral-400 font-normal text-[14px] flex-grow">
                <span v-for="(customItem, index) in orderItem.customization" :key="customItem">
                  {{ customItem }}<span v-if="index < orderItem.customization.length - 1"> | </span>
                </span>
              </p>
              <div class="ms-auto">
                <p class="font-medium text-end whitespace-nowrap">$ {{ orderItem.price }}</p>
              </div>
            </div>
          </template>
        </Card>
      </li>
    </ul>
  </div>

  <div class="flex items-center justify-between p-3">
    <p class="font-bold">應付金額</p>
    <p class="font-bold">$ {{ orderStore.getCartTotalPrice }}</p>
  </div>

  <div>
    <div :style="{ paddingTop: `${getFooterButtonDiv.height.value}px` }"></div>
    <div
      class="flex items-center gap-x-3 px-3 py-4 fixed bottom-0 mx-auto w-full max-w-screen-sm bg-primary-50 z-10 border-t border-neutral-500 font-medium"
      ref="footerButtonDiv"
    >
      <Button class="py-2 px-3 bg-neutral-50 rounded-3xl border-neutral-200 text-neutral-950" @click="handlePreviousStage"><p>上一步</p></Button>
      <Button
        class="py-2 bg-primary-700 rounded-3xl border-transparent flex-grow flex items-center justify-between"
        @click="handleNextStage"
        :disabled="orderStore.getCartListLength === 0"
      >
        <p class="border border-neutral-50 px-2 rounded-md">1</p>
        <p>送出訂單</p>
        <p>$ {{ orderStore.getCartTotalPrice }}</p>
      </Button>
    </div>
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

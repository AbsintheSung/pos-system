<script setup>
import { computed, ref, watch } from 'vue'
import { useFohOrderStore } from '@/stores/staff/foh/order'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import RadioButton from 'primevue/radiobutton'
import Button from 'primevue/button'
const route = useRoute()
const router = useRouter()
const fohOrderStore = useFohOrderStore()
const isShowDialog = ref(false)
const settleData = ref({}) //付款完成後，存放資訊
const orderData = ref({
  orderId: route.params.orderId, // 訂單編號
  cash: null, //客人付的現金(int)
  note: '', //付款備註(可空)
  invoice: '紙本', //發票類型 1"載具" 2"統編" 3"捐贈發票" 4"紙本"
  invoiceCarrier: '', //發票載具號碼or統編
  phone: '' //顧客電話(可空)
})
// 計算還需給付的金額或找零金額
const paymentStatus = computed(() => {
  const difference = orderData.value.cash - fohOrderStore.getDetailTotalAmount
  if (difference < 0) {
    return {
      type: 'insufficient',
      amount: Math.abs(difference)
    }
  }
  return {
    type: 'change',
    amount: difference
  }
})

//核對是否大於金額
const isCheck = computed(() => (orderData.value.cash - fohOrderStore.getDetailTotalAmount >= 0 ? true : false))

//點擊 返回 staff-foh-home/order/all
const handleBlack = () => {
  fohOrderStore.resetOrderDetail()
  router.push('/staff-foh-home/order/all')
}

onMounted(async () => {
  orderData.value.phone = fohOrderStore.getOrderDetail.phone
  if (!fohOrderStore.getIsDetail) return
  const orderId = route.params.orderId
  await fohOrderStore.fetchOrderDetail(orderId)
  orderData.value.phone = fohOrderStore.getOrderDetail.phone
})

// ReceiptStates 枚舉
const ReceiptStates = {
  PHONE_CARRIER: '載具', //手機載具
  UNIFIED_NUMBER: '統編', //公司統一編號
  DONATION_RECEIPT: '捐贈發票', //捐贈發票
  PAPER_RECEIPT: '紙本' //紙本
}
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
    orderData.value.invoiceCarrier = ''
    receiptOptions.value[index].hasInput = true
  }
}
const handleOrderForm = () => {
  console.log(orderData.value)
}
const handleOrderCheck = async () => {
  if (isCheck.value) {
    //結清，可能需要找零或不需要
    try {
      const response = await fohOrderStore.fetchOrderCheckout(orderData.value)
      settleData.value = response.checkoutData
      isShowDialog.value = true
    } catch (error) {
      console.log(error)
    }
  } else {
    //未結清，無法發送api
  }
}
const handleHideDialog = () => {
  isShowDialog.value = false
  router.push('/staff-foh-home/order/all')
}
</script>
<template>
  <Dialog v-model:visible="isShowDialog" modal pt:root:class="w-[410px]" @hide="handleHideDialog">
    <template #header>
      <h2 class="w-full text-center">結帳完成</h2>
    </template>
    <div class="flex flex-col gap-y-3">
      <div class="flex flex-col gap-y-3">
        <p>發票號碼 : {{ settleData.invoiceNumber }}</p>
        <p>會員手機 : {{ settleData.phone || '無' }}</p>
      </div>
      <div class="flex items-center justify-between gap-x-8">
        <div class="flex flex-col gap-y-2">
          <h3>現金支付</h3>
          <p>$ {{ settleData.cash }}</p>
        </div>
        <div class="flex flex-col gap-y-2">
          <h3>找零</h3>
          <p>$ {{ settleData.change }}</p>
        </div>
        <div class="flex flex-col gap-y-2">
          <h3>新增點數</h3>
          <div class="flex items-center justify-center">
            <p class="w-5 h-5 bg-neutral-950 text-neutral-50 flex justify-center items-center rounded-full"><span>P</span></p>
            <p>&nbsp;{{ settleData.point }}</p>
          </div>
        </div>
      </div>
    </div>
  </Dialog>
  <div class="h-full flex-grow flex flex-col px-6">
    <div class="-ms-3 flex items-center gap-x-6">
      <button @click="handleBlack">
        <i class="pi pi-angle-left" style="font-size: 2rem"></i>
      </button>
      <p class="font-bold text-xl">選擇結帳方式</p>
    </div>
    <form class="flex-1 flex flex-col gap-y-4 font-medium">
      <div class="flex flex-col gap-y-4">
        <h2>現金</h2>
        <div class="flex items-center gap-x-6">
          <label for="staff-cash">現金面額</label>
          <InputText id="staff-cash" class="w-1/2 rounded-3xl no-spinner" type="number" min="0" v-model="orderData.cash" />
        </div>
        <div :class="{ 'text-red-500': paymentStatus.type === 'insufficient' }">
          <p v-if="paymentStatus.type === 'insufficient'">尚需給付：$ {{ paymentStatus.amount }}</p>
          <p v-else>找零金額：$ {{ paymentStatus.amount }}</p>
        </div>
        <div class="w-full flex items-center gap-x-6">
          <label for="staff-cashnote">付款備註</label>
          <InputText id="staff-cashnote" class="w-1/2 rounded-3xl" type="text" v-model="orderData.note" />
        </div>
      </div>
      <div>
        <h2 class="py-2">台灣發票選項</h2>
        <div class="flex flex-col gap-4">
          <div v-for="receiptItem in receiptOptions" :key="receiptItem.value" class="h-12 flex items-center flex-nowrap gap-y-2 gap-x-6">
            <RadioButton
              v-model="orderData.invoice"
              :inputId="receiptItem.value"
              name="dynamic"
              :value="receiptItem.value"
              @update:modelValue="handleReceipt"
            />
            <label :for="receiptItem.value" class="ml-2">{{ receiptItem.name }}</label>
            <InputText
              v-model="orderData.invoiceCarrier"
              v-if="receiptItem.hasInput"
              type="text"
              :placeholder="receiptItem.placeholder"
              class="rounded-3xl w-1/2"
            />
          </div>
        </div>
      </div>
      <div>
        <h2 class="py-2">會員訂單集點</h2>
        <div class="flex items-center gap-x-6">
          <label for="staff-phone">會員手機</label>
          <InputText id="staff-phone" class="w-1/2 rounded-3xl no-spinner" type="phone" v-model="orderData.phone" />
        </div>
      </div>
    </form>
  </div>

  <div class="w-[360px] flex flex-col border border-neutral-950 bg-neutral-50">
    <h2 class="mb-auto w-full py-3 text-center text-neutral-50 bg-primary-700">訂單詳細資訊</h2>
    <div class="py-4 px-6 text-2xl flex flex-col items-center gap-y-3 h-full">
      <div class="w-full flex justify-between items-center">
        <h3 class="font-bold text-2xl">{{ fohOrderStore.getOrderDetail.typeAndNumber }}</h3>
        <span class="ms-auto text-xl">{{ fohOrderStore.getOrderDetail.orderStatus }}</span>
      </div>
      <ul class="w-full text-xl flex flex-col items-start gap-y-2">
        <li class="flex items-center gap-x-2">
          <i class="pi pi-phone"></i>
          <p>{{ fohOrderStore.getOrderDetail.phone === null ? '無' : fohOrderStore.getOrderDetail.phone }}</p>
        </li>
        <li class="flex items-center gap-x-2">
          <i class="pi pi-clock"></i>
          <p>{{ fohOrderStore.getOrderDetail.time }}</p>
        </li>
        <li class="flex items-center gap-x-2">
          <i class="pi pi-clipboard"></i>
          <p>{{ fohOrderStore.getOrderDetail.orderNumber }}</p>
        </li>
      </ul>
      <div class="py-4 w-full flex-grow border-t border-b border-neutral-400">
        <ul class="text-xs flex flex-col gap-y-1 overflow-y-auto" :style="{ height: `${450}px` }">
          <li v-for="(detailItem, index) in fohOrderStore.getOrderDetail.items" :key="index" class="flex border-b border-gray-100 pb-2">
            <div class="w-1/2 pr-2 flex flex-col">
              <div class="font-bold">{{ detailItem.name }}</div>
              <div class="text-sm text-gray-500 mt-1 flex-grow">{{ detailItem.customization }}</div>
            </div>
            <div class="w-1/4 flex items-center justify-center">{{ detailItem.serving }}</div>
            <div class="w-1/4 flex items-center justify-end">$ {{ detailItem.price }}</div>
          </li>
        </ul>
      </div>
      <div class="mt-auto w-full text-xl flex flex-col gap-y-1">
        <div class="flex items-center">
          <p class="me-auto">數量</p>
          <p>{{ fohOrderStore.getDetailTotalServing }}</p>
        </div>
        <div class="flex items-center">
          <p class="me-auto">總計</p>
          <p>$ {{ fohOrderStore.getDetailTotalAmount }}</p>
        </div>
      </div>
      <div class="w-full flex flex-nowrap gap-x-4">
        <Button class="w-1/3 py-1 rounded-3xl text-neutral-950 bg-neutral-50 border border-neutral-400">取消訂單</Button>
        <Button class="w-2/3 py-1 rounded-3xl" @click="handleOrderCheck">完成付款</Button>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
/* 隱藏 Chrome, Safari, Edge, Opera 的箭頭 */
.no-spinner::-webkit-outer-spin-button,
.no-spinner::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* 隱藏 Firefox 的箭頭 */
// .no-spinner[type='number'] {
//   -moz-appearance: textfield;
// }
</style>

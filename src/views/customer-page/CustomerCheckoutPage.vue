<script setup>
import { onMounted, ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useElementBounding } from '@vueuse/core'
import { useWindowScroll } from '@vueuse/core'
import SelectButton from 'primevue/selectbutton'
import Button from 'primevue/button'
import CustomerContainer from '@/layout/CustomerContainer.vue'
import DineInInput from '@/components/customer/checkout/DineInInput.vue'
import CustomPickUpDate from '@/components/customer/checkout/CustomPickUpDate.vue'
import RewardsProgram from '@/components/customer/checkout/RewardsProgram.vue'
import CheckoutOrderContent from '@/components/customer/checkout/CheckoutOrderContent.vue'
import SpecialNeeds from '@/components/customer/checkout/SpecialNeeds.vue'
import OrderTimeLine from '@/components/customer/checkout/OrderTimeLine.vue'
const windowScroll = useWindowScroll()
const router = useRouter()
const OrderStages = {
  ORDER_INFO: 'orderInfo', // 訂單資訊
  PAYMENT_INFO: 'paymentInfo', // 付款資訊
  CONFIRMATION: 'confirmation' // 確認送出
}
const PickUpFoodState = {
  TAKE_OUT: 'takeOut',
  RESERVE: 'reserve',
  DINE_IN: 'dineIn'
}
const PayStates = {
  CASH_PAYMENT: 'cashPayment',
  LINE_PAYMENY: 'linePayment'
}
const footerButtonDiv = ref(null)
const getFooterButtonDiv = useElementBounding(footerButtonDiv)
const windowScrollY = ref(windowScroll.y)
const orderNowStatus = ref(OrderStages.ORDER_INFO) // 初始為訂單資訊階段
const pickUpFoodState = ref(PickUpFoodState.TAKE_OUT) //選擇按鈕狀態( 預約、自取... )
const payState = ref(PayStates.CASH_PAYMENT)
const orderStatus = ref([
  { title: '訂單資訊', value: OrderStages.ORDER_INFO, isActive: true, titleNum: 1 },
  { title: '付款資訊', value: OrderStages.PAYMENT_INFO, isActive: false, titleNum: 2 },
  { title: '確認送出', value: OrderStages.CONFIRMATION, isActive: false, titleNum: 3 }
])
const pickUpFoodOptions = ref([
  { name: '現場外帶', value: PickUpFoodState.TAKE_OUT },
  { name: '預約自取', value: PickUpFoodState.RESERVE },
  { name: '內用', value: PickUpFoodState.DINE_IN }
])
const payOptions = ref([
  { name: '現金付款', value: PayStates.CASH_PAYMENT },
  { name: 'Line Pay', value: PayStates.LINE_PAYMENY }
])
// 根據 pickUpFoodState 值 來判斷是否是跟 PickUpFoodState 相同，來做各組建的顯示隱藏
const getPickUpFoodState = computed(() => ({
  takeOutSection: pickUpFoodState.value === PickUpFoodState.TAKE_OUT,
  reserveSection: pickUpFoodState.value === PickUpFoodState.RESERVE,
  dineInSection: pickUpFoodState.value === PickUpFoodState.DINE_IN
}))

const handlePickUpFood = () => {
  windowScrollY.value = 0
}
const handlePay = (val) => {
  windowScrollY.value = 0
  console.log(val)
}

// 進入下一階段
const handleNextStage = () => {
  windowScrollY.value = 0
  if (orderNowStatus.value === OrderStages.ORDER_INFO) {
    orderNowStatus.value = OrderStages.PAYMENT_INFO
    activateNextStage(OrderStages.PAYMENT_INFO)
  } else if (orderNowStatus.value === OrderStages.PAYMENT_INFO) {
    orderNowStatus.value = OrderStages.CONFIRMATION
    activateNextStage(OrderStages.CONFIRMATION)
  } else {
    console.log('訂單已送出')
    // 呼叫API提交訂單
  }
}

// 返回上一階段
const handlePreviousStage = () => {
  windowScrollY.value = 0
  if (orderNowStatus.value === OrderStages.ORDER_INFO) {
    router.push('/customer/menu')
  } else if (orderNowStatus.value === OrderStages.PAYMENT_INFO) {
    orderNowStatus.value = OrderStages.ORDER_INFO
    deactivatePreviousStage(OrderStages.ORDER_INFO)
  }
}

// 更新訂單狀態以設置當前活動的階段
const updateOrderStatus = (stage) => {
  orderStatus.value.forEach((status) => {
    status.isActive = status.value === stage
  })
}
const activateNextStage = (stage) => {
  const currentIndex = orderStatus.value.findIndex((status) => status.value === stage)
  orderStatus.value[currentIndex].isActive = true
}
const deactivatePreviousStage = (stage) => {
  const currentIndex = orderStatus.value.findIndex((status) => status.value === stage)
  orderStatus.value[currentIndex + 1].isActive = false
}

import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import RadioButton from 'primevue/radiobutton'
const selectedReceipt = ref('paperInvoice')
const receiptOptions = ref([
  { name: '手機載具', value: 'phoneCarrier', isInput: false, placeholder: '請輸入載具號碼(/-ABCD12)' },
  { name: '公司統一編號', value: 'unifiedNumber', isInput: false, placeholder: '請輸入統一編號' },
  { name: '捐贈發票', value: 'donationReceipt', isInput: false, placeholder: '' },
  { name: '發票紙本證明聯', value: 'paperReceipt', isInput: false, placeholder: '' }
])
const handleReceipt = (val) => {
  const index = receiptOptions.value.findIndex((item) => item.value === val)
  receiptOptions.value.forEach((item) => (item.isInput = false))
  if (val === 'phoneCarrier' || val === 'unifiedNumber') {
    receiptOptions.value[index].isInput = true
  }
}
</script>
<template>
  <CustomerContainer>
    <template #header>
      <h2 class="font-semibold text-center py-3 bg-neutral-50">BUY咖啡</h2>
      <div class="px-3 bg-primary-100">
        <OrderTimeLine :orderStatus="orderStatus" />
      </div>
    </template>

    <template v-if="orderNowStatus === OrderStages.ORDER_INFO">
      <div class="p-3 flex flex-col gap-y-2">
        <h2 class="font-bold text-xl">取餐資訊</h2>
        <div class="flex justify-start">
          <SelectButton
            v-model="pickUpFoodState"
            :options="pickUpFoodOptions"
            optionLabel="name"
            optionValue="value"
            :allowEmpty="false"
            aria-labelledby="basic"
            pt:root:class="bg-primary-50 border-transparent flex gap-x-3"
            @update:modelValue="handlePickUpFood"
          />
        </div>

        <div class="flex flex-col gap-y-2" v-show="getPickUpFoodState.reserveSection">
          <h3>門市資訊</h3>
          <div class="bg-primary-100 font-normal p-3 rounded-xl">
            <p class="text-neutral-950">BUY咖</p>
            <p class="text-neutral-600">高雄市苓雅區四維三路217號</p>
          </div>
        </div>
      </div>

      <DineInInput v-show="getPickUpFoodState.dineInSection" />
      <CustomPickUpDate v-show="getPickUpFoodState.reserveSection" />
      <RewardsProgram />
      <CheckoutOrderContent />
      <SpecialNeeds />
    </template>
    <template v-if="orderNowStatus === OrderStages.PAYMENT_INFO">
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
            <InputText v-if="receiptItem.isInput" type="text" :placeholder="receiptItem.placeholder" class="rounded-3xl" fluid />
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
    <template v-if="orderNowStatus === OrderStages.CONFIRMATION">
      <div class="p-3 flex flex-col gap-y-2">
        <h2 class="font-bold text-xl text-center">
          <i class="pi pi-check-circle" style="font-size: 1rem"></i>
          訂單送出
        </h2>
        <div class="flex items-center gap-x-6">
          <div class="flex flex-col gap-y-2">
            <h3 class="font-medium text-center">取餐編號</h3>
            <p class="py-3 px-2 rounded-md border-2 bg-neutral-50 border-neutral-950">
              <span class="font-bold text-3xl">A99</span>
            </p>
          </div>
          <ul class="font-medium flex flex-col gap-y-3 flex-grow">
            <li>取餐方式 : 內用</li>
            <li>點餐時間 : 7/24 (三) 11:00</li>
            <li>付款狀態 : 已結帳</li>
          </ul>
        </div>
      </div>
      <div class="p-3 flex flex-col gap-y-2">
        <h2>訂單明細</h2>
      </div>
    </template>

    <template #footer>
      <div :style="{ paddingTop: `${getFooterButtonDiv.height.value}px` }"></div>

      <div
        v-if="orderNowStatus !== OrderStages.CONFIRMATION"
        class="flex items-center gap-x-3 px-3 py-4 fixed bottom-0 mx-auto w-full max-w-screen-sm bg-primary-50 z-10 border-t border-neutral-500"
        ref="footerButtonDiv"
      >
        <Button class="py-2 px-3 bg-neutral-50 rounded-3xl border-neutral-200 text-neutral-950" @click="handlePreviousStage">
          {{ orderNowStatus === OrderStages.ORDER_INFO ? ' 繼續點餐' : '上一步' }}
        </Button>

        <Button class="py-2 bg-primary-700 rounded-3xl border-transparent flex-grow" @click="handleNextStage">
          {{ orderNowStatus === OrderStages.ORDER_INFO ? '前往結帳' : '送出訂單' }}
        </Button>
      </div>

      <div v-else class="flex items-center flex-col-reverse gap-y-3 px-3 py-4 bg-primary-50 z-10 border-t border-neutral-500">
        <Button class="w-full py-2 px-3 bg-neutral-50 rounded-3xl border-neutral-200 text-neutral-950">再點一次</Button>
        <Button class="w-full py-2 bg-primary-700 rounded-3xl border-transparent flex-grow">返回首頁</Button>
      </div>
    </template>
  </CustomerContainer>
</template>
<style scoped lang="scss">
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

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
  ORDER_INFO: 'order_info', // 訂單資訊
  PAYMENT_INFO: 'payment_info', // 付款資訊
  CONFIRMATION: 'confirmation' // 確認送出
}
const PickUpFoodState = {
  TAKE_OUT: 'takeOut',
  RESERVE: 'reserve',
  DINE_IN: 'dineIn'
}
const footerButtonDiv = ref(null)
const getFooterButtonDiv = useElementBounding(footerButtonDiv)
const windowScrollY = ref(windowScroll.y)
const orderNowStatus = ref(OrderStages.ORDER_INFO) // 初始為訂單資訊階段
const pickUpFoodState = ref(PickUpFoodState.TAKE_OUT) //選擇按鈕狀態( 預約、自取... )
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

// 根據 pickUpFoodState 值 來判斷是否是跟 PickUpFoodState 相同，來做各組建的顯示隱藏
const getPickUpFoodState = computed(() => ({
  takeOutSection: pickUpFoodState.value === PickUpFoodState.TAKE_OUT,
  reserveSection: pickUpFoodState.value === PickUpFoodState.RESERVE,
  dineInSection: pickUpFoodState.value === PickUpFoodState.DINE_IN
}))

const handlePickUpFood = () => {
  windowScrollY.value = 0
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
</script>
<template>
  <CustomerContainer>
    <template #header>
      <h2 class="font-semibold text-center py-3 bg-neutral-50">BUY咖啡</h2>
      <div class="px-3 bg-primary-100">
        <OrderTimeLine :orderStatus="orderStatus" />
      </div>
    </template>

    <template #default>
      <div class="p-3 flex flex-col gap-y-2">
        <h2 class="font-bold text-xl">取餐資訊</h2>
        <div class="card flex justify-start">
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
</style>

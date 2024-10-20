<script setup>
import { onMounted, ref, watch, computed } from 'vue'
import { useElementBounding } from '@vueuse/core'
import { useWindowScroll } from '@vueuse/core'
import SelectButton from 'primevue/selectbutton'
import Button from 'primevue/button'
import Timeline from 'primevue/timeline'
import Card from 'primevue/card'
import Chip from 'primevue/chip'
import Textarea from 'primevue/textarea'
import InputText from 'primevue/inputtext'
import DatePicker from 'primevue/datepicker'
import CustomerContainer from '@/layout/CustomerContainer.vue'
import DineInInput from '@/components/customer/checkout/DineInInput.vue'
import CustomPickUpDate from '@/components/customer/checkout/CustomPickUpDate.vue'
import RewardsProgram from '@/components/customer/checkout/RewardsProgram.vue'
import CheckoutOrderContent from '@/components/customer/checkout/CheckoutOrderContent.vue'
import SpecialNeeds from '@/components/customer/checkout/SpecialNeeds.vue'
const windowScroll = useWindowScroll()
const windowScrollY = ref(windowScroll.y)
const orderNowStatus = ref(0)
const OrderStages = {
  ORDER_INFO: 'order_info', //訂單資訊
  PAYMENT_INFO: 'payment_info', //付款資訊
  CONFIRMATION: 'confirmation' //確認送出
}
const orderStatus = ref([
  { title: '訂單資訊', value: OrderStages.ORDER_INFO, isActive: true, titleNum: 1 },
  { title: '付款資訊', value: OrderStages.PAYMENT_INFO, isActive: false, titleNum: 2 },
  { title: '確認送出', value: OrderStages.CONFIRMATION, isActive: false, titleNum: 3 }
])
const footerButtonDiv = ref(null)
const getFooterButtonDiv = useElementBounding(footerButtonDiv)
const dineInNumber = ref(null) //內用桌號
const reserveDate = ref(new Date()) //遇缺自取-時間(日)
const rewardPoints = ref(null) //集點
// const pickUpFoodState = ref('takeOut')

// const pickUpFoodOptions = ref([
//   { name: '現場外帶', value: 'takeOut' },
//   { name: '預約自取', value: 'reserve' },
//   { name: '內用', value: 'dineIn' }
// ])
const handlePickUpFood = () => {
  windowScrollY.value = 0
}

const PickUpFoodState = {
  TAKE_OUT: 'takeOut',
  RESERVE: 'reserve',
  DINE_IN: 'dineIn'
}
const pickUpFoodState = ref(PickUpFoodState.TAKE_OUT)
const pickUpFoodOptions = ref([
  { name: '現場外帶', value: PickUpFoodState.TAKE_OUT },
  { name: '預約自取', value: PickUpFoodState.RESERVE },
  { name: '內用', value: PickUpFoodState.DINE_IN }
])
const getPickUpFoodState = computed(() => ({
  //取得 pickUpFoodState 是否相同 並根據對應屬性 回傳布林值
  takeOutSection: pickUpFoodState.value === 'takeOut',
  reserveSection: pickUpFoodState.value === 'reserve',
  dineInSection: pickUpFoodState.value === 'dineIn'
}))

function nextStage() {
  console.log(orderNowStatus.value, orderStatus.value.length - 1)
  if (orderNowStatus.value === orderStatus.value.length - 1) {
    //做其他路由或api操作
  }
  if (orderNowStatus.value < orderStatus.value.length - 1) {
    // // 將當前階段設為非活動狀態
    // orderStatus.value[orderNowStatus.value].isActive = false

    // 更新 orderNowStatus，進入下一階段
    orderNowStatus.value++

    // 將舊階段設為活動狀態
    orderStatus.value[orderNowStatus.value].isActive = true
  }
}

function previousStage() {
  if (orderNowStatus.value === 0) {
    //跳轉路由到 點餐畫面 設定
  }
  if (orderNowStatus.value === 1) {
    // 將當前階段設為非活動狀態
    orderStatus.value[orderNowStatus.value].isActive = false
    // 更新 orderNowStatus，返回上一階段
    orderNowStatus.value--
  }
  if (orderNowStatus.value === 2) {
    //結束點餐，跳轉回首頁面設定
  }
}
</script>
<template>
  <CustomerContainer>
    <template #header>
      <h2 class="font-semibold text-center py-3 bg-neutral-50">BUY咖啡</h2>
      <div class="px-3 bg-primary-100">
        <Timeline
          :value="orderStatus"
          layout="horizontal"
          pt:event:class="flex-1 justify-center"
          pt:eventContent:class="text-center text-[12px]"
          pt:eventSeparator:class="relative "
          pt:eventMarker:class="-right-1/2 "
          pt:eventConnector:class="absolute -right-1/2 test bg-primary-700"
        >
          <template #marker="slotProps">
            <div
              :class="[
                'rounded-full w-4 h-4 flex justify-center items-center text-[12px] mx-auto z-10',
                slotProps.item.isActive ? 'bg-primary-700 text-white' : 'bg-neutral-50 text-black'
              ]"
            >
              {{ slotProps.item.titleNum }}
            </div>
          </template>
          <template #content="slotProps">
            <p :class="['text-[12px]', slotProps.item.isActive ? 'text-primary-700 font-bold' : 'text-black']">
              {{ slotProps.item.title }}
            </p>
          </template>
        </Timeline>
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
        v-if="orderNowStatus < 2"
        class="flex items-center gap-x-3 px-3 py-4 fixed bottom-0 mx-auto w-full max-w-screen-sm bg-primary-50 z-10 border-t border-neutral-500"
        ref="footerButtonDiv"
      >
        <Button class="py-2 px-3 bg-neutral-50 rounded-3xl border-neutral-200 text-neutral-950" @click="previousStage">繼續點餐</Button>
        <Button class="py-2 bg-primary-700 rounded-3xl border-transparent flex-grow" @click="nextStage">前往結帳</Button>
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

// :deep(.custome-input-radius) {
//   > .p-datepicker-input {
//     border-radius: 1.5rem !important;
//   }
// }
</style>

<script setup>
import { onMounted, ref, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useElementBounding } from '@vueuse/core'
import { useWindowScroll } from '@vueuse/core'
import Button from 'primevue/button'
import CustomerContainer from '@/layout/CustomerContainer.vue'
import OrderTimeLine from '@/components/customer/checkout/OrderTimeLine.vue'
const windowScroll = useWindowScroll()
const router = useRouter()
const route = useRoute()

// 訂單階段
const OrderStages = {
  ORDER_INFO: 'orderInfo', // 訂單資訊
  PAYMENT_INFO: 'paymentInfo', // 付款資訊
  CONFIRMATION: 'confirmation' // 確認送出
}

const footerButtonDiv = ref(null)
const getFooterButtonDiv = useElementBounding(footerButtonDiv)
const windowScrollY = ref(windowScroll.y)

const orderStatus = ref([
  { title: '訂單資訊', value: OrderStages.ORDER_INFO, isActive: true, titleNum: 1, pathName: 'CustomerOrderInfo' },
  { title: '付款資訊', value: OrderStages.PAYMENT_INFO, isActive: false, titleNum: 2, pathName: 'CheckoutPayment' },
  { title: '確認送出', value: OrderStages.CONFIRMATION, isActive: false, titleNum: 3, pathName: 'CheckoutCompleted' }
])

const getOrderNowStatus = computed(() => {
  const statusMap = {
    CustomerOrderInfo: OrderStages.ORDER_INFO,
    CheckoutPayment: OrderStages.PAYMENT_INFO,
    CheckoutCompleted: OrderStages.CONFIRMATION
  }
  return statusMap[route.name] || OrderStages.ORDER_INFO
})

const updateOrderStatus = (stateIndex) => {
  orderStatus.value.forEach((item, index) => {
    item.isActive = index <= stateIndex
  })
}

// 進入下一階段
const handleNextStage = () => {
  windowScrollY.value = 0
  if (getOrderNowStatus.value === OrderStages.ORDER_INFO) {
    router.push('/customer/checkout/payment')
  } else if (getOrderNowStatus.value === OrderStages.PAYMENT_INFO) {
    router.push('/customer/checkout/completed')
  } else if (getOrderNowStatus.value === OrderStages.CONFIRMATION) {
    console.log('訂單已送出')
    // 呼叫API提交訂單
  }
}

// 返回上一階段
const handlePreviousStage = () => {
  windowScrollY.value = 0
  if (getOrderNowStatus.value === OrderStages.PAYMENT_INFO) {
    router.push('/customer/checkout/orderinfo')
  } else if (getOrderNowStatus.value === OrderStages.ORDER_INFO) {
    router.push('/customer/menu')
  }
}
// 監聽路由變化，根據路由更新當前的訂單階段狀態
watch(
  () => route.name,
  (newPathName) => {
    const pathNameIndex = orderStatus.value.findIndex((item) => item.pathName === newPathName)
    updateOrderStatus(pathNameIndex)
  },
  { immediate: true }
)
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
      <RouterView />
    </template>

    <template #footer>
      <!-- 增加 padding 以避免 footer 遮住內容 -->
      <div :style="{ paddingTop: `${getFooterButtonDiv.height.value}px` }"></div>

      <!-- 按鈕區塊 -->
      <div
        v-if="getOrderNowStatus !== OrderStages.CONFIRMATION"
        class="flex items-center gap-x-3 px-3 py-4 fixed bottom-0 mx-auto w-full max-w-screen-sm bg-primary-50 z-10 border-t border-neutral-500"
        ref="footerButtonDiv"
      >
        <Button class="py-2 px-3 bg-neutral-50 rounded-3xl border-neutral-200 text-neutral-950" @click="handlePreviousStage">
          {{ getOrderNowStatus === OrderStages.ORDER_INFO ? ' 繼續點餐' : '上一步' }}
        </Button>

        <Button class="py-2 bg-primary-700 rounded-3xl border-transparent flex-grow" @click="handleNextStage">
          {{ getOrderNowStatus === OrderStages.ORDER_INFO ? '前往結帳' : '送出訂單' }}
        </Button>
      </div>

      <!-- 訂單完成後的按鈕 -->
      <div v-else class="flex items-center flex-col gap-y-3 px-3 py-4 bg-primary-50 z-10 border-t border-neutral-500">
        <Button class="w-full py-2 px-3 bg-neutral-50 rounded-3xl border-neutral-200 text-neutral-950">返回首頁</Button>
        <Button class="w-full py-2 bg-primary-700 rounded-3xl border-transparent flex-grow">再點一次</Button>
      </div>
    </template>
  </CustomerContainer>
</template>

<style scoped lang="scss"></style>

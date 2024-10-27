<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useOrderStore } from '@/stores/customer/order'
import CustomerContainer from '@/layout/CustomerContainer.vue'
import OrderTimeLine from '@/components/customer/checkout/OrderTimeLine.vue'
const route = useRoute()
const orderStore = useOrderStore()

// 訂單階段
const OrderStages = {
  ORDER_INFO: 'orderInfo', // 訂單資訊
  PAYMENT_INFO: 'paymentInfo', // 付款資訊
  CONFIRMATION: 'confirmation' // 確認送出
}

const orderStatus = ref([
  { title: '訂單資訊', value: OrderStages.ORDER_INFO, isActive: true, titleNum: 1, pathName: 'CustomerOrderInfo' },
  { title: '付款資訊', value: OrderStages.PAYMENT_INFO, isActive: false, titleNum: 2, pathName: 'CheckoutPayment' },
  { title: '確認送出', value: OrderStages.CONFIRMATION, isActive: false, titleNum: 3, pathName: 'CheckoutCompleted' }
])

const updateOrderStatus = (stateIndex) => {
  orderStatus.value.forEach((item, index) => {
    item.isActive = index <= stateIndex
  })
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

onMounted(async () => {
  await orderStore.fetchCartOrder()
})
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

    <template #footer> </template>
  </CustomerContainer>
</template>

<style scoped lang="scss"></style>

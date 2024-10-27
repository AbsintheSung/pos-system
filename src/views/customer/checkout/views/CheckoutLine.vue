<script setup>
import { useCheckoutStore } from '@/stores/customer/checkout'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
const checkoutStore = useCheckoutStore()
const router = useRouter()
onMounted(async () => {
  const isLinePayState = await checkoutStore.fetchCheckoutLinePayState()
  console.log('isLinePayState', isLinePayState)
  if (isLinePayState) {
    router.push('/customer/checkout/completed')
  }
})
</script>
<template>
  <h2>LinePay確認付款中...</h2>
</template>
<style scoped></style>

<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useMenuStore } from '@/stores/customer/menu'
import { useOrderStore } from '@/stores/customer/order'
const menuStore = useMenuStore()
const orderStore = useOrderStore()
onMounted(async () => {
  await menuStore.fetchMenuCategory()
  await menuStore.fetchMenu()
  await orderStore.fetchCartOrder()
})
</script>

<template>
  <RouterView />
</template>

<style scoped></style>

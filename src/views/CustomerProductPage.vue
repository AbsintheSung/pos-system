<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/product.js'
import CustomerContainer from '@/layout/CustomerContainer.vue'
const productStore = useProductStore()
const route = useRoute()
const productId = route.params.id

onMounted(async () => {
  await productStore.fetchProductData(productId)
})
</script>
<template>
  <CustomerContainer ref="customerContainer">
    <template #header> </template>
    <template #default>
      <div>
        <div><img :src="productStore.getProductData.productImagePath" /></div>
      </div>
    </template>
    <template #footer> </template>
  </CustomerContainer>
</template>
<style scoped></style>

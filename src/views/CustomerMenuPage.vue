<script setup>
import { ref, computed } from 'vue'
import CustomerHeaderIndex from '@/components/customer-header/CustomerHeaderIndex.vue'
import CustomerContainer from '@/layout/CustomerContainer.vue'
import CustomerOrderList from '@/components/global/CustomerOrderList.vue'
const headerIndexExpose = ref(null)
const isHeaderListFixed = computed(() => headerIndexExpose.value?.isHeaderListFixed)
const isGetNavHeight = computed(() => headerIndexExpose.value?.isGetNavHeight)
</script>
<template>
  <CustomerContainer>
    <template #header>
      <CustomerHeaderIndex ref="headerIndexExpose" />
    </template>
    <template #default>
      <CustomerOrderList :isHeaderListFixed="isHeaderListFixed" :getNavHeight="isGetNavHeight" />
    </template>
  </CustomerContainer>
</template>
<style lang="scss" scoped></style>

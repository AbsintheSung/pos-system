<script setup>
import { ref } from 'vue'
import CustomerContainer from '@/layout/CustomerContainer.vue'
import CustomerHeaderNav from '@/components/customer-header/CustomerHeaderNav.vue'
import CustomerHeaderDrawer from '@/components/customer-header/CustomerHeaderDrawer.vue'
const isDrawerOpen = ref(false)
const navHeight = ref(0)
const handleDrawerOpen = () => {
  isDrawerOpen.value = true
}
const handleDrawerClose = () => {
  isDrawerOpen.value = false
}
const getNavHeight = (value) => {
  navHeight.value = value
}
</script>
<template>
  <CustomerContainer>
    <template #header>
      <header>
        <CustomerHeaderNav :handleDrawerOpen="handleDrawerOpen" :getNavHeight="getNavHeight" />
        <CustomerHeaderDrawer
          :navHeight="navHeight"
          :isDrawerOpen="isDrawerOpen"
          :handleDrawerClose="handleDrawerClose"
          v-model:isDrawerOpen="isDrawerOpen"
        />
      </header>
    </template>
  </CustomerContainer>
</template>
<style scoped></style>

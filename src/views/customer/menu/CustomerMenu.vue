<script setup>
import { ref, computed } from 'vue'
import { useScroll } from '@vueuse/core'
import { useElementBounding } from '@vueuse/core'
import CustomerHeaderNav from '@/components/customer/header/CustomerHeaderNav.vue'
import CustomerHeaderDrawer from '@/components/customer/header/CustomerHeaderDrawer.vue'
import CustomHeaderInfo from '@/components/customer/header/CustomHeaderInfo.vue'
import CustomerHeaderInput from '@/components/customer/header/CustomerHeaderInput.vue'
import CustomerContainer from '@/layout/CustomerContainer.vue'
import CustomerOrderList from '@/components/customer/menu/CustomerOrderList.vue'
import CustomerFooter from '@/components/customer/footer/CustomerFooter.vue'
const isDrawerOpen = ref(false) //控制Drawer的開啟&關閉
const { y } = useScroll(window) //使用 vueUse的函式庫，取得裝置垂直值的響應式變化
const headerNav = ref(null)
const headerInput = ref(null)
const headerInfo = ref(null)
const customerContainer = ref(null)
const getHeaderNav = useElementBounding(headerNav)
const getHeaderInput = useElementBounding(headerInput)
const getHeaderInfo = useElementBounding(headerInfo)
const getHeaderContainer = useElementBounding(customerContainer)
const isHeaderNavFixed = computed(() => (y.value > 0 ? 'fixed w-full z-20 max-w-screen-sm' : ''))

const computedHeight = computed(() => getHeaderInput.height.value + getHeaderInfo.height.value - getHeaderNav.height.value)

const isHeaderListFixed = computed(() => (y.value >= computedHeight.value ? 'sticky w-full z-10 max-w-screen-sm' : ''))

const isGetNavHeight = computed(() => (y.value >= computedHeight.value ? getHeaderNav.height.value : 0))

const handleDrawerOpen = () => {
  isDrawerOpen.value = true
}
const handleDrawerClose = () => {
  isDrawerOpen.value = false
}
</script>
<template>
  <CustomerContainer ref="customerContainer">
    <template #header>
      <CustomerHeaderDrawer
        :navHeight="getHeaderNav.height.value"
        :isDrawerOpen="isDrawerOpen"
        :handleDrawerClose="handleDrawerClose"
        :maskleft="getHeaderContainer.left.value"
        :maskwidth="getHeaderContainer.width.value"
        v-model:isDrawerOpen="isDrawerOpen"
      />
      <CustomerHeaderNav ref="headerNav" :handleDrawerOpen="handleDrawerOpen" :class="isHeaderNavFixed" />
      <CustomHeaderInfo ref="headerInfo" />
      <CustomerHeaderInput ref="headerInput" />
    </template>
    <template #default>
      <CustomerOrderList :isHeaderListFixed="isHeaderListFixed" :getNavHeight="isGetNavHeight" />
    </template>
    <template #footer>
      <CustomerFooter />
    </template>
  </CustomerContainer>
</template>
<style lang="scss" scoped></style>

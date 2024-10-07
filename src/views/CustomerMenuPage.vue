<script setup>
import { ref, computed, provide, readonly } from 'vue'
import { useScroll } from '@vueuse/core'
import CustomerHeaderIndex from '@/components/customer-header/CustomerHeaderIndex.vue'
import CustomerContainer from '@/layout/CustomerContainer.vue'
import CustomerHeaderNav from '@/components/customer-header/CustomerHeaderNav.vue'
import CustomerHeaderDrawer from '@/components/customer-header/CustomerHeaderDrawer.vue'
import CustomHeaderInfo from '@/components/customer-header/CustomHeaderInfo.vue'
import CustomerHeaderInput from '@/components/customer-header/CustomerHeaderInput.vue'
import CustomerHeaderList from '@/components/customer-header/CustomerHeaderList.vue'
import CustomerHeaderTabList from '@/components/customer-header/CustomerHeaderTabList.vue'
import CustomerOrderList from '@/components/global/CustomerOrderList.vue'
const { y } = useScroll(window) //使用 vueUse的函式庫，取得裝置垂直值的響應式變化
const headerNavExpose = ref(null) //取得子組件暴露給父組件的本身dom( 用於取得dom高度，來實現垂直移動時候，部分header區塊區要固定 )
const headerInfoExpose = ref(null) //取得子組件暴露給父組件的本身dom
const headerListExpose = ref(null) //取得子組件暴露給父組件的本身dom
const headerInputExpose = ref(null) //取得子組件暴露給父組件的本身dom
const isDrawerOpen = ref(false) //控制Drawer的開啟&關閉
const isHeaderNavFixed = computed(() => {
  if (y.value > 0) {
    return 'fixed w-full z-10 max-w-screen-sm'
  } else {
    return ''
  }
})
const getNavHeight = computed(() => headerNavExpose.value?.navDom.clientHeight || 0)
// const isHeaderListFixed = computed(() => {
//   const infoHeight = headerInfoExpose.value?.infoDom.clientHeight || 0
//   const inputHeight = headerInputExpose.value?.inputDom.clientHeight || 0
//   const navHeight = headerNavExpose.value?.navDom.clientHeight || 0
//   const totalHeight = infoHeight + inputHeight
//   if (y.value >= totalHeight - navHeight) {
//     return `sticky  w-full z-10 max-w-screen-sm  `
//   } else {
//     return ''
//   }
// })
// const isGetNavHeight = computed(() => {
//   const infoHeight = headerInfoExpose.value?.infoDom.clientHeight || 0
//   const inputHeight = headerInputExpose.value?.inputDom.clientHeight || 0
//   const navHeight = headerNavExpose.value?.navDom.clientHeight || 0
//   const totalHeight = infoHeight + inputHeight
//   if (y.value >= totalHeight - navHeight) {
//     return navHeight
//   } else {
//     return 0
//   }
// })
const headerIndexExpose = ref(null)
const isHeaderListFixed = computed(() => headerIndexExpose.value?.isHeaderListFixed)
const isGetNavHeight = computed(() => headerIndexExpose.value?.isGetNavHeight)

const handleDrawerOpen = () => {
  isDrawerOpen.value = true
}
const handleDrawerClose = () => {
  isDrawerOpen.value = false
}
</script>
<template>
  <CustomerContainer>
    <template #header>
      <CustomerHeaderIndex ref="headerIndexExpose" />
      <!-- <header>
        <CustomerHeaderNav
          ref="headerNavExpose"
          :handleDrawerOpen="handleDrawerOpen"
          :class="isHeaderNavFixed"
        />
        <CustomerHeaderDrawer
          :navHeight="getNavHeight"
          :isDrawerOpen="isDrawerOpen"
          :handleDrawerClose="handleDrawerClose"
          v-model:isDrawerOpen="isDrawerOpen"
        />
        <CustomHeaderInfo ref="headerInfoExpose" />
        <CustomerHeaderInput ref="headerInputExpose" />
    
      </header> -->
    </template>
    <template #default>
      <CustomerOrderList :isHeaderListFixed="isHeaderListFixed" :getNavHeight="isGetNavHeight" />
      <!-- <div class="px-3">
        <RouterView></RouterView>
      </div> -->
    </template>
  </CustomerContainer>
</template>
<style lang="scss" scoped></style>

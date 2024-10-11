<script setup>
// 此元件不會用到-未來會移除
import { ref, computed } from 'vue'
import { useScroll } from '@vueuse/core'
import CustomerHeaderNav from '@/components/customer-header/CustomerHeaderNav.vue'
import CustomerHeaderDrawer from '@/components/customer-header/CustomerHeaderDrawer.vue'
import CustomHeaderInfo from '@/components/customer-header/CustomHeaderInfo.vue'
import CustomerHeaderInput from '@/components/customer-header/CustomerHeaderInput.vue'
const { y } = useScroll(window) //使用 vueUse的函式庫，取得裝置垂直值的響應式變化
const headerNavExpose = ref(null) //取得子組件暴露給父組件的本身dom( 用於取得dom高度，來實現垂直移動時候，部分header區塊區要固定 )
const headerInfoExpose = ref(null) //取得子組件暴露給父組件的本身dom
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
const isHeaderListFixed = computed(() => {
  const infoHeight = headerInfoExpose.value?.infoDom.clientHeight || 0
  const inputHeight = headerInputExpose.value?.inputDom.clientHeight || 0
  const navHeight = headerNavExpose.value?.navDom.clientHeight || 0
  const totalHeight = infoHeight + inputHeight
  if (y.value >= totalHeight - navHeight) {
    return `sticky  w-full z-10 max-w-screen-sm  `
  } else {
    return ''
  }
})
const isGetNavHeight = computed(() => {
  const infoHeight = headerInfoExpose.value?.infoDom.clientHeight || 0
  const inputHeight = headerInputExpose.value?.inputDom.clientHeight || 0
  const navHeight = headerNavExpose.value?.navDom.clientHeight || 0
  const totalHeight = infoHeight + inputHeight
  if (y.value >= totalHeight - navHeight) {
    return navHeight
  } else {
    return 0
  }
})
const handleDrawerOpen = () => {
  isDrawerOpen.value = true
}
const handleDrawerClose = () => {
  isDrawerOpen.value = false
}
defineExpose({
  isHeaderListFixed: isHeaderListFixed,
  isGetNavHeight: isGetNavHeight
})
</script>
<template>
  <header>
    <!-- <CustomerHeaderNav
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
    <CustomerHeaderInput ref="headerInputExpose" /> -->
    <!-- <CustomerHeaderList
          ref="headerListExpose"
          :class="isHeaderListFixed"
          :style="{ top: getNavHeight + 'px' }"
        /> -->
  </header>
</template>
<style scoped></style>

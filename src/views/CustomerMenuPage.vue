<script setup>
import { ref, computed } from 'vue'
import { useScroll } from '@vueuse/core'
import CustomerContainer from '@/layout/CustomerContainer.vue'
import CustomerHeaderNav from '@/components/customer-header/CustomerHeaderNav.vue'
import CustomerHeaderDrawer from '@/components/customer-header/CustomerHeaderDrawer.vue'
import CustomHeaderInfo from '@/components/customer-header/CustomHeaderInfo.vue'
import CustomerHeaderInput from '@/components/customer-header/CustomerHeaderInput.vue'
import CustomerHeaderList from '@/components/customer-header/CustomerHeaderList.vue'
const { y } = useScroll(window) //使用 vueUse的函式庫，取得裝置垂直值的響應式變化
const headerNavExpose = ref(null) //取得子組件暴露給父組件的本身dom( 用於取得dom高度，來實現垂直移動時候，部分header區塊區要固定 )
const headerInfoExpose = ref(null) //取得子組件暴露給父組件的本身dom
const headerListExpose = ref(null) //取得子組件暴露給父組件的本身dom
const headerInputExpose = ref(null) //取得子組件暴露給父組件的本身dom
const isDrawerOpen = ref(false) //控制Drawer的開啟&關閉
const navHeight = ref(0) //CustomerHeaderNav組件的 dom高度，此處是給CustomerHeaderDrawer組件使用
const isHeaderNavFixed = computed(() => {
  if (y.value > 0) {
    return 'fixed w-full z-10'
  } else {
    return ''
  }
})
const isHeaderListFixed = computed(() => {
  const infoHeight = headerInfoExpose.value?.infoDom.clientHeight || 0
  const inputHeight = headerInputExpose.value?.inputDom.clientHeight || 0
  const navHeight = headerNavExpose.value?.nav.clientHeight || 0
  const totalHeight = infoHeight + inputHeight
  if (y.value >= totalHeight) {
    return `fixed w-full z-10 top-[${navHeight}px]`
  } else {
    return ''
  }
})
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
  <CustomerContainer class="bg-primary-50">
    <template #header>
      <header>
        <CustomerHeaderNav
          ref="headerNavExpose"
          :handleDrawerOpen="handleDrawerOpen"
          :getNavHeight="getNavHeight"
          :class="isHeaderNavFixed"
        />
        <CustomerHeaderDrawer
          :navHeight="navHeight"
          :isDrawerOpen="isDrawerOpen"
          :handleDrawerClose="handleDrawerClose"
          v-model:isDrawerOpen="isDrawerOpen"
        />
        <CustomHeaderInfo ref="headerInfoExpose" />
        <CustomerHeaderInput ref="headerInputExpose" />
        <CustomerHeaderList ref="headerListExpose" :isHeaderListFixed="isHeaderListFixed" />
      </header>
    </template>
    <template #default>
      <div class="px-3">
        <RouterView></RouterView>
      </div>
    </template>
  </CustomerContainer>
</template>
<style lang="scss" scoped></style>

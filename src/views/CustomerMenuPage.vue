<script setup>
import { ref, computed } from 'vue'
import { useScroll } from '@vueuse/core'
import CustomerContainer from '@/layout/CustomerContainer.vue'
import CustomerHeaderNav from '@/components/customer-header/CustomerHeaderNav.vue'
import CustomerHeaderDrawer from '@/components/customer-header/CustomerHeaderDrawer.vue'
import CustomHeaderInfo from '@/components/customer-header/CustomHeaderInfo.vue'
import CustomerHeaderInput from '@/components/customer-header/CustomerHeaderInput.vue'
import CustomerHeaderList from '@/components/customer-header/CustomerHeaderList.vue'
const { y } = useScroll(window)
const headerNavExpose = ref(null)
const headerInfoExpose = ref(null)
const headerListExpose = ref(null)
const headerInputExpose = ref(null)
const isDrawerOpen = ref(false)
const navHeight = ref(0)
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
      <div class="px-3 test">
        <RouterView></RouterView>
      </div>
    </template>
  </CustomerContainer>
</template>
<style lang="scss" scoped>
.test {
  height: 200vh;
}
</style>

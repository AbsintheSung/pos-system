<script setup>
import { ref, useTemplateRef } from 'vue'
import Button from 'primevue/button'
const nav = useTemplateRef('nav') //3.5的新api， 但3.4就有了，不確定功能是否一致
const props = defineProps({
  handleDrawerOpen: {
    type: Function,
    default: () => {}
  },
  getNavHeight: {
    type: Function,
    default: () => {}
  }
})
const navigationButtons = ref([
  {
    icon: 'pi pi-bars',
    label: '導覽列',
    onClick: () => {
      props.getNavHeight(nav.value.clientHeight)
      props.handleDrawerOpen()
    },
    liClass: ''
  },
  {
    icon: 'pi pi-user',
    label: '使用者',
    onClick: () => {
      /* 使用者按鈕點擊邏輯 */
    },
    liClass: 'ms-auto'
  },
  {
    icon: 'pi pi-cart-minus',
    label: '購物車',
    onClick: () => {
      /* 購物車按鈕點擊邏輯 */
    },
    liClass: ''
  }
])
defineExpose({
  nav: nav
})
</script>
<template>
  <nav ref="nav" class="p-3 bg-primary-700">
    <ul class="flex gap-x-4 items-center">
      <li v-for="button in navigationButtons" :key="button.label" :class="button.liClass">
        <Button
          :icon="button.icon"
          class="bg-neutral-50 text-neutral-950"
          rounded
          :aria-label="button.label"
          @click="button.onClick"
        />
      </li>
    </ul>
  </nav>
</template>
<style scoped></style>

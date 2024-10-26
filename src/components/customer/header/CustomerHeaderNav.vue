<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Button from 'primevue/button'
const route = useRoute()
const router = useRouter()
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
      router.push('/customer/checkout')
    },
    liClass: ''
  }
])
const navigationProductButtons = ref([
  {
    icon: 'pi pi-angle-left',
    label: '商品頁',
    onClick: () => {
      router.push('/customer/menu')
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
      router.push('/customer/checkout')
    },
    liClass: ''
  }
])
const navigation = computed(() => {
  if (route.name === 'CustomerMenu') {
    return navigationButtons.value
  } else {
    return navigationProductButtons.value
  }
})
</script>
<template>
  <nav class="p-3 bg-primary-700">
    <ul class="flex gap-x-4 items-center">
      <li v-for="button in navigation" :key="button.label" :class="button.liClass">
        <Button :icon="button.icon" class="bg-neutral-50 text-neutral-950" rounded :aria-label="button.label" @click="button.onClick" />
      </li>
    </ul>
  </nav>
</template>
<style scoped></style>

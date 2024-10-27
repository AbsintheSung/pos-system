<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useOrderStore } from '@/stores/order.js'
import Button from 'primevue/button'
import Badge from 'primevue/badge'
import OverlayBadge from 'primevue/overlaybadge'
const orderStore = useOrderStore()
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
      <li v-for="(button, index) in navigation" :key="button.label" :class="button.liClass">
        <template v-if="index != 2">
          <Button :icon="button.icon" class="bg-neutral-50 text-neutral-950" rounded :aria-label="button.label" @click="button.onClick" />
        </template>
        <template v-else>
          <div class="relative">
            <Button :icon="button.icon" class="bg-neutral-50 text-neutral-950" rounded :aria-label="button.label" @click="button.onClick" />
            <span
              class="absolute flex items-center justify-center min-w-4 min-h-4 text-xs font-bold text-neutral-50 bg-red-500 rounded-full top-0 right-0"
              :class="[{ hidden: orderStore.getCartListLength === 0 }]"
            >
              {{ orderStore.getCartTotalServing }}
            </span>
          </div>
        </template>
      </li>
    </ul>
  </nav>
</template>
<style scoped lang="scss">
// .custom {
//   height: 100%;
//   > :deep(.p-button-label) {
//     display: none;
//   }
//   > :deep(.p-badge-secondary) {
//     display: none;
//     position: absolute;
//     padding: 0px;
//   }
// }
</style>

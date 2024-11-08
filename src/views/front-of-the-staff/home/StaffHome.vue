<script setup>
import { ref, watch, computed, onMounted, onUnmounted } from 'vue'
import { useFohOrderStore } from '@/stores/staff/foh/order'
import { useElementBounding } from '@vueuse/core'
import { useRoute, useRouter } from 'vue-router'
import Button from 'primevue/button'
import fohLogo from '@/assets/images/logo/foh-logo.png'
import allIcon from '@/assets/images/other/all_icon.png'
import dineinIcon from '@/assets/images/other/dinein_icon.png'
import takeoutIcon from '@/assets/images/other/takeout_icon.png'
import allIconDark from '@/assets/images/other/all_icon_dark.png'
import dineinIconDark from '@/assets/images/other/dinein_icon_dark.png'
import takeoutIconDark from '@/assets/images/other/takeout_icon_dark.png'

const fohOrderStore = useFohOrderStore()
const route = useRoute()
const router = useRouter()
// 定義當前選中的狀態
const currentType = ref('all') // 'all', 'dinein', 'takeout'
// 控制按鈕是否可以點擊 ( 在結帳畫面，全部 內用 外帶，按鈕 不能點擊 )
const filterButtonState = computed(() => (route.name === 'StaffFohCheckout' ? true : false))
const routerName = computed(() => route.name)

// 按鈕配置數據
const buttons = [
  {
    type: 'all',
    text: '全部',
    lightIcon: allIcon,
    darkIcon: allIconDark
  },
  {
    type: 'dinein',
    text: '內用',
    lightIcon: dineinIcon,
    darkIcon: dineinIconDark
  },
  {
    type: 'takeout',
    text: '外帶',
    lightIcon: takeoutIcon,
    darkIcon: takeoutIconDark
  }
]

// 切換按鈕狀態
const handleClick = async (type) => {
  fohOrderStore.setOrderCategory(type)
  await fohOrderStore.fetchOrderData('1', route.params.status, fohOrderStore.getOrderTypeRequest)
  console.log(fohOrderStore.getOrderTypeRequest)
}

watch(
  () => route.name,
  (val) => {
    console.log('監聽跳轉', val)
  }
)
</script>
<template>
  <div class="bg-primary-50">
    <main class="w-full max-w-screen-xl min-h-screen mx-auto flex flex-col items-center justify-center">
      <div class="flex w-full h-full">
        <aside class="h-full py-6 px-4 flex flex-col items-center self-start bg-secondary-200 font-medium">
          <div class="pb-36 flex flex-col gap-y-4">
            <img alt="外場logo" :src="fohLogo" />
            <p class="text-center">外場店員</p>
            <button class="flex py-2 px-5 rounded-3xl items-center gap-x-1 bg-neutral-50">
              <i class="pi pi-sign-out"></i>
              <p class="text-[12px] text-nowrap">登出</p>
            </button>
          </div>
          <div class="pt-36 flex flex-col items-center gap-y-6">
            <Button
              v-for="btn in buttons"
              :key="btn.type"
              @click="handleClick(btn.type)"
              :class="[
                'py-3 px-5 rounded-3xl flex flex-col items-center gap-y-1 border-0',
                fohOrderStore.getOrderType === btn.type ? 'bg-black text-white' : 'bg-neutral-50 text-black'
              ]"
              :disabled="filterButtonState"
            >
              <img :src="fohOrderStore.getOrderType === btn.type ? btn.darkIcon : btn.lightIcon" class="max-w-[45px]" />
              <p>{{ btn.text }}</p>
            </Button>
          </div>
        </aside>
        <div class="flex w-full">
          <RouterView></RouterView>
        </div>
      </div>
    </main>
  </div>
</template>
<style scoped></style>

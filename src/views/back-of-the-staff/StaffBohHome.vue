<script setup>
import { ref, watch, computed, onMounted, onUnmounted } from 'vue'
import { useBohOrderStore } from '@/stores/staff/boh/order'
import { useElementBounding } from '@vueuse/core'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import Button from 'primevue/button'
import fohLogo from '@/assets/images/logo/foh-logo.png'
import allIcon from '@/assets/images/other/all_icon.png'
import Card from 'primevue/card'
import dineinIcon from '@/assets/images/other/dinein_icon.png'
import takeoutIcon from '@/assets/images/other/takeout_icon.png'
import allIconDark from '@/assets/images/other/all_icon_dark.png'
import dineinIconDark from '@/assets/images/other/dinein_icon_dark.png'
import takeoutIconDark from '@/assets/images/other/takeout_icon_dark.png'
const toast = useToast()
const isBtnloading = ref(false)
const bohOrderStore = useBohOrderStore()
const route = useRoute()
const router = useRouter()
// 定義當前選中的狀態

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

// 切換aside篩選按鈕狀態
const handleClick = async (type) => {
  bohOrderStore.setFilterBtnType(type)
  await bohOrderStore.fetchOrder()
}

const handleFinish = async (id) => {
  const orderId = {
    orderId: id
  }
  isBtnloading.value = true
  const message = await bohOrderStore.fetachBohComplete(orderId)
  toast.add({ severity: 'success', summary: '系統通知', detail: `${message}`, life: 1000 })
  isBtnloading.value = false
  // console.log(message)
}

onMounted(async () => {
  await bohOrderStore.fetchAllOrder()
  console.log(bohOrderStore.getOrderAllData)
})

const cities = ref([
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' }
])
const inputValue = ref(null)
const selectedCity = ref(null)
</script>
<template>
  <div class="bg-primary-50">
    <main class="w-full max-w-screen-xl min-h-screen mx-auto flex flex-col items-center justify-center">
      <div class="flex w-full h-full">
        <aside class="h-full py-6 px-4 flex flex-col items-center self-start bg-secondary-200 font-medium">
          <div class="pb-36 flex flex-col gap-y-4">
            <img alt="外場logo" :src="fohLogo" />
            <p class="text-center">內場店員</p>
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
                bohOrderStore.getFilterBtnType === btn.type ? 'bg-black text-white' : 'bg-neutral-50 text-black'
              ]"
            >
              <img :src="bohOrderStore.getFilterBtnType === btn.type ? btn.darkIcon : btn.lightIcon" class="max-w-[45px]" />
              <p>{{ btn.text }}</p>
            </Button>
          </div>
        </aside>
        <div class="flex flex-col w-full overflow-x-auto">
          <Toast
            position="top-right"
            :pt="{
              messageContent: { class: 'flex' },
              messageicon: { class: 'my-1 mx-2' },
              buttoncontainer: { class: 'hidden' }
            }"
          />
          <div class="p-4 flex items-center gap-x-7 w-full">
            <div class="w-full flex items-center gap-x-2">
              <label class="whitespace-nowrap">排序依據</label>
              <Select class="rounded-3xl w-full" v-model="selectedCity" :options="cities" optionLabel="name" placeholder="選擇篩選條件" />
            </div>
            <div class="w-full flex items-center gap-x-2 me-auto">
              <label class="whitespace-nowrap" for="search-product">搜尋訂單</label>

              <IconField class="flex-grow">
                <InputIcon>
                  <i class="pi pi-search"></i>
                </InputIcon>
                <InputText fluid class="rounded-3xl" fl id="search-product" type="text" v-model="inputValue" placeholder="輸入桌號、編號或手機號碼" />
              </IconField>
            </div>
          </div>
          <div class="h-full flex-grow p-4 flex gap-x-6 overflow-x-auto">
            <Card
              v-for="orderItem in bohOrderStore.getOrderAllData"
              :key="orderItem.orderId"
              pt:root:class="flex flex-col "
              pt:body:class="p-0"
              pt:title:class="p-4 font-bold text-3xl flex flex-col gap-y-3 border-b  border-neutral-950"
              pt:header:class="p-4 pb-0 mx-auto"
            >
              <template #header>
                <Button class="px-28 py-3 rounded-3xl bg-primary-700 text-nowrap" :disabled="isBtnloading" @click="handleFinish(orderItem.orderId)">
                  <p>完成備餐</p>
                  <i v-show="isBtnloading" class="pi pi-spin pi-spinner"></i>
                </Button>
              </template>
              <template #title>
                <h2>{{ orderItem.typeAndNumber }}</h2>
                <h3>{{ orderItem.time }}</h3>
              </template>
              <template #content>
                <ul class="text-2xl font-medium overflow-y-auto" :style="{ height: `${450}px` }">
                  <li
                    class="p-4 flex flex-col gap-y-1 border-b border-gray-200 last:border-b-0"
                    v-for="orderList in orderItem.items"
                    :key="orderList.name"
                  >
                    <p class="text-2xl text-nowrap">{{ orderList.Name }} X {{ orderList.Quantity }}</p>
                    <div class="flex gap-x-2 flex-nowrap">
                      <span class="px-2 py-1 text-xl bg-primary-200 rounded-2xl" v-for="customItem in orderList.Customization" :key="customItem">
                        {{ customItem }}
                      </span>
                    </div>
                  </li>
                </ul>
              </template>
            </Card>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<style scoped></style>

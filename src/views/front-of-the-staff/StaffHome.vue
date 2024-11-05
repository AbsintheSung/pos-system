<script setup>
import { ref, watch, computed, onMounted, onUnmounted } from 'vue'
import { useFohOrderStore } from '@/stores/staff/foh/order'
import { useElementBounding } from '@vueuse/core'
import { useRoute } from 'vue-router'
import Button from 'primevue/button'
import Drawer from 'primevue/drawer'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'
import Badge from 'primevue/badge'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
// import TabPanels from 'primevue/tabpanels'
// import TabPanel from 'primevue/tabpanel'
import Select from 'primevue/select'
import fohLogo from '@/assets/images/logo/foh-logo.png'
import allIcon from '@/assets/images/other/all_icon.png'
import dineinIcon from '@/assets/images/other/dinein_icon.png'
import takeoutIcon from '@/assets/images/other/takeout_icon.png'
import allIconDark from '@/assets/images/other/all_icon_dark.png'
import dineinIconDark from '@/assets/images/other/dinein_icon_dark.png'
import takeoutIconDark from '@/assets/images/other/takeout_icon_dark.png'

const fohOrderStore = useFohOrderStore()
const route = useRoute()
// 定義當前選中的狀態
const currentType = ref('all') // 'all', 'dinein', 'takeout'

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
  fohOrderStore.setType(type)
  await fohOrderStore.fetchOrderData('1', route.params.status, fohOrderStore.getOrderTypeRequest)
  console.log(fohOrderStore.getOrderTypeRequest)
  // currentType.value = type
  // console.log(currentType.value)
}

const orderStates = ref([
  { route: '/staff-foh-home/all', label: '全部訂單', icon: 'pi pi-home', countKey: 'all' },
  { route: '/staff-foh-home/unpaid', label: '待結帳', icon: 'pi pi-chart-line', countKey: 'unpaid' },
  { route: '/staff-foh-home/preparing', label: '準備中', icon: 'pi pi-list', countKey: 'preparing' },
  { route: '/staff-foh-home/ready', label: '待取餐', icon: 'pi pi-inbox', countKey: 'ready' },
  { route: '/staff-foh-home/completed', label: '已完成', icon: 'pi pi-inbox', countKey: 'completed' }
])

// 計算屬性：根據當前狀態自動更新數據
const nowOrderState = computed(() => `/staff-foh-home/${route.params.status || 'all'}`)

// 動態綁定的 totalCount
const orderCounts = computed(() => {
  return {
    all: fohOrderStore.getOrder.all.totalCount,
    unpaid: fohOrderStore.getOrder.unpaid.totalCount,
    preparing: fohOrderStore.getOrder.preparing.totalCount,
    ready: fohOrderStore.getOrder.ready.totalCount,
    completed: fohOrderStore.getOrder.completed.totalCount
  }
})

watch(
  () => route.params.status,
  async () => {
    await fohOrderStore.fetchOrderPages()
    await fohOrderStore.fetchOrderData('', route.params.status) //先取得前9筆
  }
)

// 初始化加載
onMounted(async () => {
  await fohOrderStore.fetchOrderPages()
  await fohOrderStore.fetchOrderData('', route.params.status) //先取得前9筆
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
        <aside class="py-6 px-4 flex flex-col items-center self-start bg-secondary-200 font-medium">
          <div class="pb-36 flex flex-col gap-y-4">
            <img alt="外場logo" :src="fohLogo" />
            <p class="text-center">外場店員</p>
            <button class="flex py-2 px-5 rounded-3xl items-center gap-x-1 bg-neutral-50">
              <i class="pi pi-sign-out"></i>
              <p class="text-[12px]">登出</p>
            </button>
          </div>
          <div class="pt-36 flex flex-col items-center gap-y-6">
            <button
              v-for="btn in buttons"
              :key="btn.type"
              @click="handleClick(btn.type)"
              :class="[
                'py-3 px-5 rounded-3xl flex flex-col items-center gap-y-1',
                fohOrderStore.getOrderType === btn.type ? 'bg-black text-white' : 'bg-neutral-50 text-black'
              ]"
            >
              <img :src="fohOrderStore.getOrderType === btn.type ? btn.darkIcon : btn.lightIcon" class="max-w-[45px]" />
              <p>{{ btn.text }}</p>
            </button>
          </div>
        </aside>
        <div class="flex w-full">
          <div class="flex-grow flex flex-col">
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
                  <InputText
                    fluid
                    class="rounded-3xl"
                    fl
                    id="search-product"
                    type="text"
                    v-model="inputValue"
                    placeholder="輸入桌號、編號或手機號碼"
                  />
                </IconField>
              </div>
            </div>

            <div class="flex-grow flex flex-col">
              <Tabs :value="nowOrderState">
                <TabList>
                  <Tab v-for="tab in orderStates" :key="tab.label" :value="tab.route" pt:root:class="flex-grow bg-primary-50">
                    <router-link v-if="tab.route" :to="tab.route">
                      <a class="flex items-center gap-2 text-inherit">
                        <span>{{ tab.label }}</span>
                        <Badge :value="orderCounts[tab.countKey]" size="large" severity="warn" class="bg-primary-300" />
                      </a>
                    </router-link>
                  </Tab>
                </TabList>
              </Tabs>

              <RouterView></RouterView>
            </div>
          </div>
          <div class="w-[360px] flex flex-col border border-neutral-950 bg-neutral-50">
            <h2 class="mb-auto w-full py-3 text-center text-neutral-50 bg-primary-700">訂單詳細資訊</h2>
            <!-- <div v-if="Object.keys(fohOrderStore.getOrderDetail).length === 0"></div> -->
            <div class="py-4 px-6 text-2xl flex flex-col items-center gap-y-3 h-full">
              <div class="w-full flex justify-between items-center">
                <h3 class="font-bold text-2xl">{{ fohOrderStore.getOrderDetail.typeAndNumber }}</h3>
                <span class="ms-auto text-xl">{{ fohOrderStore.getOrderDetail.orderStatus }}</span>
              </div>
              <ul class="w-full text-xl flex flex-col items-start gap-y-2">
                <li class="flex items-center gap-x-2">
                  <i class="pi pi-phone"></i>
                  <p>{{ fohOrderStore.getOrderDetail.phone === null ? '無' : fohOrderStore.getOrderDetail.phone }}</p>
                </li>
                <li class="flex items-center gap-x-2">
                  <i class="pi pi-clock"></i>
                  <p>{{ fohOrderStore.getOrderDetail.time }}</p>
                </li>
                <li class="flex items-center gap-x-2">
                  <i class="pi pi-clipboard"></i>
                  <p>{{ fohOrderStore.getOrderDetail.orderNumber }}</p>
                </li>
              </ul>
              <div class="py-4 w-full flex-grow border-t border-b border-neutral-400">
                <ul class="text-xs flex flex-col gap-y-1 overflow-y-auto" :style="{ height: `${450}px` }">
                  <li v-for="(detailItem, index) in fohOrderStore.getOrderDetail.items" :key="index" class="flex border-b border-gray-100 pb-2">
                    <div class="w-1/2 pr-2 flex flex-col">
                      <div class="font-bold">{{ detailItem.name }}</div>
                      <div class="text-sm text-gray-500 mt-1 flex-grow">{{ detailItem.customization }}</div>
                    </div>
                    <div class="w-1/4 flex items-center justify-center">{{ detailItem.serving }}</div>
                    <div class="w-1/4 flex items-center justify-end">$ {{ detailItem.price }}</div>
                  </li>
                </ul>
              </div>
              <div class="mt-auto w-full text-xl flex flex-col gap-y-1">
                <div class="flex items-center">
                  <p class="me-auto">數量</p>
                  <p>{{ fohOrderStore.getDetailTotalServing }}</p>
                </div>
                <div class="flex items-center">
                  <p class="me-auto">總計</p>
                  <p>$ {{ fohOrderStore.getDetailTotalAmount }}</p>
                </div>
              </div>
              <div class="w-full flex flex-nowrap gap-x-4">
                <Button class="w-1/3 py-1 rounded-3xl text-neutral-950 bg-neutral-50 border border-neutral-400">取消訂單</Button>
                <Button class="w-2/3 py-1 rounded-3xl">完成訂單</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<style scoped></style>

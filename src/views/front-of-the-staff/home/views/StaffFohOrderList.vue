<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useFohOrderStore } from '@/stores/staff/foh/order'
import noDetailImg from '@/assets/images/other/failcup.png'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Paginator from 'primevue/paginator'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'
import Badge from 'primevue/badge'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import Select from 'primevue/select'
const fohOrderStore = useFohOrderStore()
const route = useRoute()
const router = useRouter()
const selectedCardId = ref(null) //控制是否選中卡片
const statusColorMap = {
  待結帳: 'bg-error-200',
  準備中: 'bg-primary-300',
  待取餐: 'bg-tertiary-300',
  已完成: 'bg-neutral-200'
}
const buttonConfig = computed(() => {
  switch (fohOrderStore.getOrderDetailStatus) {
    case '待結帳':
      return { text: '前往結帳', style: 'bg-primery-500 text-white', disabled: false }
    case '準備中':
      return { text: '準備中...', style: 'bg-primery-500 text-white', disabled: true }
    case '待取餐':
      return { text: '完成訂單', style: 'bg-primery-500 text-white', disabled: false }
    case '已完成':
      return { text: '已完成', style: 'bg-primery-500 text-white', disabled: true }
    default:
      return { text: '未知狀態', style: 'bg-primery-500 text-white', disabled: true }
  }
})
const getStatusColor = (status) => statusColorMap[status]

// 點擊切換頁面，獲取該頁的資料
const onPageChange = async (event) => {
  //第一頁為 page:0
  const requestPage = event.page + 1 // 後端需要的頁碼 ( 後端第一頁為:1 )
  await fohOrderStore.fetchOrderData(requestPage, route.params.status)
}
const isCardSelected = computed(() => {
  // 判斷是否 為 null
  return selectedCardId.value === null ? true : false
})

//透過 store 取得 每個狀態( 全部訂單、待結帳... )的總數量(物件)
const orderCounts = computed(() => {
  return {
    all: fohOrderStore.getOrder.all.totalCount,
    unpaid: fohOrderStore.getOrder.unpaid.totalCount,
    preparing: fohOrderStore.getOrder.preparing.totalCount,
    ready: fohOrderStore.getOrder.ready.totalCount,
    completed: fohOrderStore.getOrder.completed.totalCount
  }
})

//點擊卡片，發送獲取對應 id 單一資料api
const handleCard = async (orderId) => {
  if (selectedCardId.value === orderId) {
    selectedCardId.value = null
    // 重置 store 中的訂單詳情數據
    fohOrderStore.resetOrderDetail()
  } else {
    // 選中新卡片並獲取數據
    await fohOrderStore.fetchOrderDetail(orderId)
    selectedCardId.value = orderId
  }
}

// 路由狀態，對應相對的 Tab -> select-router
const orderStates = ref([
  { route: '/staff-foh-home/order/all', label: '全部訂單', icon: 'pi pi-home', countKey: 'all', backgroundColor: 'bg-neutral-950' },
  { route: '/staff-foh-home/order/unpaid', label: '待結帳', icon: 'pi pi-chart-line', countKey: 'unpaid', backgroundColor: 'bg-error-300' },
  { route: '/staff-foh-home/order/preparing', label: '準備中', icon: 'pi pi-list', countKey: 'preparing', backgroundColor: 'bg-primary-300' },
  { route: '/staff-foh-home/order/ready', label: '待取餐', icon: 'pi pi-inbox', countKey: 'ready', backgroundColor: 'bg-tertiary-300' },
  { route: '/staff-foh-home/order/completed', label: '已完成', icon: 'pi pi-inbox', countKey: 'completed', backgroundColor: 'bg-neutral-300' }
])

// 計算屬性：根據當前狀態自動更新數據
const nowOrderState = computed(() => `/staff-foh-home/order/${route.params.status || 'all'}`)

watch(
  () => route.params.status,
  async () => {
    await fohOrderStore.fetchOrderPages()
    await fohOrderStore.fetchOrderData('', route.params.status) //先取得前9筆
    selectedCardId.value = null
    fohOrderStore.resetOrderDetail()
  }
)

// 初始化加載
onMounted(async () => {
  await fohOrderStore.fetchOrderPages()
  await fohOrderStore.fetchOrderData('', route.params.status) //先取得前9筆
})

const handleOrderBtn = async () => {
  // if (fohOrderStore.getOrderDetailStatus === '待結帳') {
  //   console.log('前往付款', fohOrderStore.getIsDetail)

  //   router.push(`/staff-foh-home/checkout/${fohOrderStore.getOrderDetailId}`)
  // }
  // if (fohOrderStore.getOrderDetailStatus === '準備中') {
  //   console.log('準備中-按鈕不給按')
  // }
  const status = fohOrderStore.getOrderDetailStatus
  switch (status) {
    case '待結帳':
      // 執行結帳操作
      console.log('執行結帳操作')
      router.push(`/staff-foh-home/checkout/${fohOrderStore.getOrderDetailId}`)
      break
    case '準備中':
      // 執行準備中操作，例如提醒廚房準備
      console.log('提醒廚房準備')
      break
    case '待取餐':
      // 執行取餐操作，例如標記為已取餐
      console.log('標記為已取餐')
      await fohOrderStore.fetchOrderComplete()
      // router.push(`/staff-foh-home/order/all`)
      break
    case '已完成':
      // 已完成操作，例如顯示已完成提醒
      console.log('訂單已完成')
      break
    default:
      console.log('未知狀態操作')
      break
  }
}

const cities = ref([
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' }
])

const inputValue = ref(null)
const selectedCity = ref(null)

//測試用
const testLine = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20])
const itemsPerPage = 9
// const currentPage = ref(0)

const paginatedItems = computed(() => {
  const start = currentPage.value * itemsPerPage
  const end = start + itemsPerPage
  // console.log(start, end)
  return testLine.value.slice(start, end)
})
</script>
<template>
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
          <InputText fluid class="rounded-3xl" id="search-product" type="text" v-model="inputValue" placeholder="輸入桌號、編號或手機號碼" />
        </IconField>
      </div>
    </div>

    <div class="flex flex-col">
      <Tabs :value="nowOrderState">
        <TabList>
          <Tab v-for="tab in orderStates" :key="tab.label" :value="tab.route" pt:root:class="flex-grow bg-primary-50 p-0">
            <router-link v-if="tab.route" :to="tab.route">
              <a class="block p-3">
                <div class="flex justify-center items-center gap-2">
                  <span>{{ tab.label }}</span>
                  <Badge
                    :value="orderCounts[tab.countKey]"
                    size="large"
                    severity="warn"
                    :class="tab.backgroundColor"
                    pt:root:class="w-7 h-7 rounded-full"
                  />
                </div>
              </a>
            </router-link>
          </Tab>
        </TabList>
      </Tabs>
    </div>
    <div class="flex-grow flex flex-col p-6">
      <div class="grid grid-cols-3 gap-6">
        <Card
          v-for="orderItem in fohOrderStore.getOrderListData"
          :key="orderItem.orderId"
          :class="[
            'border-neutral-950 border shadow-none',
            { 'ring-4 ring-primary-700 border-0 border-transparent': selectedCardId === orderItem.orderId }
          ]"
          :pt:header:class="`p-4 rounded-t-xl ${getStatusColor(orderItem.orderStatus)}`"
          pt:body:class="p-4"
          @click="handleCard(orderItem.orderId)"
        >
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="font-bold text-xl">{{ orderItem.typeAndNumber }}</h3>
              <p class="text-xs">{{ orderItem.orderStatus }}</p>
            </div>
          </template>
          <template #content>
            <ul class="flex flex-col gap-y-2">
              <li class="flex items-center gap-x-2">
                <i class="pi pi-phone"></i>
                <p>{{ orderItem.phone === null ? '無' : orderItem.phone }}</p>
              </li>
              <li class="flex items-center gap-x-2">
                <i class="pi pi-clock"></i>
                <p>{{ orderItem.time }}</p>
              </li>
              <li class="flex items-center gap-x-2">
                <i class="pi pi-dollar"></i>
                <p>{{ orderItem.totalAmount }}</p>
              </li>
            </ul>
          </template>
        </Card>
      </div>
      <Paginator
        class="mt-auto"
        :key="`${route.params.status}-${fohOrderStore.getOrderType}`"
        :rows="itemsPerPage"
        :totalRecords="orderCounts[route.params.status]"
        pt:root:class="bg-primary-50 p-0"
        :pt="{
          pages: 'custom-page-select',
          page: 'hover:bg-neutral-950 hover:text-white hover:rounded-xl',
          first: 'hover:bg-neutral-950 hover:text-white hover:rounded-xl',
          prev: 'hover:bg-neutral-950 hover:text-white hover:rounded-xl',
          next: 'hover:bg-neutral-950 hover:text-white hover:rounded-xl',
          last: 'hover:bg-neutral-950 hover:text-white hover:rounded-xl'
        }"
        @page="onPageChange"
      />
    </div>
  </div>

  <div class="w-[360px] flex flex-col border border-neutral-950 bg-neutral-50">
    <h2 class="w-full py-3 text-center text-neutral-50 bg-primary-700">訂單詳細資訊</h2>
    <div v-show="isCardSelected" class="h-full flex flex-col items-center justify-center">
      <img :src="noDetailImg" class="w-2/3 max-w-full" alt="無明細資料圖" />
      <p class="text-center mt-4">尚未選取訂單</p>
    </div>
    <div v-show="!isCardSelected" class="py-4 px-6 text-2xl flex flex-col items-center gap-y-3 h-full">
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
        <Button :class="`w-2/3 py-1 rounded-3xl ${buttonConfig.style}`" :disabled="buttonConfig.disabled" @click="handleOrderBtn">
          {{ buttonConfig.text }}
        </Button>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
:deep(.custom-page-select) {
  .p-paginator-page-selected {
    background-color: $neutral-950;
    border-radius: 12px;
    color: white;
  }
}
</style>

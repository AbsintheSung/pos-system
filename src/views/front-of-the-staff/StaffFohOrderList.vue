<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Card from 'primevue/card'
import Paginator from 'primevue/paginator'
import { useFohOrderStore } from '@/stores/staff/foh/order'
const fohOrderStore = useFohOrderStore()
const route = useRoute()

const testLine = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20])
const itemsPerPage = 9
// const currentPage = ref(0)

const paginatedItems = computed(() => {
  const start = currentPage.value * itemsPerPage
  const end = start + itemsPerPage
  // console.log(start, end)
  return testLine.value.slice(start, end)
})

// const totalPages = computed(() => Math.ceil(testLine.value.length / itemsPerPage))

const onPageChange = async (event) => {
  //第一頁為 page:0
  const requestPage = event.page + 1 // 後端需要的頁碼 ( 後端第一頁為:1 )
  // currentPage.value = event.page // 保留前端顯示使用的頁碼
  // console.log(event.page, currentPage.value)
  await fohOrderStore.fetchOrderData(requestPage, route.params.status)
  // console.log(currentPage.value)
}
// onMounted(async () => {
//   console.log('子組件', route.params.status)
//   currentPage.value = 0
//   // await fohOrderStore.fetchOrderData()
// })

const orderCounts = computed(() => {
  return {
    all: fohOrderStore.getOrder.all.totalCount,
    unpaid: fohOrderStore.getOrder.unpaid.totalCount,
    preparing: fohOrderStore.getOrder.preparing.totalCount,
    ready: fohOrderStore.getOrder.ready.totalCount,
    completed: fohOrderStore.getOrder.completed.totalCount
  }
})
const handleCard = async (orderId) => {
  console.log(orderId)
  await fohOrderStore.fetchOrderDetail(orderId)
  fohOrderStore.handleCardDrawer()
}
// watch(
//   () => route.params.status, // Watching the specific route param, e.g., status
//   async (newStatus) => {
//     // currentPage.value = 0 // Reset the page number
//     // await fohOrderStore.fetchOrderData(1, newStatus); // Optionally, fetch the first page data based on new status
//   }
// )
// watch(
//   () => fohOrderStore.getOrderType, // Watching the specific route param, e.g., status
//   async (newStatus) => {
//     // currentPage.value = 0 // Reset the page number
//     // console.log('哈囉')
//     // console.log('123')
//     // await fohOrderStore.fetchOrderData(1, newStatus); // Optionally, fetch the first page data based on new status
//   }
// )
</script>
<template>
  <div class="flex-grow flex flex-col p-6">
    <div class="grid grid-cols-3 gap-6">
      <Card
        v-for="orderItem in fohOrderStore.getOrderListData"
        :key="orderItem.orderId"
        class="border-neutral-950 border shadow-none"
        pt:header:class="p-4 bg-tertiary-300 rounded-t-xl"
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
      <!-- <Card
        v-for="item in paginatedItems"
        :key="item"
        class="border-neutral-950 border shadow-none"
        pt:header:class="p-4 bg-tertiary-300 rounded-t-xl"
        pt:body:class="p-4"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="font-bold text-xl">外帶{{ item.toString().padStart(2, '0') }}</h3>
            <p class="text-xs">待取餐</p>
          </div>
        </template>
        <template #content>
          <ul class="flex flex-col gap-y-2">
            <li class="flex items-center gap-x-2">
              <i class="pi pi-phone"></i>
              <p>0970135629</p>
            </li>
            <li class="flex items-center gap-x-2">
              <i class="pi pi-clock"></i>
              <p>12:30 取餐</p>
            </li>
            <li class="flex items-center gap-x-2">
              <i class="pi pi-dollar"></i>
              <p>300</p>
            </li>
          </ul>
        </template>
      </Card> -->
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

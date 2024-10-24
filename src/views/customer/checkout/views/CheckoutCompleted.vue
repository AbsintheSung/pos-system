<script setup>
import { onMounted } from 'vue'
import { useOrderStore } from '@/stores/order.js'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup' // optional
import Row from 'primevue/row' // optional
const orderStore = useOrderStore()
onMounted(async () => {
  await orderStore.fetchOneOrder()
})
</script>
<template>
  <div class="p-3 flex flex-col gap-y-2">
    <h2 class="font-bold text-xl text-center">
      <i class="pi pi-check-circle" style="font-size: 1rem"></i>
      訂單送出
    </h2>
    <div class="flex items-center gap-x-6">
      <div class="flex flex-col gap-y-2">
        <h3 class="font-medium text-center">{{ orderStore.getCompoleteOrderTitle }}</h3>
        <p class="py-3 px-2 rounded-md border-2 bg-neutral-50 border-neutral-950">
          <span class="font-bold text-3xl flex justify-center items-center">{{ orderStore.getCompoleteOrderNumber }}</span>
        </p>
      </div>
      <ul class="font-medium flex flex-col gap-y-3 flex-grow">
        <li>取餐方式 : {{ orderStore.getCompoleteOrderType }}</li>
        <li>點餐時間 : {{ orderStore.getCompoleteOrderTakeTime }}</li>
        <li>付款狀態 : {{ orderStore.getCompoleteOrderStatus }}</li>
      </ul>
    </div>
  </div>
  <div class="p-3 flex flex-col gap-y-2">
    <h2>訂單明細</h2>
    <div class="border border-neutral-950 rounded-lg overflow-hidden">
      <table class="w-full border-collapse">
        <thead>
          <tr class="text-gray-700 whitespace-nowrap bg-secondary-100">
            <th class="py-2 px-4 text-left">商品</th>
            <th class="py-2 px-4 text-center">數量</th>
            <th class="py-2 px-4 text-right">小計</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in orderStore.getCompoleteOrderList" :key="index" class="border-t border-neutral-950 bg-neutral-50">
            <td class="py-2 px-4 text-left">{{ order.name }}</td>
            <td class="py-2 px-4 text-center">{{ order.serving }}</td>
            <td class="py-2 px-4 text-right">${{ order.serving * order.price }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="py-2 bg-primary-200 font-bold">
      <p class="text-center">總計 {{ orderStore.getCompoleteOrderCount }} / 共$ {{ orderStore.getCompoleteOrderTotalAmount }}</p>
    </div>
    <div>
      <p>訂單備註 : {{ orderStore.getCompoleteOrderNote != null ? orderStore.getCompoleteOrderNote : '無' }}</p>
    </div>
  </div>
</template>
<style scoped></style>

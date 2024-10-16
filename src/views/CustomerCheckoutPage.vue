<script setup>
import { ref } from 'vue'
import Timeline from 'primevue/timeline'
import CustomerContainer from '@/layout/CustomerContainer.vue'
const checkoutTimeList = ref([
  { title: '訂單資訊', isActive: false, titleNum: 1 },
  { title: '付款資訊', isActive: false, titleNum: 2 },
  { title: '確認送出', isActive: false, titleNum: 3 }
])
</script>
<template>
  <CustomerContainer>
    <template #default>
      <div class="px-3">
        <Timeline
          :value="checkoutTimeList"
          layout="horizontal"
          pt:event:class="flex-1 justify-center"
          pt:eventContent:class="text-center"
          pt:eventSeparator:class="relative "
          pt:eventMarker:class="-right-1/2 "
          pt:eventConnector:class="absolute -right-1/2"
        >
          <template #marker="slotProps">
            <div class="rounded-full w-4 h-4 bg-primary-600 flex justify-center items-center text-[12px] mx-auto z-10">
              {{ slotProps.item.titleNum }}
            </div>
          </template>
          <template #content="slotProps">
            {{ slotProps.item.title }}
          </template>
        </Timeline>
      </div>
    </template>
  </CustomerContainer>
</template>
<style scoped lang="scss"></style>

<script setup>
import { ref } from 'vue'
import Button from 'primevue/button'
import Card from 'primevue/card'
import { useOrderStore } from '@/stores/customer/order'
const orderStore = useOrderStore()
const buttonDisable = ref(false)

const handlePlusButton = async (orderItemId, serving) => {
  const setData = {
    orderItemId: orderItemId,
    serving: serving + 1
  }
  buttonDisable.value = true
  try {
    const response = await orderStore.fetchPlusCart(setData)
  } catch (error) {
    console.log(error)
  } finally {
    buttonDisable.value = false
  }
}
const handleMinusButton = async (orderItemId, serving) => {
  const setData = {
    orderItemId: orderItemId,
    serving: serving - 1
  }
  buttonDisable.value = true
  try {
    const response = await orderStore.fetchPlusCart(setData)
  } catch (error) {
    console.log(error)
  } finally {
    buttonDisable.value = false
  }
}
</script>
<template>
  <div class="p-3 flex flex-col gap-y-3">
    <h2 class="font-bold text-xl">訂單內容</h2>
    <ul class="flex flex-col gap-y-3">
      <li v-for="orderItem in orderStore.getCartList" :key="orderItem.orderItemId">
        <Card class="border-neutral-950 border shadow-none" pt:body:class="p-3">
          <template #content>
            <div class="flex gap-x-4">
              <div class="flex justify-center items-center">
                <img :src="orderItem.imagePath" :alt="orderItem.name" class="max-w-20 max-h-20 object-cover rounded-xl" />
              </div>
              <div class="flex flex-col gap-y-1 flex-grow">
                <h4 class="font-bold">{{ orderItem.name }}</h4>
                <p class="text-neutral-300">
                  <span v-for="(customItem, index) in orderItem.customization" :key="customItem">
                    {{ customItem }}<span v-if="index < orderItem.customization.length - 1"> | </span>
                  </span>
                </p>
                <p class="font-medium">$ {{ orderItem.price }}</p>
              </div>
              <div class="flex justify-between items-center gap-x-4">
                <Button
                  icon="pi pi-minus"
                  rounded
                  outlined
                  aria-label="Minus"
                  class="bg-neutral-50 text-neutral-950 border-neutral-200 w-7 h-7 text-base"
                  pt:icon:class="text-[12px] "
                  :disabled="buttonDisable"
                  @click="handleMinusButton(orderItem.orderItemId, orderItem.serving)"
                />
                <p>{{ orderItem.serving }}</p>
                <Button
                  icon="pi pi-plus"
                  rounded
                  outlined
                  aria-label="Plus"
                  class="bg-neutral-50 text-neutral-950 border-neutral-200 w-7 h-7 text-base"
                  pt:icon:class="text-[12px]"
                  :disabled="buttonDisable"
                  @click="handlePlusButton(orderItem.orderItemId, orderItem.serving)"
                />
              </div>
            </div>
          </template>
        </Card>
      </li>
    </ul>
    <!-- <div class="flex flex-col gap-y-2">
      <div class="flex items-center justify-between">
        <h3>特殊需求</h3>
        <Chip label="選填" class="py-[2px] px-[10px] text-[12px] bg-primary-200"></Chip>
      </div>
      <Textarea fluid rows="3" />
    </div> -->
  </div>
</template>
<style scoped></style>

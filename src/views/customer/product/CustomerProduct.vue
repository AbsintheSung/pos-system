<script setup>
import { onMounted, ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/customer/product'
import { useOrderStore } from '@/stores/customer/order'
import { useScroll } from '@vueuse/core'
import Chip from 'primevue/chip'
import Button from 'primevue/button'
import Textarea from 'primevue/textarea'
import CustomerHeaderNav from '@/components/customer/header/CustomerHeaderNav.vue'
import CustomerContainer from '@/layout/CustomerContainer.vue'
import CustomerProductRaddio from '@/components/customer/product/CustomerProductRaddio.vue'
import CustomerProductCheckBox from '@/components/customer/product/CustomerProductCheckBox.vue'
import CustomerFooter from '@/components/customer/footer/CustomerFooter.vue'
import router from '@/router'
const productStore = useProductStore()
const orderStore = useOrderStore()
const route = useRoute()
const productId = route.params.id
const { y } = useScroll(window) //使用 vueUse的函式庫，取得裝置垂直值的響應式變化
const userInputData = ref({
  // 1-冰塊，2-冰塊(限冷飲)，3-甜度，4-燕麥奶更換，5-鮮奶油，6加購點心
  1: {
    option: '正常冰'
  },
  2: {
    option: '正常冰'
  },
  3: {
    option: '全糖'
  },
  4: {
    option: '不要更換燕麥奶'
  },
  5: {
    option: '不要鮮奶油'
  },
  6: {
    option: []
  },
  remark: '', //備註
  serving: 1 //份數，預設:1
})

const totalPrice = computed(() => {
  // 獲取選擇的項目
  const selectedItems = userInputData.value[6].option
  const productPrice = productStore.getProductData.price
  // 根據選擇的項目累加價格
  const total = selectedItems.reduce((sum, item) => {
    const foundItem = productStore.getDessertOptions.find((testItem) => testItem.name === item)
    return foundItem ? sum + foundItem.price : sum
  }, 0)

  //將加購 和 商品價格*數量 相加
  return total + productPrice * userInputData.value.serving
})

const customization = computed(() => {
  const result = []
  // 遍歷 getCustomization id 提取資料
  productStore.getCustomization.forEach((id) => {
    if (id === 6) {
      // 針對點心的特別處理
      const selectedItems = userInputData.value[6].option
      selectedItems.forEach((item) => {
        const foundItem = productStore.getDessertOptions.find((testItem) => testItem.name === item)
        if (foundItem) {
          result.push({
            options: foundItem.name,
            extraPrice: foundItem.price
          })
        }
      })
    } else {
      // 處理其他普通選項
      const optionValue = userInputData.value[id].option
      result.push({ options: optionValue })
    }
  })

  // 加入備註
  if (userInputData.value.remark) {
    result.push({
      option: userInputData.value.remark
    })
  }
  return result
})

const isHeaderNavFixed = computed(() => (y.value > 0 ? 'fixed w-full z-20 max-w-screen-sm' : ''))

const handleMinus = () => {
  if (userInputData.value.serving === 1) return
  userInputData.value.serving--
}
const handlePlus = () => {
  userInputData.value.serving++
}
async function handleViewMeals() {
  await orderStore.fetchOrderId()
  const finalData = {
    // guid: orderStore.getGuidId, // 識別碼
    // orderId: Number(orderStore.getOrderId), // 訂單編號
    productId: Number(productId), // 商品編號 ( 此productId router獲取 )
    customization: customization.value, // 客製化選項
    serving: userInputData.value.serving // 份數
  }
  await orderStore.fetchProductInOrder(finalData)
  router.push('/customer/menu')
}
onMounted(async () => {
  await productStore.fetchProductData(productId)
})
</script>
<template>
  <CustomerContainer ref="customerContainer">
    <template #header>
      <CustomerHeaderNav :class="isHeaderNavFixed" />
    </template>
    <template #default>
      <div>
        <img :src="productStore.getProductData.productImagePath" />
      </div>
      <div class="px-3 py-6 flex flex-col gap-y-6">
        <div class="flex flex-col gap-y-2">
          <h2 class="font-bold">{{ productStore.getProductData.name }}</h2>
          <div class="flex items-center mt-auto">
            <i class="pi pi-dollar text-xl"></i>
            <p class="font-bold">{{ productStore.getProductData.price }}</p>
          </div>
          <Chip class="text-[12px] px-[10px] py-[2px] bg-primary-200 w-fit" v-if="productStore.getProductData.isPoint">
            <i class="pi pi-star text-[12px]"></i>
            <span class="font-medium">特價商品不集點</span>
          </Chip>
          <p class="text-[12px] text-neutral-500">{{ productStore.getProductData.description }}</p>
        </div>
        <div>
          <div class="flex flex-col gap-y-4">
            <div v-for="category in productStore.getCustomizationOptions" :key="category.id">
              <CustomerProductRaddio v-if="category.id != 6" :categoryData="category" v-model:raddioData="userInputData[category.id].option" />
              <CustomerProductCheckBox v-else :categoryData="category" v-model:checkBoxData="userInputData[category.id].option" />
            </div>
            <div class="flex flex-col gap-y-2">
              <label class="font-medium">餐點備註</label>
              <Textarea v-model="userInputData.remark" fluid rows="3" />
            </div>
            <div class="flex items-center justify-center gap-x-8">
              <Button
                icon="pi pi-minus"
                rounded
                outlined
                aria-label="Minus"
                class="bg-neutral-50 text-neutral-950 border-neutral-200"
                @click="handleMinus"
              />
              <p>{{ userInputData.serving }}</p>
              <Button
                icon="pi pi-plus"
                rounded
                outlined
                aria-label="Plus"
                class="bg-neutral-50 text-neutral-950 border-neutral-200"
                @click="handlePlus"
              />
            </div>
            <div>
              <Button class="bg-primary-700 rounded-3xl flex items-center justify-between" fluid @click="handleViewMeals">
                <p class="border border-neutral-50 px-2 rounded-md">{{ userInputData.serving }}</p>
                <p>將餐點加入</p>
                <p>${{ totalPrice }}</p>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <CustomerFooter />
    </template>
  </CustomerContainer>
</template>
<style scoped></style>

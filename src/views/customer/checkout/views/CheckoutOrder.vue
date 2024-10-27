<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useElementBounding } from '@vueuse/core'
import { useWindowScroll } from '@vueuse/core'
import { useCheckoutStore } from '@/stores/checkout'
import { useOrderStore } from '@/stores/order.js'
import Button from 'primevue/button'
import SelectButton from 'primevue/selectbutton'
import CheckoutOrderForm from '@/components/customer/checkout/CheckoutOrderForm.vue'
import DineInInput from '@/components/customer/checkout/DineInInput.vue'
import CustomPickUpDate from '@/components/customer/checkout/CustomPickUpDate.vue'
import RewardsProgram from '@/components/customer/checkout/RewardsProgram.vue'
import CheckoutOrderContent from '@/components/customer/checkout/CheckoutOrderContent.vue'
import SpecialNeeds from '@/components/customer/checkout/SpecialNeeds.vue'
import failcupImg from '@/assets/images/other/failcup.png'
const footerButtonDiv = ref(null)
const getFooterButtonDiv = useElementBounding(footerButtonDiv)
const router = useRouter()
const orderStore = useOrderStore()
const checkoutStore = useCheckoutStore()
const windowScroll = useWindowScroll()
const windowScrollY = ref(windowScroll.y)

const PickUpFoodState = {
  TAKE_OUT: '外帶', //外帶
  RESERVE: '預約自取', //預約自取
  DINE_IN: '內用' //內用
}
const pickUpFoodState = ref(PickUpFoodState.TAKE_OUT) //選擇按鈕狀態( 預約、自取... )
const pickUpFoodOptions = ref([
  { name: '現場外帶', value: PickUpFoodState.TAKE_OUT },
  { name: '預約自取', value: PickUpFoodState.RESERVE },
  { name: '內用', value: PickUpFoodState.DINE_IN }
])
// 根據 pickUpFoodState 值 來判斷是否是跟 PickUpFoodState 相同，來做各組建的顯示隱藏
const getPickUpFoodState = computed(() => ({
  takeOutSection: pickUpFoodState.value === PickUpFoodState.TAKE_OUT,
  reserveSection: pickUpFoodState.value === PickUpFoodState.RESERVE,
  dineInSection: pickUpFoodState.value === PickUpFoodState.DINE_IN
}))
const handlePickUpFood = (val) => {
  windowScrollY.value = 0
  checkoutStore.resetForm()
  checkoutStore.checkoutFormData.type = val
}

const handleNextStage = async () => {
  // windowScrollY.value = 0
  const response = await checkoutStore.fetchUpdateCheckout()
  console.log(response)
  if (response.statusCode === 200) {
    router.push('/customer/checkout/payment')
  }
}
const handlePreviousStage = () => {
  // windowScrollY.value = 0
  router.push('/customer/menu')
}

onMounted(() => {
  checkoutStore.checkoutFormData.type = pickUpFoodState.value
})
</script>
<template>
  <div class="p-3 flex flex-col gap-y-2">
    <h2 class="font-bold text-xl">取餐資訊</h2>
    <div class="flex justify-start">
      <SelectButton
        v-model="pickUpFoodState"
        :options="pickUpFoodOptions"
        optionLabel="name"
        optionValue="value"
        :allowEmpty="false"
        aria-labelledby="basic"
        pt:root:class="bg-primary-50 border-transparent flex gap-x-3"
        @update:modelValue="handlePickUpFood"
      />
    </div>

    <div class="flex flex-col gap-y-2" v-show="getPickUpFoodState.reserveSection">
      <h3>門市資訊</h3>
      <div class="bg-primary-100 font-normal p-3 rounded-xl">
        <p class="text-neutral-950">BUY咖</p>
        <p class="text-neutral-600">高雄市苓雅區四維三路217號</p>
      </div>
    </div>
  </div>

  <div v-if="orderStore.getCartListLength != 0">
    <CheckoutOrderForm :getPickUpFoodState="getPickUpFoodState" />
    <!-- <DineInInput v-show="getPickUpFoodState.dineInSection" /> -->
    <!-- <CustomPickUpDate v-show="getPickUpFoodState.reserveSection" /> -->
    <!-- <RewardsProgram /> -->
    <CheckoutOrderContent />
    <SpecialNeeds />
  </div>
  <div v-else class="flex flex-col flex-grow h-full">
    <div class="h-full p-3 flex-grow flex flex-col gap-y-2">
      <h2 class="font-bold text-xl">訂單內容</h2>
      <div class="h-full flex-grow flex items-center justify-center gap-x-2 bg-neutral-200 rounded-lg">
        <img :src="failcupImg" alt="無訂單圖片icon" class="w-12 h-12" />
        <p class="font-medium">肚子空空的，趕快去點餐！</p>
      </div>
    </div>
    <SpecialNeeds />
  </div>

  <div>
    <div :style="{ paddingTop: `${getFooterButtonDiv.height.value}px` }"></div>
    <div
      class="flex items-center gap-x-3 px-3 py-4 fixed bottom-0 mx-auto w-full max-w-screen-sm bg-primary-50 z-10 border-t border-neutral-500 font-medium"
      ref="footerButtonDiv"
    >
      <Button class="py-2 px-3 bg-neutral-50 rounded-3xl border-neutral-200 text-neutral-950" @click="handlePreviousStage"><p>繼續點餐</p></Button>
      <Button
        class="py-2 bg-primary-700 rounded-3xl border-transparent flex-grow flex items-center justify-between"
        @click="handleNextStage"
        :disabled="orderStore.getCartListLength === 0"
      >
        <p class="border border-neutral-50 px-2 rounded-md">{{ orderStore.getCartTotalServing }}</p>
        <p>前往結帳</p>
        <p>$ {{ orderStore.getCartTotalPrice }}</p>
      </Button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
:deep(.p-togglebutton) {
  padding: 8px 24px;
  background-color: $neutral-50;
  border: 1px solid $neutral-300;
  border-radius: 1.5rem;
}
:deep(.p-togglebutton-checked) {
  color: $primary-700;
  border: 1px solid $primary-700;
}
:deep(.p-togglebutton-checked)::before {
  background-color: transparent;
  box-shadow: none;
}
:deep(.p-togglebutton-label) {
  font-size: 0.75em;
}
</style>

<script setup>
import { ref, computed } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import SelectButton from 'primevue/selectbutton'
import DineInInput from '@/components/customer/checkout/DineInInput.vue'
import CustomPickUpDate from '@/components/customer/checkout/CustomPickUpDate.vue'
import RewardsProgram from '@/components/customer/checkout/RewardsProgram.vue'
import CheckoutOrderContent from '@/components/customer/checkout/CheckoutOrderContent.vue'
import SpecialNeeds from '@/components/customer/checkout/SpecialNeeds.vue'
const windowScroll = useWindowScroll()
const windowScrollY = ref(windowScroll.y)
const PickUpFoodState = {
  TAKE_OUT: 'takeOut', //外帶
  RESERVE: 'reserve', //預約自取
  DINE_IN: 'dineIn' //內用
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
const handlePickUpFood = () => {
  windowScrollY.value = 0
}
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

  <DineInInput v-show="getPickUpFoodState.dineInSection" />
  <CustomPickUpDate v-show="getPickUpFoodState.reserveSection" />
  <RewardsProgram />
  <CheckoutOrderContent />
  <SpecialNeeds />
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

<script setup>
import { ref, watch } from 'vue'
import { useElementBounding } from '@vueuse/core'
import SelectButton from 'primevue/selectbutton'
import Button from 'primevue/button'
import Timeline from 'primevue/timeline'
import Card from 'primevue/card'
import Chip from 'primevue/chip'
import Textarea from 'primevue/textarea'
import InputText from 'primevue/inputtext'
import DatePicker from 'primevue/datepicker'
import CustomerContainer from '@/layout/CustomerContainer.vue'
const checkoutTimeList = ref([
  { title: '訂單資訊', isActive: false, titleNum: 1 },
  { title: '付款資訊', isActive: false, titleNum: 2 },
  { title: '確認送出', isActive: false, titleNum: 3 }
])
const footerButtonDiv = ref(null)
const getFooterButtonDiv = useElementBounding(footerButtonDiv)
const dineInNumber = ref(null) //內用桌號
const reserveDate = ref('') //遇缺自取-時間(日)
const reserveTime = ref('') //遇缺自取-時間(時分)
const rewardPoints = ref(null) //集點
const pickUpFoodState = ref('現場外帶')
const pickUpFoodOptions = ref(['現場外帶', '預約自取', '內用'])

const handlePickUpFood = (val) => {
  console.log(val)
}
const todayDate = ref('')
const twoDayDate = ref('')

const now = new Date()
todayDate.value = now // 設置為今天的日期

// 計算兩天後的日期
const futureDate = new Date(now)
futureDate.setDate(futureDate.getDate() + 2) // 將日期加2天
twoDayDate.value = futureDate // 設置為2天後的日期

console.log(getFooterButtonDiv.height.value)
</script>
<template>
  <CustomerContainer>
    <template #header>
      <h2 class="font-semibold text-center py-3 bg-neutral-50">BUY咖啡</h2>
    </template>
    <template #default>
      <div class="px-3 bg-primary-100">
        <Timeline
          :value="checkoutTimeList"
          layout="horizontal"
          pt:event:class="flex-1 justify-center"
          pt:eventContent:class="text-center text-[12px]"
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
      <div class="p-3 flex flex-col gap-y-2">
        <h2 class="font-bold text-xl">取餐資訊</h2>
        <div class="card flex justify-start">
          <SelectButton
            v-model="pickUpFoodState"
            :options="pickUpFoodOptions"
            :allowEmpty="false"
            aria-labelledby="basic"
            pt:root:class="bg-primary-50 border-transparent flex gap-x-3"
            @update:modelValue="handlePickUpFood"
          />
        </div>
        <div class="flex flex-col gap-y-2">
          <h3>門市資訊</h3>
          <div class="bg-primary-100 font-normal p-3 rounded-xl">
            <p class="text-neutral-950">BUY咖</p>
            <p class="text-neutral-600">高雄市苓雅區四維三路217號</p>
          </div>
        </div>
      </div>
      <div class="p-3 flex flex-col gap-y-3">
        <div class="flex items-center justify-between">
          <h2 class="font-bold text-xl">
            <label for="dineInNumber">內用桌號</label>
          </h2>
          <Chip label="必填" class="py-[2px] px-[10px] text-[12px] bg-primary-200"></Chip>
        </div>
        <InputText type="text" id="dineInNumber" v-model="dineInNumber" placeholder="請填寫桌號" fluid class="rounded-3xl" />
      </div>
      <div class="p-3 flex flex-col gap-y-3">
        <div class="flex items-center justify-between">
          <h2 class="font-bold text-xl">自取時間</h2>
          <Chip label="必填" class="py-[2px] px-[10px] text-[12px] bg-primary-200"></Chip>
        </div>
        <DatePicker
          v-model="reserveDate"
          showButtonBar
          fluid
          pt:root:class="custome-input-radius"
          pt:panel:class="mt-2"
          :showOtherMonths="false"
          :minDate="todayDate"
          :maxDate="twoDayDate"
        />
        <DatePicker
          id="datepicker-timeonly"
          v-model="reserveTime"
          timeOnly
          fluid
          :stepMinute="5"
          pt:root:class="custome-input-radius"
          pt:panel:class="mt-2"
        />
      </div>
      <div class="p-3 flex flex-col gap-y-3">
        <div class="flex items-center justify-between">
          <h2 class="font-bold text-xl">
            <label for="rewardPoints">會員集點</label>
          </h2>
          <Chip label="選填" class="py-[2px] px-[10px] text-[12px] bg-primary-200"></Chip>
        </div>
        <InputText type="text" id="rewardPoints" v-model="rewardPoints" placeholder="請輸入手機號碼" fluid class="rounded-3xl" />
      </div>
      <div class="p-3 flex flex-col gap-y-3">
        <h2 class="font-bold text-xl">訂單內容</h2>
        <div>
          <Card class="border-neutral-950 border shadow-none" pt:body:class="p-3">
            <template #content>
              <div class="flex gap-x-4">
                <div>
                  <img src="" alt="" class="min-w-20" />
                </div>
                <div class="flex flex-col gap-y-1 flex-grow">
                  <h4 class="font-bold">經典美式咖啡</h4>
                  <p class="text-neutral-300">少冰 | 微糖 | 大</p>
                  <p class="font-medium">$ 120</p>
                </div>
                <div class="flex justify-between items-center gap-x-4">
                  <Button
                    icon="pi pi-minus"
                    rounded
                    outlined
                    aria-label="Minus"
                    class="bg-neutral-50 text-neutral-950 border-neutral-200 w-7 h-7 text-base"
                  />
                  <p>1</p>
                  <Button
                    icon="pi pi-plus"
                    rounded
                    outlined
                    aria-label="Plus"
                    class="bg-neutral-50 text-neutral-950 border-neutral-200 w-7 h-7 text-base"
                  />
                </div>
              </div>
            </template>
          </Card>
        </div>
        <div class="flex flex-col gap-y-2">
          <div class="flex items-center justify-between">
            <h3>特殊需求</h3>
            <Chip label="選填" class="py-[2px] px-[10px] text-[12px] bg-primary-200"></Chip>
          </div>
          <Textarea fluid rows="3" />
        </div>
      </div>
    </template>
    <template #footer>
      <div :style="{ paddingTop: `${getFooterButtonDiv.height.value}px` }"></div>
      <div
        class="flex items-center gap-x-3 px-3 py-4 fixed bottom-0 mx-auto w-full max-w-screen-sm bg-primary-50 z-10 border-t border-neutral-500"
        ref="footerButtonDiv"
      >
        <Button class="py-2 px-3 bg-neutral-50 rounded-3xl border-neutral-200 text-neutral-950">繼續點餐</Button>
        <Button class="py-2 bg-primary-700 rounded-3xl border-transparent flex-grow">前往結帳</Button>
      </div>
    </template>
  </CustomerContainer>
</template>
<style scoped lang="scss">
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
:deep(.custome-input-radius) {
  > .p-datepicker-input {
    border-radius: 1.5rem !important;
  }
}
</style>

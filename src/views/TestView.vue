<script setup>
import { ref, watch, computed } from 'vue'
import SelectButton from 'primevue/selectbutton'
import Timeline from 'primevue/timeline'
import Chip from 'primevue/chip'
import InputText from 'primevue/inputtext'
import DatePicker from 'primevue/datepicker'
import CustomerContainer from '@/layout/CustomerContainer.vue'
const checkoutTimeList = ref([
  { title: '訂單資訊', isActive: false, titleNum: 1 },
  { title: '付款資訊', isActive: false, titleNum: 2 },
  { title: '確認送出', isActive: false, titleNum: 3 }
])
const dineInNumber = ref(null) //內用桌號
const reserveDate = ref('') //遇缺自取-時間(日)
const reserveTime = ref('') //遇缺自取-時間(時分)
const rewardPoints = ref(null) //集點
const pickUpFoodState = ref('現場外帶')
const pickUpFoodOptions = ref(['現場外帶', '預約自取', '內用'])
const handlePickUpFood = (val) => {
  console.log(val)
}
// const todayDate = ref('')
// const twoDayDate = ref('')

// const now = new Date()
// todayDate.value = now // 設置為今天的日期

// // 計算兩天後的日期
// const futureDate = new Date(now)
// futureDate.setDate(futureDate.getDate() + 2) // 將日期加2天
// twoDayDate.value = futureDate // 設置為2天後的日期

// 獲取當前日期和時間
const today = new Date()
const currentYear = today.getFullYear()
const currentMonth = today.getMonth()
const currentDay = today.getDate()
// 創建今天、明天和後天的日期
const todayDate = new Date(currentYear, currentMonth, currentDay)
const tomorrowDate = new Date(currentYear, currentMonth, currentDay + 1)
const dayAfterTomorrowDate = new Date(currentYear, currentMonth, currentDay + 2)

const disabledDates = computed(() => {
  const disabledDatesArray = []
  const startDate = new Date(currentYear, 0, 1) // 從今年1月1日開始
  const endDate = new Date(currentYear + 1, 0, 2) // 到明年1月2日結束（包括跨年的情況）

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const currentDate = new Date(d)

    // 檢查是否是今年或明年的1月1日
    if (
      currentDate.getFullYear() !== currentYear &&
      !(currentDate.getFullYear() === currentYear + 1 && currentDate.getMonth() === 0 && currentDate.getDate() === 1)
    ) {
      disabledDatesArray.push(new Date(currentDate))
      continue
    }

    // 檢查是否是這個月或下個月（允許跨月）
    if (currentDate.getMonth() !== currentMonth && currentDate.getMonth() !== (currentMonth + 1) % 12) {
      disabledDatesArray.push(new Date(currentDate))
      continue
    }

    // 只允許今天、明天和後天
    if (
      ![todayDate, tomorrowDate, dayAfterTomorrowDate].some(
        (allowedDate) =>
          allowedDate.getDate() === currentDate.getDate() &&
          allowedDate.getMonth() === currentDate.getMonth() &&
          allowedDate.getFullYear() === currentDate.getFullYear()
      )
    ) {
      disabledDatesArray.push(new Date(currentDate))
    }
  }
  return disabledDatesArray
})
console.dir(today)

const roundToNextFiveMinutes = (date) => {
  const minutes = date.getMinutes()
  const remainder = minutes % 5
  if (remainder !== 0) {
    date.setMinutes(minutes + (5 - remainder)) // 將分數四捨五入至5的倍數
  }
}
const test = (val) => {
  const selectedDate = new Date(val) // 將選取的日期轉為 Date 對象

  // 如果選擇的是今天
  if (
    reserveDate.value.getDate() === todayDate.getDate() &&
    reserveDate.value.getMonth() === todayDate.getMonth() &&
    reserveDate.value.getFullYear() === todayDate.getFullYear()
  ) {
    // 如果時間還沒到10:00，設置為10:00
    if (today.getHours() < 10 || (today.getHours() === 10 && today.getMinutes() === 0)) {
      reserveDate.value.setHours(10)
      reserveDate.value.setMinutes(0)
    } else if (today.getHours() >= 22) {
      // 如果已經超過22:00，設置為22:00
      reserveDate.value.setHours(22)
      reserveDate.value.setMinutes(0)
    } else {
      // 否則設置為當前時間，並將分鐘數調整為5的倍數
      reserveDate.value.setHours(today.getHours())
      roundToNextFiveMinutes(reserveDate.value)
    }
  } else if (
    // 如果選擇的是明天或後天，設置為10:00
    (reserveDate.value.getDate() === tomorrowDate.getDate() &&
      reserveDate.value.getMonth() === tomorrowDate.getMonth() &&
      reserveDate.value.getFullYear() === tomorrowDate.getFullYear()) ||
    (reserveDate.value.getDate() === dayAfterTomorrowDate.getDate() &&
      reserveDate.value.getMonth() === dayAfterTomorrowDate.getMonth() &&
      reserveDate.value.getFullYear() === dayAfterTomorrowDate.getFullYear())
  ) {
    reserveDate.value.setHours(10)
    reserveDate.value.setMinutes(0)
  }

  // // 更新 reserveDate 的值
  // reserveDate.value = selectedDate
  // console.log(reserveDate.value)
}

// 計算最小時間
const minTime = computed(() => {
  // 如果選擇的是今天
  if (reserveDate.value === '') return
  if (
    reserveDate.value.getDate() === todayDate.getDate() &&
    reserveDate.value.getMonth() === todayDate.getMonth() &&
    reserveDate.value.getFullYear() === todayDate.getFullYear()
  ) {
    return new Date(currentYear, currentMonth, currentDay, 10, 0)
  } else if (
    reserveDate.value.getDate() === tomorrowDate.getDate() &&
    reserveDate.value.getMonth() === tomorrowDate.getMonth() &&
    reserveDate.value.getFullYear() === tomorrowDate.getFullYear()
  ) {
    return new Date(currentYear, currentMonth, currentDay + 1, 10, 0)
  } else if (
    reserveDate.value.getDate() === dayAfterTomorrowDate.getDate() &&
    reserveDate.value.getMonth() === dayAfterTomorrowDate.getMonth() &&
    reserveDate.value.getFullYear() === dayAfterTomorrowDate.getFullYear()
  ) {
    return new Date(currentYear, currentMonth, currentDay + 2, 10, 0)
  }
  // 如果不符合任何條件，返回 null 或其他預設值
  return null
})

// 計算最大時間
const maxTime = computed(() => {
  if (reserveDate.value === '') return
  if (
    reserveDate.value.getDate() === todayDate.getDate() &&
    reserveDate.value.getMonth() === todayDate.getMonth() &&
    reserveDate.value.getFullYear() === todayDate.getFullYear()
  ) {
    return new Date(currentYear, currentMonth, currentDay, 22, 0)
  } else if (
    reserveDate.value.getDate() === tomorrowDate.getDate() &&
    reserveDate.value.getMonth() === tomorrowDate.getMonth() &&
    reserveDate.value.getFullYear() === tomorrowDate.getFullYear()
  ) {
    return new Date(currentYear, currentMonth, currentDay + 1, 22, 0)
  } else if (
    reserveDate.value.getDate() === dayAfterTomorrowDate.getDate() &&
    reserveDate.value.getMonth() === dayAfterTomorrowDate.getMonth() &&
    reserveDate.value.getFullYear() === dayAfterTomorrowDate.getFullYear()
  ) {
    return new Date(currentYear, currentMonth, currentDay + 2, 22, 0)
  }
  // 如果不符合任何條件，返回 null 或其他預設值
  return null
})
// 設置最小和最大日期
const minDate = ref(todayDate)
const maxDate = computed(() => {
  // 如果後天是下一年，則 maxDate 應該是下一年的 1 月 1 日
  if (dayAfterTomorrowDate.getFullYear() > currentYear) {
    return new Date(currentYear + 1, 0, 1)
  }
  // 否則，maxDate 就是後天
  return dayAfterTomorrowDate
})
watch(
  () => reserveDate.value,
  (val) => {
    console.log(val)
  }
)
</script>
<template>
  <CustomerContainer>
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
          :minDate="minDate"
          :maxDate="maxDate"
          :disabledDates="disabledDates"
          @update:modelValue="test"
        />
        <DatePicker
          id="datepicker-timeonly"
          v-model="reserveDate"
          timeOnly
          :minDate="minTime"
          :maxDate="maxTime"
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
      <div class="p-3">
        <h2 class="font-bold text-xl">訂單內容</h2>
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

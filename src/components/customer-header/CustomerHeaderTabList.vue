<script setup>
// 此組件為舊的(目前暫留)，已經移動至global/CustomerOrderList
import { ref, onMounted, computed, inject } from 'vue'
import { useMenuStore } from '@/stores/menu.js'
import CustomerCard from '../global/CustomerCard.vue'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
const menuStore = useMenuStore()
// const isHeaderListFixed = inject(isHeaderListFixed)
// const getNavHeight = inject(getNavHeight)
// const test1 = inject(isHeaderListFixed)
// const test2 = inject(isGetNavHeight)
defineProps({
  isHeaderListFixed: {
    type: String,
    default: ''
  },
  getNavHeight: {
    type: Number,
    default: 0
  }
})
const listData2 = ref([
  { name: '義式咖啡', url: '/customer/menu/italianCoffee' },
  { name: '茶飲', url: '/customer/menu/tea' },
  { name: '冰沙系列', url: '/customer/menu/smoothies' },
  { name: '蛋糕', url: '/customer/menu/cake' },
  { name: '其他點心', url: '/customer/menu/otherDessert' }
])
onMounted(async () => {
  await menuStore.fetchMenuCategory()
  await menuStore.fetchMenu()
  console.log(menuStore.getMenuList)
  console.log(menuStore.getMenuCategory)
})
</script>
<template>
  <div class="px-3">
    <Tabs :value="menuStore.getCategory" scrollable :lazy="true">
      <TabList
        pt:prevButton:class="bg-primary-50 hidden"
        pt:nextButton:class="bg-primary-50 hidden"
        pt:tabList:class="bg-primary-50 custom-button-active"
        pt:activeBar:class="bg-primary-700"
        :class="isHeaderListFixed"
        :style="{ top: getNavHeight + 'px' }"
      >
        <Tab
          v-for="(categoryItem, index) in menuStore.getMenuCategory"
          :key="categoryItem.category"
          :value="categoryItem.category"
          :class="[
            'bg-primary-50 ',
            'pt-1 pb-2',
            { 'ps-0 pe-4': index === 0 },
            { 'ps-4 pe-0': index === menuStore.getCategory.length },
            { 'px-4': index !== 0 && index !== menuStore.getCategory.length }
          ]"
        >
          {{ categoryItem.category }}
        </Tab>
      </TabList>
      <TabPanels pt:root:class="bg-primary-50 py-3 px-0">
        <TabPanel
          v-for="menuItem in menuStore.getMenuList"
          :key="menuItem.category"
          :value="menuItem.categoryName"
        >
          <h3 class="text-xl font-bold py-3">{{ menuItem.categoryName }}</h3>
          <CustomerCard :getCategoryItem="menuItem.categoryItem" />
        </TabPanel>
        <!-- <h2 class="text-xl font-bold">義式咖啡</h2>
            <ul>
              <li>
                <RouterLink to="/">
                  <Card class="border-neutral-950 border" pt:body:class="p-4">
                    <template #content>
                      <div class="flex gap-x-4">
                        <div class="flex-1 flex flex-col gap-y-2 min-w-0">
                          <h3 class="font-bold">經典美式咖啡</h3>
                          <Chip class="text-[12px] px-[10px] py-[2px] bg-primary-200 w-fit">
                            <i class="pi pi-star text-[12px]"></i>
                            <span class="font-medium">特價商品不集點</span>
                          </Chip>
                          <p class="text-[12px] font-medium text-neutral-500">
                            無糖 | 嚴選義式配方豆，使用中烘焙的咖啡豆，口感溫潤豐厚。
                          </p>
                          <div class="flex items-center">
                            <i class="pi pi-dollar text-xl"></i>
                            <p class="font-bold">120</p>
                          </div>
                        </div>
                        <div class="flex-1 min-w-0 relative">
                          <img src="" alt="" class="w-full object-cover" />
                          <span
                            class="absolute bg-black rounded-lg p-2 flex justify-center items-center bottom-2 right-2"
                          >
                            <i class="pi pi-plus text-[12px] text-neutral-50"></i>
                          </span>
                        </div>
                      </div>
                    </template>
                  </Card>
                </RouterLink>
              </li>
            </ul> -->
      </TabPanels>
    </Tabs>
  </div>
</template>
<style lang="scss" scoped>
.custom-button-active {
  > .p-tab-active {
    color: $primary-700;
  }
}
// .scrollbar-hide {
//   -ms-overflow-style: none; /* IE and Edge */
//   scrollbar-width: none; /* Firefox */
// }
// .scrollbar-hide::-webkit-scrollbar {
//   display: none; /* Chrome, Safari and Opera */
// }
</style>

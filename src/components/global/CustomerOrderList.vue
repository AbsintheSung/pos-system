<script setup>
import { ref, onMounted } from 'vue'
import { useMenuStore } from '@/stores/menu.js'
import CustomerCard from '../global/CustomerCard.vue'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
const menuStore = useMenuStore()
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
        <TabPanel v-for="menuItem in menuStore.getMenuList" :key="menuItem.category" :value="menuItem.categoryName">
          <h3 class="text-xl font-bold py-3">{{ menuItem.categoryName }}</h3>
          <CustomerCard :getCategoryItem="menuItem.categoryItem" />
        </TabPanel>
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
</style>

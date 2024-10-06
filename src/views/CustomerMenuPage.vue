<script setup>
import { ref } from 'vue'
import CustomerContainer from '@/layout/CustomerContainer.vue'
import CustomerHeaderNav from '@/components/customer-header/CustomerHeaderNav.vue'
import CustomerHeaderDrawer from '@/components/customer-header/CustomerHeaderDrawer.vue'
import InputText from 'primevue/inputtext'
const isDrawerOpen = ref(false)
const navHeight = ref(0)
const handleDrawerOpen = () => {
  isDrawerOpen.value = true
}
const handleDrawerClose = () => {
  isDrawerOpen.value = false
}
const getNavHeight = (value) => {
  navHeight.value = value
}
const value = ref('')
</script>
<template>
  <CustomerContainer>
    <template #header>
      <header>
        <CustomerHeaderNav :handleDrawerOpen="handleDrawerOpen" :getNavHeight="getNavHeight" />
        <CustomerHeaderDrawer
          :navHeight="navHeight"
          :isDrawerOpen="isDrawerOpen"
          :handleDrawerClose="handleDrawerClose"
          v-model:isDrawerOpen="isDrawerOpen"
        />
        <div class="p-3 flex flex-col gap-y-2">
          <h1 class="font-bold text-2xl">BUY咖</h1>
          <p class="text-neutral-400">高雄市苓雅區四維三路217號</p>
        </div>
        <div class="p-3">
          <div class="rounded-3xl border w-full flex items-center">
            <i class="pi pi-search text-2xl px-2"></i>
            <InputText
              type="text"
              v-model="value"
              :fluid="true"
              class="border-none border-transparent rounded-3xl px-1"
              placeholder="Search"
            />
          </div>
        </div>
      </header>
    </template>
  </CustomerContainer>
</template>
<style scoped></style>

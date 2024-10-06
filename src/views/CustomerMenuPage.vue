<script setup>
import { ref } from 'vue'
import CustomerContainer from '@/layout/CustomerContainer.vue'
import CustomerHeaderNav from '@/components/customer-header/CustomerHeaderNav.vue'
import CustomerHeaderDrawer from '@/components/customer-header/CustomerHeaderDrawer.vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
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
  <CustomerContainer class="bg-primary-50">
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
          <div class="rounded-3xl border w-full flex items-center bg-white">
            <!-- <i class="pi pi-search text-2xl px-2"></i> -->
            <Button
              icon="pi pi-search"
              class="border-transparent text-neutral-950 bg-white"
              rounded
              outlined
              aria-label="Search"
            />
            <InputText
              type="text"
              v-model="value"
              :fluid="true"
              class="border-none border-transparent rounded-3xl px-1 shadow-none"
              placeholder="Search"
            />
          </div>
        </div>
        <ul class="flex items-center p-3 gap-x-6">
          <li class="flex-grow text-center">
            <RouterLink to="/customer/menu/italianCoffee">義式咖啡</RouterLink>
          </li>
          <li class="flex-grow text-center">
            <RouterLink to="/customer/menu/tea">茶飲</RouterLink>
          </li>
          <li class="flex-grow text-center">
            <RouterLink to="/customer/menu/smoothies">冰沙系列</RouterLink>
          </li>
          <li class="flex-grow text-center">
            <RouterLink to="/customer/menu/cake">蛋糕</RouterLink>
          </li>
          <li class="flex-grow text-center">
            <RouterLink to="/customer/menu/otherDessert">其他點心</RouterLink>
          </li>
        </ul>
      </header>
    </template>
    <template #default>
      <RouterView></RouterView>
    </template>
  </CustomerContainer>
</template>
<style scoped></style>

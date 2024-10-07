<script setup>
import Card from 'primevue/card'
import Chip from 'primevue/chip'
</script>
<template>
  <div>
    <h2 class="text-xl font-bold">義式咖啡</h2>
    <ul>
      <li>
        <RouterLink to="/">
          <Card class="border-neutral-950 border" pt:body:class="p-4">
            <template #content>
              <div class="flex gap-x-4">
                <div class="flex-1 flex flex-col gap-y-2 min-w-0">
                  <h3 class="font-bold">經典美式咖啡</h3>
                  <Chip class="text-[12px] px-[10px] py-[2px] bg-primary-200">
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
    </ul>
  </div>
</template>
<style scoped></style>

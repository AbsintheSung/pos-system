<script setup>
import Card from 'primevue/card'
import Chip from 'primevue/chip'
const props = defineProps({
  getCategoryItem: {
    type: Array,
    default: () => []
  }
})
</script>
<template>
  <ul class="flex flex-col gap-y-3">
    <li v-for="categoryItem in getCategoryItem" :key="categoryItem.productId">
      <RouterLink to="/">
        <Card class="border-neutral-950 border" pt:body:class="p-4">
          <template #content>
            <div class="flex gap-x-4">
              <div class="flex-1 flex flex-col gap-y-2 min-w-0">
                <h3 class="font-bold">{{ categoryItem.name }}</h3>
                <Chip
                  class="text-[12px] px-[10px] py-[2px] bg-primary-200 w-fit"
                  v-if="categoryItem.isPoint"
                >
                  <i class="pi pi-star text-[12px]"></i>
                  <span class="font-medium">特價商品不集點</span>
                </Chip>
                <p class="text-[12px] font-medium text-neutral-500">
                  {{ categoryItem.description }}
                </p>
                <div class="flex items-center">
                  <i class="pi pi-dollar text-xl"></i>
                  <p class="font-bold">{{ categoryItem.price }}</p>
                </div>
              </div>
              <div class="flex-1 min-w-0 relative">
                <img
                  :src="categoryItem.imagePath"
                  :alt="categoryItem.name"
                  class="w-full h-full object-cover rounded-2xl"
                />
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
</template>
<style scoped></style>

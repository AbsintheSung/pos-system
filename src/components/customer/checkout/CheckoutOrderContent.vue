<script setup>
import Button from 'primevue/button'
import Card from 'primevue/card'
</script>
<template>
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
    <!-- <div class="flex flex-col gap-y-2">
      <div class="flex items-center justify-between">
        <h3>特殊需求</h3>
        <Chip label="選填" class="py-[2px] px-[10px] text-[12px] bg-primary-200"></Chip>
      </div>
      <Textarea fluid rows="3" />
    </div> -->
  </div>
</template>
<style scoped></style>

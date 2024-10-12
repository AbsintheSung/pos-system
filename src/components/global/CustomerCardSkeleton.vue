<script setup>
import Card from 'primevue/card'
import Skeleton from 'primevue/skeleton'
</script>
<template>
  <Card class="border-neutral-950 border shadow-none" pt:body:class="p-4">
    <template #content>
      <div class="flex gap-x-4">
        <div class="flex-1 flex flex-col gap-y-2 min-w-0">
          <h3 class="font-bold"><Skeleton class="bg-primary-100" width="50%"></Skeleton></h3>

          <p class="text-[12px] font-medium text-neutral-500 flex flex-col gap-y-3">
            <Skeleton class="bg-primary-100"></Skeleton>
            <Skeleton class="bg-primary-100"></Skeleton>
            <Skeleton class="bg-primary-100"></Skeleton>
          </p>
          <div class="flex items-center mt-auto">
            <Skeleton class="bg-primary-100" width="50%"></Skeleton>
          </div>
        </div>
        <div class="flex-1 min-w-0 relative">
          <Skeleton class="bg-primary-100" height="100%"></Skeleton>
        </div>
      </div>
    </template>
  </Card>
</template>
<style scoped></style>

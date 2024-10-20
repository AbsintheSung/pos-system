<script setup>
import Timeline from 'primevue/timeline'
defineProps({
  orderStatus: {
    type: Array,
    default: () => []
  }
})
</script>
<template>
  <Timeline
    :value="orderStatus"
    layout="horizontal"
    pt:event:class="flex-1 justify-center"
    pt:eventContent:class="text-center text-[12px]"
    pt:eventSeparator:class="relative"
    pt:eventMarker:class="-right-1/2"
    pt:eventConnector:class="absolute -right-1/2 test bg-primary-700"
  >
    <template #marker="slotProps">
      <div
        :class="[
          'rounded-full w-4 h-4 flex justify-center items-center text-[12px] mx-auto z-10',
          slotProps.item.isActive ? 'bg-primary-700 text-white' : 'bg-neutral-50 text-black'
        ]"
      >
        {{ slotProps.item.titleNum }}
      </div>
    </template>
    <template #content="slotProps">
      <p :class="['text-[12px]', slotProps.item.isActive ? 'text-primary-700 font-bold' : 'text-black']">
        {{ slotProps.item.title }}
      </p>
    </template>
  </Timeline>
</template>
<style scoped></style>

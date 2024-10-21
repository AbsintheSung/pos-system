<script setup></script>
<template>
  <div class="p-3 flex flex-col gap-y-2">
    <h2 class="font-bold text-xl text-center">
      <i class="pi pi-check-circle" style="font-size: 1rem"></i>
      訂單送出
    </h2>
    <div class="flex items-center gap-x-6">
      <div class="flex flex-col gap-y-2">
        <h3 class="font-medium text-center">取餐編號</h3>
        <p class="py-3 px-2 rounded-md border-2 bg-neutral-50 border-neutral-950">
          <span class="font-bold text-3xl">A99</span>
        </p>
      </div>
      <ul class="font-medium flex flex-col gap-y-3 flex-grow">
        <li>取餐方式 : 內用</li>
        <li>點餐時間 : 7/24 (三) 11:00</li>
        <li>付款狀態 : 已結帳</li>
      </ul>
    </div>
  </div>
  <div class="p-3 flex flex-col gap-y-2">
    <h2>訂單明細</h2>
  </div>
</template>
<style scoped></style>

<script setup>
import logoImg from '@/assets/images/logo/logo.png'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { RouterLink } from 'vue-router'
</script>
<template>
  <div class="bg-primary-50">
    <main class="w-full max-w-screen-xl min-h-screen mx-auto relative flex flex-col items-center justify-center">
      <div class="flex flex-col gap-y-3">
        <div>
          <img :src="logoImg" alt="log圖片" />
        </div>
        <div class="p-3 bg-neutral-50 border border-black rounded-3xl">
          <form class="flex flex-col gap-y-4 font-medium">
            <div class="flex flex-col gap-y-3">
              <label for="account">帳號</label>
              <InputText id="account" class="rounded-3xl" fluid />
            </div>
            <div class="flex flex-col gap-y-3">
              <label for="password">密碼</label>
              <InputText id="password" class="rounded-3xl" fluid />
            </div>

            <div class="py-3">
              <Button fluid class="bg-primary-700 rounded-3xl">登入</Button>
              <div class="text-center py-2">
                <RouterLink to="/staff-login" class="underline text-primary-700 underline-offset-4">忘記密碼?</RouterLink>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>
<style scoped></style>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useStaffFohStore } from '@/stores/staff/foh/auth'
import AnimeLoading from '@/components/global/AnimeLoading.vue'
import AnimeCard from '@/components/global/AnimeCard.vue'
import logoImg from '@/assets/images/logo/logo.png'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import LoadingImage_1 from '@/assets/images/loading/loading-1.png'
import LoadingImage_2 from '@/assets/images/loading/loading-2.png'
import LoadingImage_3 from '@/assets/images/loading/loading-3.png'
const staffFohStore = useStaffFohStore()
const toast = useToast()
const loadingImgs = [LoadingImage_1, LoadingImage_2, LoadingImage_3]
const isLoading = ref(false)
const staffLogin = ref({
  account: '', //帳號
  password: '' //密碼
})
const handleLogin = async () => {
  toast.removeAllGroups()
  try {
    isLoading.value = true
    const resposneMes = await staffFohStore.fetchAuthData(staffLogin.value)
    toast.add({ severity: 'success', summary: '系統通知', detail: `${resposneMes}`, life: 1000 })
    console.log('resposneMes', resposneMes)
  } catch (error) {
    console.log('resposneERRor', error)
    toast.add({ severity: 'warn', summary: '系統通知', detail: `${error}`, life: 1000 })
  } finally {
    isLoading.value = false
  }
}
</script>
<template>
  <div class="bg-primary-50">
    <Toast
      position="top-center"
      :pt="{
        messageicon: { class: '!hidden' },
        buttoncontainer: { class: 'hidden' }
      }"
    >
    </Toast>
    <!-- <AnimeLoading :isLoading="isLoading" loadingTitle="登入中...">
      <AnimeCard :images="loadingImgs" class="w-48 h-48" />
    </AnimeLoading> -->
    <main class="w-full max-w-screen-xl min-h-screen mx-auto relative flex flex-col items-center justify-center">
      <div class="flex flex-col gap-y-3">
        <div>
          <img :src="logoImg" alt="log圖片" />
        </div>
        <div class="p-3 bg-neutral-50 border border-black rounded-3xl">
          <form class="flex flex-col gap-y-4 font-medium">
            <div class="flex flex-col gap-y-3">
              <label for="account">帳號</label>
              <InputText id="account" class="rounded-3xl" v-model="staffLogin.account" fluid :disabled="isLoading" />
            </div>
            <div class="flex flex-col gap-y-3">
              <label for="password">密碼</label>
              <InputText id="password" class="rounded-3xl" v-model="staffLogin.password" fluid :disabled="isLoading" />
            </div>

            <div class="py-3">
              <Button fluid class="bg-primary-700 rounded-3xl" @click="handleLogin" :disabled="isLoading">
                <p>登入</p>
                <i v-show="isLoading" class="pi pi-spin pi-spinner"></i>
              </Button>
              <div class="text-center py-2">
                <RouterLink to="/staff-foh-login" class="underline text-primary-700 underline-offset-4">忘記密碼?</RouterLink>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>
<style scoped lang="scss"></style>

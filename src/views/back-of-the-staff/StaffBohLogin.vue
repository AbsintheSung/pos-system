<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStaffBohStore } from '@/stores/staff/boh/auth'
import logoImg from '@/assets/images/logo/logo.png'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
const staffBohStore = useStaffBohStore()
const toast = useToast()
const router = useRouter()
const isLoading = ref(false)
const staffLogin = ref({
  account: '', //帳號
  password: '' //密碼
})
const handleLogin = async () => {
  toast.removeAllGroups()
  try {
    isLoading.value = true
    const resposneMes = await staffBohStore.fetchBohAuthData(staffLogin.value)
    toast.add({ severity: 'success', summary: '系統通知', detail: `${resposneMes}`, life: 1000 })
    isLoading.value = false
    router.push('/staff-boh-home')
    // console.log('resposneMes', resposneMes)
  } catch (error) {
    // console.log('resposneERRor', error)
    toast.add({ severity: 'warn', summary: '系統通知', detail: `${error}`, life: 1000 })
    isLoading.value = false
  }
}
</script>
<template>
  <div class="bg-primary-50">
    <Toast
      position="top-center"
      :pt="{
        messageContent: { class: 'flex' },
        messageicon: { class: 'my-1 mx-2' },
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

<script setup lang="ts">
import { ref } from 'vue'
import { auth } from '../api/authApi'

const username = ref<string>('')
const password = ref<string>('')

const props = defineProps<{
  visableAuthDialog: boolean
}>()

const emit = defineEmits<{
  (e:'update:visableAuthDialog', v:boolean) : void
}>()

// async function login() {
//   try {
//     const response = await axios.post('http://localhost:8080/api/auth/login', {
//       username: username.value,
//       password: password.value,
//     })

//     const token = response.data.token
//     console.log('JWT:', token)

//     localStorage.setItem('token', token)
//     window.location.href = '/dashboard'
//   } catch (error) {
//     console.error('Ошибка авторизации:', error)
//   }
// }
const authUser = async () => {
  try {
    const res = await auth(username.value, password.value)
    username.value = '';
    password.value = '';
  } catch(error) {
  }
}

const closeDialog = (v:boolean) =>{
  console.log('close', v)
  emit('update:visableAuthDialog', v)
}
</script>

<template>
  <Dialog
    v-model:visible="props.visableAuthDialog"
    @update:visible="closeDialog"
    modal
    :style="{ width: '25rem', borderRadius: '1rem' }"
    :pt="{
      header: { class: 'text-center text-xl font-semibold text-white border-0 pb-0' },
      content: { class: 'text-white' },
      footer: { class: 'border-0 pt-0' }
    }"
  >
    <template #header>Авторизация</template>

    <!-- Контент -->
    <div class="flex flex-col gap-5">
      <span class="p-input-icon-left w-full">
        <i class="pi pi-user text-gray-400" />
        <InputText
          v-model="username"
          placeholder="Имя пользователя"
          class="w-full"
        />
      </span>

      <span class="p-input-icon-left w-full">
        <i class="pi pi-lock text-gray-400" />
        <Password
          v-model="password"
          placeholder="Пароль"
          toggleMask
          class="w-full"
          inputClass="w-full"
        />
      </span>

      <Button
      unstyled
      label="Войти"
      @click="authUser"
      class="
        w-full
        bg-gradient-to-r from-red-600 to-red-700
        hover:from-red-700 hover:to-red-800
        text-white font-semibold rounded-xl
        py-3 transition duration-300 shadow-lg
      "
      />
    </div>
    <div class="mt-3 flex items-center justify-between text-sm">
      <button class="text-gray-300 hover:text-white" @click="goForgot"></button>
      <button class="text-gray-300 hover:text-white" @click="goRegister">Регистрация</button>
    </div>
  </Dialog>
</template>

<style scoped>

</style>


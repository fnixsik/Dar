<script setup lang="ts">
import { ref } from 'vue'
import { auth } from '../api/authApi'

const username = ref<string>('')
const password = ref<string>('')

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
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-800">
    <Card class="w-96 shadow-2xl rounded-2xl p-6 text-gray-800 bg-white">
      <template #title>
        <div class="text-center text-xl font-semibold text-white-900 mb-6">Авторизация</div>
      </template>

      <template #content>
        <div class="space-y-6">
          <span class="p-input-icon-left w-full">
            <i class="pi pi-user text-gray-500" />
            <InputText v-model="username"
                       placeholder="Имя пользователя"
                       class="w-full" />
          </span>

          <span class="p-input-icon-left w-full">
            <i class="pi pi-lock text-gray-500" />
            <Password v-model="password"
                      placeholder="Пароль"
                      toggleMask
                      class="w-full"
                      inputClass="w-full" />
          </span>
        </div>
      </template>

      <template #footer>
        <Button label="Войти"
                @click="authUser"
                class="w-full !bg-emerald-500 hover:!bg-emerald-600 text-white font-medium border-none shadow-md transition-all mt-6" />
      </template>
    </Card>
  </div>
</template>


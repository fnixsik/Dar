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
      content: { class: 'bg-slate-900 text-white' },
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
        label="Войти"
        @click="authUser"
        class="w-full !bg-emerald-500 hover:!bg-emerald-600 text-white font-medium border-none shadow-md transition-all"
      />
    </div>
  </Dialog>
</template>

<style scoped>

</style>


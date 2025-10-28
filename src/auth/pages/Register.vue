<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  visibleRegisterDialog: boolean
}>()

const emit = defineEmits<{
  (e:'update:visibleRegisterDialog', v:boolean) : void
}>()

const router = useRouter()

// Поля формы
const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

// Ошибки валидации
const errors = ref<{ [key: string]: string }>({})

// Валидация
const validate = () => {
  errors.value = {}
  let valid = true

  if (!username.value.trim()) {
    errors.value.username = 'Введите имя пользователя'
    valid = false
  }

  if (!email.value.trim()) {
    errors.value.email = 'Введите email'
    valid = false
  } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    errors.value.email = 'Неверный формат email'
    valid = false
  }

  if (!password.value.trim()) {
    errors.value.password = 'Введите пароль'
    valid = false
  }

  if (password.value !== confirmPassword.value) {
    errors.value.confirmPassword = 'Пароли не совпадают'
    valid = false
  }

  return valid
}

// Регистрация
const handleRegister = async () => {
  if (!validate()) return

  // try {
  //   const response = await register(username.value, email.value, password.value)
  //   console.log('Регистрация успешна', response)
  //   window.$toast.showSuccess('Регистрация прошла успешно')
  //   closeDialog(false)
  //   router.push('/login') // редирект на авторизацию
  // } catch (err) {
  //   console.error('Ошибка регистрации', err)
  //   window.$toast.showError('Ошибка регистрации')
  // }
}

// Переход на авторизацию
const goLogin = (v: boolean) => {
  emit('update:visibleRegisterDialog', v)
}
</script>

<template>
  <Dialog
    v-model:visible="props.visibleRegisterDialog"
    modal
    :draggable="false"
    :closable="false"
    :style="{ width: '25rem', borderRadius: '1rem' }"
    class="register-dialog"
  >
    <!-- Заголовок с кнопкой "Назад" -->
    <template #header>
      <div class="flex items-center justify-between w-full">
        <button
          class="flex items-center text-white transition cursor-pointer hover:text-red-500"
          @click="goLogin(true)"
        >
          <i class="pi pi-arrow-left mr-2"></i>
        </button>
        <h2 class="text-lg font-semibold text-white">Регистрация</h2>
        <span class="w-8"></span>
      </div>
    </template>

    <!-- Контент формы -->
    <div class="flex flex-col items-center justify-center gap-4 text-white mt-3 text-center">
      <InputText v-model="username" placeholder="Имя пользователя" class="w-full" />
      <span class="text-red-500 text-sm">{{ errors.username }}</span>

      <InputText v-model="email" placeholder="Email" class="w-full" />
      <span class="text-red-500 text-sm">{{ errors.email }}</span>

      <!-- Новый стиль пароля -->
      <Password
        v-model="password"
        placeholder="Пароль"
        toggleMask
        :feedback="true"
        inputClass="w-full"
        :pt="{ icon: { class: 'text-gray-400' } }"
        class="w-full"
      />
      <span class="text-red-500 text-sm">{{ errors.password }}</span>

      <Password
        v-model="confirmPassword"
        placeholder="Подтвердите пароль"
        toggleMask
        :feedback="true"
        inputClass="w-full"
        :pt="{ icon: { class: 'text-gray-400' } }"
        class="w-full"
      />
      <span class="text-red-500 text-sm">{{ errors.confirmPassword }}</span>

      <Button
      unstyled
      label="Зарегистрироваться"
      class="
        w-full
        bg-gradient-to-r from-red-600 to-red-700
        hover:from-red-700 hover:to-red-800
        text-white font-semibold rounded-xl
        py-3 transition duration-300 shadow-lg
      "
      @click="handleRegister"
      />
    </div>
  </Dialog>
</template>


<style scoped>
/* Центрирует диалог на экране */
:deep(.p-dialog) {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Настраиваем сам контейнер */
.register-dialog :deep(.p-dialog-content) {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 1rem;
}

/* Анимация для плавного появления */
:deep(.p-dialog-mask) {
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.p-inputtext:enabled:focus) {
  border-color: #B00D15 !important;
  box-shadow: 0 0 0 2px rgba(176, 13, 21, 0.3);
  outline: none;
}


</style>

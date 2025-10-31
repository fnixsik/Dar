<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import Auth from '@/auth/pages/Auth.vue'
import Register from '@/auth/pages/Register.vue'
import 'primeicons/primeicons.css'

const router = useRouter()
const scrolled = ref(false)
const mobileMenu = ref(false)
const visableAuthDialog = ref<boolean>(false)
const RegisterDialog = ref<boolean>(false)
const username = ref<string | null>(null)
const dropdownVisible = ref(false)

// обработчик скролла
const handleScroll = () => {
  scrolled.value = window.scrollY > 10
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  takeToken()
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

// переключение меню
const toggleMenu = () => (mobileMenu.value = !mobileMenu.value)

// авторизация
const handleAuthClick = (e : any) => {
  if(e){
    router.push('/login')
    visableAuthDialog.value = true
    RegisterDialog.value = false
  }else{
    visableAuthDialog.value = false
    router.push('/')
  }
}

const handleAuthClick12 = () =>{
  dropdownVisible.value = !dropdownVisible.value;
}

const takeToken = async () => {
  try {
    const userData = sessionStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      username.value = user.username || null;
    }
  } catch (error) {
      console.error('Error loading username:', error);
      username.value = null;
  }
}

const logout = () => {
  sessionStorage.removeItem('user')
  username.value = null
  router.push('/')
  dropdownVisible.value = false
}

const registerACtion = (e: any) => {
  if(e){
  router.push('/register')
  visableAuthDialog.value = false
  RegisterDialog.value = true
  }else{
    RegisterDialog.value = false
    router.push('/')
  }
}

</script>

<template>
  <Auth :visableAuthDialog="visableAuthDialog" @update:visableAuthDialog="handleAuthClick" @update:visableRegisterDialog="registerACtion"/>
  <Register :visibleRegisterDialog="RegisterDialog" @update:visibleRegisterDialog="handleAuthClick"/>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled
        ? 'bg-gray-900/95 shadow-lg py-3'
        : 'bg-gray-900/80 backdrop-blur-md py-4'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
      <router-link to="/" class="text-2xl font-bold text-white tracking-wider">
        DAR
      </router-link>

      <nav class="hidden md:flex space-x-8">
        <router-link
          v-for="item in [
            {to:'/', label:'ГЛАВНАЯ'},
            {to:'/teams', label:'КОМАНДА'},
            {to:'/news', label:'НОВОСТИ'},
            {to:'/branch', label:'ФИЛИАЛЫ'},
            {to:'/outside', label:'ВНЕ ОКТАГОНА'},
            {to:'/about', label:'О НАС'}
          ]"
          :key="item.to"
          :to="item.to"
          class="text-white hover:text-gray-300 transition-colors font-medium pb-1 border-b-2 border-transparent hover:border-red-600"
          active-class="border-red-600 text-red-500"
        >
          {{ item.label }}
        </router-link>
      </nav>

      <!-- Правая часть -->
      <div class="flex items-center gap-4">
        <!-- Иконка авторизации -->
        <div class="relative inline-block">
          <!-- Если пользователь авторизован -->
          <div
            v-if="username"
            class="flex items-center gap-2 cursor-pointer hover:text-red-500 transition"
            @click="handleAuthClick12"
          >
            <i class="pi pi-user text-2xl"></i>
            <span class="font-medium">{{ username }}</span>
          </div>

          <!-- Если не авторизован -->
          <div
            v-else
            class="cursor-pointer hover:text-red-500 transition"
            @click="handleAuthClick"
          >
            <i class="pi pi-user text-2xl"></i>
          </div>

          <!-- Выпадающее меню -->
          <div
            v-if="dropdownVisible"
            class="absolute left-1/2 -translate-x-1/2 mt-2 w-26 bg-[#1f1f1f] border bg-gray-900/95 rounded-lg shadow-lg z-50"
          >
            <ul class="flex flex-col text-white text-sm">
              <li
                class="px-4 py-2 hover:bg-red-500 cursor-pointer rounded-t-lg text-center"
              >
                Профиль
              </li>
              <li
                class="px-4 py-2 hover:bg-red-500 cursor-pointer rounded-b-lg text-center"
                @click="logout"
              >
                Выйти
              </li>
            </ul>
          </div>
        </div>

        <!-- Бургер -->
        <button class="md:hidden text-white" @click="toggleMenu">
          <svg
            v-if="!mobileMenu"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>

          <!-- ✖ крестик при открытии -->
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Мобильное меню -->
    <transition name="slide">
      <div
        v-if="mobileMenu"
        class="md:hidden absolute top-full left-0 w-full bg-gray-900/95 border-t border-zinc-700"
      >
        <ul class="flex flex-col items-center py-4 space-y-4">
          <li
            v-for="item in [
              {to:'/', label:'ГЛАВНАЯ'},
              {to:'/teams', label:'КОМАНДА'},
              {to:'/news', label:'НОВОСТИ'},
              {to:'/branch', label:'ФИЛИАЛЫ'},
              {to:'/outside', label:'ВНЕ ОКТАГОНА'},
              {to:'/about', label:'О НАС'}
            ]"
            :key="item.to"
          >
            <router-link
              :to="item.to"
              class="text-white hover:text-red-400 text-lg transition"
              active-class="text-red-500"
              @click="toggleMenu"
            >
              {{ item.label }}
            </router-link>
          </li>
        </ul>
      </div>
    </transition>
  </header>

  <!-- отступ под фиксированный header -->
  <div class="pt-16"></div>
</template>

<style>
/* плавное появление мобильного меню */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.25s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

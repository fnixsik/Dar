<script setup lang="ts">
import { ref, onMounted } from 'vue'

const scrolled = ref(false)

onMounted(() => {
  window.addEventListener('scroll', () => {
    scrolled.value = window.scrollY > 10
  })
})
</script>

<template>
  <header 
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4',
      scrolled ? 'bg-gray-900 shadow-lg py-3' : 'bg-gray-900 backdrop-blur-sm py-4'
    ]"
  >
    <div class="container mx-auto flex justify-between items-center px-50">
      <h1 class="text-2xl font-bold text-white">DAR</h1>
      
      <nav class="hidden md:block">
        <ul class="flex space-x-10">
          <li>
            <router-link 
              to="/" 
              class="
              text-white hover:text-gray-300 transition-colors 
                font-medium pb-2 cursor-pointer"
              active-class="text-blue-600 border-b-2 border-red-600"
            >
              ГЛАВНАЯ
            </router-link>
          </li>
          <li>
            <router-link 
              to="/teams" 
              class="
              text-white hover:text-gray-300 transition-colors 
                font-medium pb-2 cursor-pointer"
              active-class="text-blue-600 border-b-2 border-red-600"
            >
              КОМАНДА
            </router-link>
          </li>
          <li>
            <router-link 
              to="/news" 
              class="
              text-white hover:text-gray-300 transition-colors 
                font-medium pb-2 cursor-pointer"
              active-class="text-blue-600 border-b-2 border-red-600"
            >
              НОВОСТИ
            </router-link>
          </li>
          <li>
            <router-link 
              to="/branch" 
              class="
              text-white hover:text-gray-300 transition-colors
                font-medium pb-2 cursor-pointer"
              active-class="text-blue-600 border-b-2 border-red-600"
            >
              ФИЛИАЛЫ
            </router-link>
          </li>
          <li>
            <router-link 
              to="/outside" 
              class="
              text-white hover:text-gray-300 transition-colors
                font-medium pb-2 cursor-pointer"
              active-class="text-blue-600 border-b-2 border-red-600"
            >
              ВНЕ ОКТАГОНА
            </router-link>
          </li>
          <li>
            <router-link 
              to="/about" 
              class="
              text-white hover:text-gray-300 transition-colors
                font-medium pb-2 cursor-pointer"
              active-class="text-blue-600 border-b-2 border-red-600"
            >
              О НАС
            </router-link>
          </li>
          
        </ul>
      </nav>

      <!-- Мобильное меню -->
      <button class="md:hidden text-white">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  </header>

  <!-- Добавьте этот div для отступа основного контента -->
  <div class="pt-16"></div>
</template>
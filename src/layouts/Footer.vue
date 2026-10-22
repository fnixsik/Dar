<script setup lang="ts">

</script>

<template>
  <footer class="w-full bg-[#0d0f12] text-white flex justify-center items-center">
    <div class="w-full max-w-[1280px] min-h-[100px] px-[32px] py-4 flex flex-col md:flex-row justify-between items-center gap-6">
      
      <!-- Секция слева: Логотип + Копирайт -->
      <div class="flex items-center gap-4 flex-none">
        <router-link to="/">
          <img 
            src="../assets/img/logoMain.png"
            alt="DAR TEAM" 
            class="h-8 w-auto object-contain"
          />
        </router-link>
        <span class="text-[#8c94a0] text-sm uppercase tracking-wider font-medium">
          © 2025 DAR TEAM. ВСЕ ПРАВА ЗАЩИЩЕНЫ.
        </span>
      </div>

      <!-- Секция по центру: Навигационные ссылки -->
<!-- Секция по центру: Навигационные ссылки -->
<div class="flex items-center gap-8">
  <router-link 
    to="/privacy-policy" 
    class="text-white hover:text-gray-300 transition-colors font-medium uppercase"
  >
    ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ
  </router-link>

  <router-link 
    to="/branch" 
    class="text-white hover:text-gray-300 transition-colors font-medium uppercase"
  >
    КОНТАКТЫ
  </router-link>
</div>

      <!-- Секция справа: Социальные сети (круглые иконки) -->
      <div class="flex items-center gap-3 flex-none">
        <a 
          href="https://www.instagram.com/darteam.kazakhstan/" 
          target="_blank" 
          rel="noopener noreferrer"
          class="w-10 h-10 rounded-full bg-[#1b1e24] flex justify-center items-center text-gray-300 hover:bg-red-600 hover:text-white transition-all"
        >
          <i class="pi pi-instagram text-lg"></i>
        </a>

        <a 
          href="https://www.youtube.com/@DARTeam-pro" 
          target="_blank" 
          rel="noopener noreferrer"
          class="w-10 h-10 rounded-full bg-[#1b1e24] flex justify-center items-center text-gray-300 hover:bg-red-600 hover:text-white transition-all"
        >
          <i class="pi pi-youtube text-lg"></i>
        </a>

        <a 
          href="https://www.tiktok.com/@darteam_kazakhstan" 
          target="_blank" 
          rel="noopener noreferrer"
          class="w-10 h-10 rounded-full bg-[#1b1e24] flex justify-center items-center text-gray-300 hover:bg-red-600 hover:text-white transition-all"
        >
          <i class="pi pi-tiktok text-lg"></i>
        </a>
      </div>

    </div>
  </footer>
</template>
<script setup lang="ts">

</script>

<template>
  <div class="relative bg-red-300 w-full" style="height: 80vh; min-height: 720px;">
    <!-- Главная картинка (фоновая) -->
    <img 
      src="/src/assets/img/Main_img2.jpg" 
      alt="Главная картинка" 
      class="w-full h-full object-cover"
    />

    <!-- Лого поверх -->
    <img 
      src="/src/assets/img/Main_img8.svg" 
      alt="Logo main" 
      class="absolute inset-0 m-auto"
      style="max-width: 700px;"
    />
  </div>
</template>

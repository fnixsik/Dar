<script setup lang="ts">

</script>


<template>
  <header class="bg-white-500 text-white p-4 shadow-md">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-2xl font-bold">Мой сайт</h1>
      <nav>
        <ul class="flex space-x-4">
          <li><router-link to="/">Главная</router-link></li>
          <li><router-link to="/about">О нас</router-link></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

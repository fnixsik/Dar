<script setup lang="ts">


</script>

<template>
<div class="head flex bg-[#121212]">
  <aside class="w-64 bg-[#18181B] border-r border-gray-800 p-6 flex flex-col">
    <div class="flex flex-col items-center mb-10">
      <div class="w-20 h-20 bg-gray-800 rounded-full mb-3 flex items-center justify-center border border-gray-700">
        <i class="pi pi-user text-2xl text-gray-400"></i>
      </div>
      <h2 class="text-white font-bold text-sm">Иван Иванов</h2>
      <span class="text-xs text-gray-500">Пользователь</span>
    </div>

    <nav class="space-y-2 flex-1">
      <a href="#" class="flex items-center gap-3 p-3 rounded-lg bg-emerald-500/10 text-emerald-500">
        <i class="pi pi-home"></i> <span>Профиль</span>
      </a>
      <a href="#" class="flex items-center gap-3 p-3 rounded-lg text-gray-400 hover:bg-gray-800 transition">
        <i class="pi pi-video"></i> <span>Мои видео</span>
      </a>
      <a href="#" class="flex items-center gap-3 p-3 rounded-lg text-gray-400 hover:bg-gray-800 transition">
        <i class="pi pi-credit-card"></i> <span>Подписки</span>
      </a>
    </nav>

    <button class="flex items-center gap-3 p-3 text-red-500 hover:bg-red-500/10 rounded-lg mt-auto">
      <i class="pi pi-sign-out"></i> <span>Выйти</span>
    </button>
  </aside>

  <main class="flex-1 p-10">
    <div class="max-w-3xl">
      <h1 class="text-2xl font-bold text-white mb-8">Основная информация</h1>
      <div class="bg-[#18181B] border border-gray-800 rounded-2xl p-8 grid grid-cols-2 gap-8">
        </div>
    </div>
  </main>
</div>
</template>

<style scoped>
.head {
  height: 80vh;
}
</style>
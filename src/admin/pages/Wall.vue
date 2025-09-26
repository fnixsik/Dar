<template>
  <div class="flex min-h-screen">
    <aside class="w-64 bg-[#0f1a2b] text-white">
      <SidebarMenu />
    </aside>

    <main class="flex-1">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import SidebarMenu from './SidebarMenu.vue'
</script>

<template>
  <aside class="w-64 min-h-svh bg-[#0f1a2b] text-white p-4">
    <h1 class="text-xl font-semibold mb-4">Меню</h1>

    <nav class="space-y-1">
      <!-- Команда (collapsible) -->
      <div>
        <button
          @click="open.team = !open.team"
          class="w-full flex items-center justify-between px-3 py-2 relative font-semibold uppercase tracking-wide
                 hover:text-white focus:outline-none"
        >
          <span
            :data-active="open.team"
            class="relative after:absolute after:left-0 after:-bottom-0.5 after:h-[3px] after:w-full after:bg-red-600
                   after:scale-x-0 after:origin-left after:transition-transform after:duration-200
                   hover:after:scale-x-100 data-[active=true]:after:scale-x-100"
          >
            Команда
          </span>

          <svg
            class="h-4 w-4 transition-transform duration-200"
            :class="{ 'rotate-180': open.team }"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.168l3.71-2.938a.75.75 0 111.06 1.06l-4.24 3.36a.75.75 0 01-.94 0l-4.24-3.36a.75.75 0 01-.02-1.06z" clip-rule="evenodd" />
          </svg>
        </button>

        <transition name="fade" mode="out-in">
          <ul v-if="open.team" class="mt-1 ml-3 border-l border-white/20 pl-3 space-y-1">
            <li>
              <router-link
                to="/admin/fighters"
                class="block px-3 py-2 relative font-medium uppercase tracking-wide hover:text-white
                       after:absolute after:left-3 after:bottom-0 after:h-[3px] after:w-[calc(100%-1.5rem)] after:bg-red-600
                       after:scale-x-0 after:origin-left after:transition-transform after:duration-200
                       hover:after:scale-x-100"
                active-class="text-blue-400 after:scale-x-100"
              >
                дочерние бойцы
              </router-link>
            </li>
            <li>
              <router-link
                to="/admin/coache"
                class="block px-3 py-2 relative font-medium uppercase tracking-wide hover:text-white
                       after:absolute after:left-3 after:bottom-0 after:h-[3px] after:w-[calc(100%-1.5rem)] after:bg-red-600
                       after:scale-x-0 after:origin-left after:transition-transform after:duration-200
                       hover:after:scale-x-100"
                active-class="text-blue-400 after:scale-x-100"
              >
                тренеры
              </router-link>
            </li>
            <li>
              <router-link
                to="/admin/amateur"
                class="block px-3 py-2 relative font-medium uppercase tracking-wide hover:text-white
                       after:absolute after:left-3 after:bottom-0 after:h-[3px] after:w-[calc(100%-1.5rem)] after:bg-red-600
                       after:scale-x-0 after:origin-left after:transition-transform after:duration-200
                       hover:after:scale-x-100"
                active-class="text-blue-400 after:scale-x-100"
              >
                любительская группа
              </router-link>
            </li>
          </ul>
        </transition>
      </div>

      <!-- Новости -->
      <router-link
        to="/admin/news"
        class="block px-3 py-2 relative font-semibold uppercase tracking-wide hover:text-white
               after:absolute after:left-3 after:bottom-0 after:h-[3px] after:w-[calc(100%-1.5rem)] after:bg-red-600
               after:scale-x-0 after:origin-left after:transition-transform after:duration-200
               hover:after:scale-x-100"
        active-class="text-blue-400 after:scale-x-100"
      >
        новости
      </router-link>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
const open = reactive({ team: true })
</script>

<style>
.fade-enter-active, .fade-leave-active { transition: opacity .18s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>

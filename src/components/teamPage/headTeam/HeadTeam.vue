<script setup lang="ts">

</script>

<template>
  <div class="flex flex-col bg-red-300 w-full" style="height: 200px;">
    <div class="bg-lime-200 w-full justify-items-center pt-15" style="height: 100px;">
        <p class="text-4xl">
          НАША КОМАНДА
        </p>
    </div>
    <div class="bg-lime-300" style="height: 100px;">
      <div class="mx-[10%]">
        <nav class="">
          <ul class="flex space-x-10">
            <li>
              <router-link 
                to="/teams/fighters" 
                class="
                text-white hover:text-gray-300 transition-colors 
                  font-medium pb-2 cursor-pointer"
                active-class="text-blue-600 border-b-2 border-red-600"
              >
                БОЙЦЫ
              </router-link>
            </li>
            <li>
              <router-link 
                to="/teams/coaches" 
                class="
                text-white hover:text-gray-300 transition-colors 
                  font-medium pb-2 cursor-pointer"
                active-class="text-blue-600 border-b-2 border-red-600"
              >
                ТРЕНЕРЫ
              </router-link>
            </li>
            <li>
              <router-link 
                to="/teams/fan" 
                class="
                text-white hover:text-gray-300 transition-colors 
                  font-medium pb-2 cursor-pointer"
                active-class="text-blue-600 border-b-2 border-red-600"
              >
                ЛЮБИТЕЛЬСКАЯ ГРУППА
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

</script>

<template>
  <div class="flex flex-col w-full">
    <div class="w-full flex justify-center items-center py-8">
      <p class="text-3xl md:text-4xl font-bold text-center">
        НАША КОМАНДА
      </p>
    </div>
    <div>
      <div class="mx-[20%]">
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
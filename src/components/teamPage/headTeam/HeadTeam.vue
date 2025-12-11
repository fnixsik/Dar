<script setup lang="ts">

</script>

<template>
  <div class="flex flex-col w-full">
    <div class="text-white flex justify-center items-center py-12 px-4 sm:px-6 lg:px-12">
      <h2 class="text-3xl font-extrabold mb-10 text-center tracking-wider">
        НАША КОМАНДА
      </h2>
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
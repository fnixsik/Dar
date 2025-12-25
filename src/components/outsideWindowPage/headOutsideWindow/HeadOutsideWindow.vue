<script setup lang="ts">
</script>

<template>
  <section class="relative w-full py-24 px-6 flex justify-center items-center overflow-hidden min-h-[500px] bg-black">
    
    <div class="absolute inset-0 z-0">
      <img 
        src="/src/assets/img/dar_team_10_years.png" 
        alt="Главная картинка" 
        class="w-full h-full object-cover filter grayscale-[50%] brightness-[0.4]"
      />
    </div>

    <div class="absolute inset-0 bg-black/60 z-10 bg-radial-gradient"></div>

    <div class="relative z-20 max-w-3xl text-center space-y-6">
      <h2 class="text-3xl md:text-5xl font-bold text-white uppercase tracking-widest drop-shadow-2xl">
        ДАР ТИМ ВНЕ ОКТАГОНА
      </h2>
      
      <div class="space-y-4">
        <p class="text-gray-200 text-lg md:text-xl leading-relaxed font-medium">
          In 2020, the DAR TEAM PRO fighting team was founded to prepare Kazakhstani fighters 
          for the global arena. The team consists of 20 professionals, including 
          Shavkat Rakhmonov, Asu Almabaev, and others.
        </p>
        <p class="text-gray-200 text-lg md:text-xl leading-relaxed font-medium">
          Since 2014, DAR Team has been opening sports sections for children from 
          vulnerable social groups across Kazakhstan. In addition to sports skills, 
          children are taught by professionals in logic, critical thinking, foreign 
          languages, and speed reading.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Добавим эффект виньетки (затемнения по краям) для сходства с первым фото */
.bg-radial-gradient {
  background: radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%);
}
</style>

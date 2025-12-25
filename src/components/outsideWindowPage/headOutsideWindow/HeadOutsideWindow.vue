<script setup lang="ts">

</script>

<template>
    <section class="bg-black text-white w-full py-16 px-6 flex justify-center items-center relative">
        <div class="absolute inset-0 bg-cover bg-center">
            <img 
            src="/src/assets/img/dar_team_10_years.png" 
            alt="Главная картинка" 
            class="w-full h-full object-cover"
            />
        </div>
        <!-- <div class="max-w-3xl text-center space-y-6 relative z-10">
            <h2 class="text-3xl font-bold drop-shadow-md">ДАР ТИМ ВНЕ ОКТАГОНА</h2>
            <p class="text-gray-300 leading-relaxed drop-shadow-md">
                In 2020, the DAR TEAM PRO fighting team was founded to prepare Kazakhstani fighters 
                for the global arena. The team consists of 20 professionals, including 
                Shavkat Rakhmonov, Asu Almabaev, and others.
            </p>
            <p class="text-gray-300 leading-relaxed drop-shadow-md">
                Since 2014, DAR Team has been opening sports sections for children from 
                vulnerable social groups across Kazakhstan. In addition to sports skills, 
                children are taught by professionals in logic, critical thinking, foreign 
                languages, and speed reading.
            </p>
        </div> -->
        <div class="max-w-3xl text-center space-y-6 relative z-10 bg-black/30 p-6 rounded-2xl backdrop-blur-md">
            <h2 class="text-3xl font-bold text-white uppercase tracking-wider">ДАР ТИМ ВНЕ ОКТАГОНА</h2>
            <p class="text-white text-lg leading-relaxed font-semibold">
                In 2020, the DAR TEAM PRO fighting team was founded to prepare Kazakhstani fighters 
                for the global arena. The team consists of 20 professionals, including 
                Shavkat Rakhmonov, Asu Almabaev, and others.
            </p>
            <p class="text-white text-lg leading-relaxed font-semibold">
                Since 2014, DAR Team has been opening sports sections for children from 
                vulnerable social groups across Kazakhstan. In addition to sports skills, 
                children are taught by professionals in logic, critical thinking, foreign 
                languages, and speed reading.
            </p>
        </div>
    </section>
</template>

<style scoped>
section {
    position: relative;
}

.absolute {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}

.bg-cover {
    background-size: cover;
}

.bg-center {
    background-position: center;
}
</style>

<script setup lang="ts">

</script>

<template>
    <section class="bg-black text-white w-full py-16 px-6 flex justify-center items-center relative">
        <div class="absolute inset-0 bg-cover bg-center" 
             style="background-image: url('/src/assets/img/OutWindow.jpg');">
        </div>
        <div class="max-w-3xl text-center space-y-6 relative z-10">
            <h2 class="text-3xl font-bold">ДАР ТИМ ВНЕ ОКТАГОНА</h2>
            <p class="text-gray-300 leading-relaxed">
                In 2020, the DAR TEAM PRO fighting team was founded to prepare Kazakhstani fighters 
                for the global arena. The team consists of 20 professionals, including 
                Shavkat Rakhmonov, Asu Almabaev, and others.
            </p>
            <p class="text-gray-300 leading-relaxed">
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

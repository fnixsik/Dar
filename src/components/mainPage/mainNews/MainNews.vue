<script setup lang="ts">
import MainBlockNews from '../../newsPage/mainNews/MainBlockNews.vue';


</script>

<template>
    <div class="flex flex-col h-full">
        <div class="flex flex-col h-full">
            <div class="h-24 flex items-center justify-center">
                <h1 class="text-4xl">новости</h1>
            </div>
            <div class="flex-grow">
                <MainBlockNews/>
            </div>
            <div class="flex justify-center mt-4">
                <router-link to="/news" class="btn">
                    ПОСМОТРЕТЬ ВСЕ
                </router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
.btn {
    padding: 12px 24px; /* Внутренние отступы */
    background-color: #B00D15; /* Цвет фона */
    color: white; /* Цвет текста */
    border-radius: 5px; /* Скругление углов */
    text-decoration: none; /* Убираем подчеркивание */
    transition: background-color 0.3s; /* Плавный переход цвета */
    margin: 12px 0; /* Верхний и нижний отступы */
}
.btn:hover {
    background-color: #9B0B12; /* Цвет фона при наведении (темнее) */
}
</style>
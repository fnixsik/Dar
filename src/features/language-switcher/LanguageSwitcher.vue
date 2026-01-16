<script setup lang="ts">
import { computed,ref, onMounted, onBeforeUnmount } from 'vue';
import { usePrimeVue } from 'primevue/config';
import { useI18n } from 'vue-i18n';
import Select from 'primevue/select';

const scrolled = ref(false)
const languages = [
  { label: 'RU', code: 'ru', flag: 'ru', },
  { label: 'EN', code: 'en', flag: 'gb', },
  { label: 'KZ', code: 'kk', flag: 'kz', }
];

// обработчик скролла
const handleScroll = () => {
  scrolled.value = window.scrollY > 10
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

</script>

<template>
  <Select
    :options="languages"
    optionLabel="label"
    :pt="{
        // Стили для самого поля (кнопки)
        root: { 
          class: [
            // Используем !, чтобы перебить стандартный var() фонового цвета
            scrolled ? '!bg-[#111724]/95' : '!bg-[#111724]/80',
            'border border-white/20 rounded-md transition-all duration-300'
          ]
        },
        // Текст внутри селекта
        label: { class: '!text-white !text-[10px] !p-0 !flex !items-center !justify-center' },
        // Выпадающее меню
        overlay: {
          style: {
            backgroundColor: '#111724',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }
        },
        list: { class: 'p-0' },
        option: { class: 'text-white text-xs hover:bg-white/5' }
      }"
  >
    <template #value="slotProps">
      <div v-if="slotProps.value" class="flex items-center gap-2">
        <span :class="`fi fi-${slotProps.value.flag}`" />
        <span>{{ slotProps.value.label }}</span>
      </div>
    </template>
    <template #option="slotProps">
      <div class="flex items-center gap-2">
        <span :class="`fi fi-${slotProps.option.flag}`" />
        <span>{{ slotProps.option.label }}</span>
      </div>
    </template>
  </Select>
</template>

<style scoped>
@import "https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.2.3/css/flag-icons.min.css";

/* 1. Главный контейнер */
.p-select {
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  height: 25px !important;    /* Немного увеличим высоту для солидности */
  min-width: 45px !important; /* Увеличиваем ширину здесь */
  width: auto !important;
  border-radius: 4px;
}

/* 3. Размер иконки стрелочки */
:deep(.p-select-dropdown) {
  display: none !important;    /* Делаем зону стрелочки уже */
}

.p-select:not(.p-disabled).p-focus {
  background-color: azure;
}
</style>
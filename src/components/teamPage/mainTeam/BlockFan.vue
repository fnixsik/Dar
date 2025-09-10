<script setup lang="ts">
import { ref } from 'vue';


const schedule = ref([
  { day: 'Понедельник', time: '10:00 - 11:00', appointment: 'Тренировка', trainer: 'Иванов И.И.' },
  { day: 'Вторник', time: '11:00 - 12:00', appointment: 'Семинар', trainer: 'Петров П.П.' },
  { day: 'Среда', time: '12:00 - 13:00', appointment: 'Тренировка', trainer: 'Сидоров С.С.' },
  { day: 'Четверг', time: '14:00 - 15:00', appointment: 'Консультация', trainer: 'Кузнецов К.К.' },
  { day: 'Пятница', time: '15:00 - 16:00', appointment: 'Тренировка', trainer: 'Смирнов С.С.' },
]);

</script>

<template>
  <div>
    <div class="w-full flex py-8">
      <p class="text-xl md:text-xl font-bold">
        РАСПИСАНИЕ ТРЕНИРОВОК ЛЮБИТЕЛЬСКОЙ ГРУППЫ
      </p>
    </div>
    <div class="overflow-x-auto">
      <DataTable :value="schedule" class="min-w-full h-[551px]">
        <Column field="day" header="Дни" />
        <Column field="time" header="Время" />
        <Column field="appointment" header="Назначение" />
        <Column field="trainer" header="Тренер" />
      </DataTable>
    </div>
  </div>
</template>
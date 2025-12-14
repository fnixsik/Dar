<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { showError } from '@/shared/lib/toastService'
import { getAllschedul } from '@/services/gtoup-services'
import type { Schedule } from '@/types/scheduleType'


const schedule = ref<Schedule[]>([]);

onMounted( async () => {
  await getTableFan()
})

const getTableFan = async () => {
  try{
    let res = await getAllschedul()
    schedule.value = res.data;
  }catch(err){
    showError(err)
  }
}

</script>

<template>
  <div>
    <div class="w-full flex py-8">
      <p class="text-xl md:text-2xl font-bold text-gray-100 tracking-wide">
        РАСПИСАНИЕ ТРЕНИРОВОК ЛЮБИТЕЛЬСКОЙ ГРУППЫ
      </p>
    </div>
    <div class="overflow-x-auto schedule-table">
      <DataTable :value="schedule" class="min-w-full h-[551px]">
        <Column field="day" header="Дни" />
        <Column field="time" header="Время" />
        <Column field="activity" header="Назначение" />
        <Column field="coach" header="Тренер" />
      </DataTable>
    </div>
  </div>
</template>

<style scoped>
:deep(.schedule-table .p-datatable-table-container) {
  background-color: #18181B;
}

:deep(.schedule-table .p-datatable-table) {
  background-color: #18181B;
}

/* header */
:deep(.schedule-table .p-datatable-thead > tr > th) {
  background-color: #18181B;
  color: #E5E7EB;
  border-color: #3F3F46;
}

/* rows */
:deep(.schedule-table .p-datatable-tbody > tr) {
  background-color: #18181B;
  color: #E5E7EB;
}

/* cells */
:deep(.schedule-table .p-datatable-tbody > tr > td) {
  background-color: #18181B;
  border-color: #3F3F46;
}

/* hover */
:deep(.schedule-table .p-datatable-tbody > tr:hover) {
  background-color: #27272A;
}
</style>

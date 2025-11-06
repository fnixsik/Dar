<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { showError } from '@/shared/lib/toastService'
import { getAllTableFan } from '@/services/fanTable-services'
import type { Schedule } from '@/types/scheduleType'


const schedule = ref<Schedule[]>([]);

onMounted( async () => {
  await getTableFan()
})

const getTableFan = async () => {
  try{
    let res = await getAllTableFan()
    schedule.value = res;
  }catch(err){
    showError(err)
  }
}

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
        <Column field="activity" header="Назначение" />
        <Column field="coach" header="Тренер" />
      </DataTable>
    </div>
  </div>
</template>
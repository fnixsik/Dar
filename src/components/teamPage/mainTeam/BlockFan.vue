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
      <p class="text-xl md:text-2xl font-bold text-gray-100 tracking-wide uppercase">
        {{ $t('lable.trainingScheduleAmateurGroup') }}
      </p>
    </div>
    <div class="overflow-x-auto schedule-table">
      <DataTable :value="schedule" class="min-w-full h-[551px]">
        <Column field="day" :header="$t('lable.day')" />
        <Column field="time" :header="$t('lable.time')" />
        <Column field="activity" :header="$t('lable.appointment')" />
        <Column field="coach" :header="$t('lable.coache')" />
      </DataTable>
    </div>
  </div>
</template>



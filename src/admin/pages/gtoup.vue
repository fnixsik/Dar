<template>
  <div class="p-6 max-w-7xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">Расписание тренеров</h1>

    <Button label="Добавить запись" icon="pi pi-plus" class="mb-4" @click="openNew" />

    <DataTable :value="schedules" dataKey="id" responsiveLayout="scroll">
      <Column field="day" header="День" sortable />
      <Column field="time" header="Время" sortable />
      <Column field="activity" header="Активность" />
      <Column field="coach" header="Тренер" />
      <Column header="Действия">
        <template #body="{ data }">
          <div class="flex gap-2">
            <Button icon="pi pi-pencil" class="p-button-rounded p-button-text" @click="editSchedule(data)" />
            <Button icon="pi pi-trash" class="p-button-rounded p-button-danger p-button-text" @click="deleteSchedule(data.id)" />
          </div>
        </template>
      </Column>
    </DataTable>

    <!-- Диалог -->
    <Dialog header="Редактировать запись" v-model:visible="dialog" modal style="width: 500px">
      <form @submit.prevent="saveSchedule">
        <div class="flex flex-col gap-4">
          <div>
            <label class="block mb-1 font-semibold">День</label>
            <InputText v-model="schedule.day" required class="w-full" />
          </div>
          <div>
            <label class="block mb-1 font-semibold">Время</label>
            <InputText v-model="schedule.time" required class="w-full" />
          </div>
          <div>
            <label class="block mb-1 font-semibold">Активность</label>
            <InputText v-model="schedule.activity" class="w-full" />
          </div>
          <div>
            <label class="block mb-1 font-semibold">Тренер</label>
            <InputText v-model="schedule.coach" class="w-full" />
          </div>
        </div>

        <div class="flex justify-between mt-6">
          <Button label="Отмена" class="p-button-text" @click="dialog = false" />
          <Button label="Сохранить" icon="pi pi-check" type="submit" />
        </div>
      </form>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { getAllschedul, sendschedul } from '@/services/gtoup-services'
import { showError, showSuccess } from '@/shared/lib/toastService'
import { useConfirmDialog } from '@/shared/lib/useConfirm'

const schedules = ref([])
const dialog = ref(false)
const schedule = ref({
  id: null,
  day: '',
  time: '',
  activity: '',
  coach: ''
})

const fetchSchedules = async () => {
  try {
    const res = await getAllschedul()
    schedules.value = res
  } catch (err) {
    showError(err)
  }
}

const openNew = () => {
  schedule.value = {
    id: null,
    day: '',
    time: '',
    activity: '',
    coach: ''
  }
  dialog.value = true
}

const saveSchedule = async () => {
  try {
    await sendschedul(schedule.value)
    await fetchSchedules()
    dialog.value = false
  } catch (err) {
    showError(err)
  }
}

const editSchedule = (data) => {
  schedule.value = { ...data }
  dialog.value = true
}

const deleteSchedule = async (id) => {
  if (!confirm('Удалить запись?')) return
  try {
    await axios.delete(`/api/schedules/${id}`)
    await fetchSchedules()
  } catch (err) {
    console.error('Ошибка удаления:', err)
  }
}

onMounted(() => {
  fetchSchedules()
})
</script>

<style scoped>
:deep(.p-button) {
  padding: 12px 24px;
  background-color: #B00D15;
  border:#B00D15;
  color: white;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s;
  margin: 12px 0;
}
:deep(.p-button:hover) {
  background-color: #9B0B12;
  border:#B00D15;
}
.p-button-text:not(:disabled):hover {
    background: #ffe5e5;
    border-color: transparent;
    color: #B00D15;
}
</style>

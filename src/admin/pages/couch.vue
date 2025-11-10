<template>
  <div class="p-6 max-w-7xl mx-auto">
    <h1 class="text-3xl mb-6 font-bold">Управление тренерами</h1>

    <Button label="Добавить тренера" icon="pi pi-plus" class="mb-4" @click="openNew" />

    <DataTable :value="coaches" dataKey="id" responsiveLayout="scroll">
      <Column field="name" header="Имя" sortable />
      <Column field="status" header="Статус" sortable />
      <Column header="Действия" style="width: 150px">
        <template #body="{ data }">
          <div class="flex space-x-2">
            <Button icon="pi pi-pencil" class="p-button-rounded p-button-text" @click="editCoach(data)" />
            <Button icon="pi pi-trash" class="p-button-rounded p-button-text p-button-danger" @click="deleteCoach(data.id)" />
          </div>
        </template>
      </Column>
    </DataTable>

    <Dialog header="Тренер" v-model:visible="dialog" modal style="width: 700px;">
      <form @submit.prevent="saveCoach">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block mb-1 font-semibold">Имя</label>
            <InputText v-model="coach.name" required class="w-full" />
          </div>
          <div>
            <label class="block mb-1 font-semibold">Статус</label>
            <InputText v-model="coach.status" class="w-full" />
          </div>
          <div class="col-span-2">
            <label class="block mb-1 font-semibold">Фото (URL)</label>
            <InputText v-model="coach.img" class="w-full" />
          </div>

          <div class="col-span-2">
            <label class="block mb-1 font-semibold">Заслуги</label>
            <div v-for="(m, index) in coach.merit" :key="index" class="flex items-center mb-2 space-x-2">
              <InputText v-model="m.description" placeholder="Описание" class="flex-grow" />
              <Button icon="pi pi-times" class="p-button-danger p-button-rounded" @click.prevent="removeMerit(index)" />
            </div>
            <Button label="Добавить заслугу" icon="pi pi-plus" class="mt-2" @click.prevent="addMerit" />
          </div>
        </div>

        <div class="mt-6 flex justify-between space-x-2">
          <Button label="Отмена" icon="pi pi-times" class="p-button-text" @click="dialog = false" />
          <Button label="Сохранить" icon="pi pi-check" type="submit"/>
        </div>
      </form>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { showError, showSuccess } from '@/shared/lib/toastService'
import { useConfirmDialog } from '@/shared/lib/useConfirm'
import { getAllCouches, sendCouches } from '@/services/couch-services'

const coaches = ref([])
const dialog = ref(false)
const coach = ref({
  name: '',
  status: '',
  img: '',
  merit: []
})

const fetchCoaches = async () => {
  try {
    const res = await getAllCouches()
    console.log(res)
    coaches.value = res.data
  } catch (err) {
    showError(err)
  }
}

const openNew = () => {
  coach.value = {
    name: '',
    status: '',
    img: '',
    merit: []
  }
  dialog.value = true
}

const editCoach = (data) => {
  coach.value = JSON.parse(JSON.stringify(data))
  dialog.value = true
}

const saveCoach = async () => {
  try {
    let res = await sendCouches(coach.value)
    await fetchCoaches()
    dialog.value = false
  } catch (err) {
    showSuccess(err)
  }
}

const deleteCoach = async (id) => {
  if (!confirm('Удалить тренера?')) return
  try {
    await axios.delete(`/api/coaches/${id}`)
    await fetchCoaches()
  } catch (e) {
    console.error('Ошибка удаления тренера', e)
  }
}

const addMerit = () => {
  coach.value.merit.push({ description: '' })
}

const removeMerit = (index) => {
  coach.value.merit.splice(index, 1)
}

onMounted( () => {
  fetchCoaches()
}
  )
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
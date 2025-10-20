<template>
  <div class="p-6 max-w-7xl mx-auto">
    <h1 class="text-3xl mb-6 font-bold">Управление бойцами</h1>

    <Button label="Добавить бойца" icon="pi pi-plus" class="mb-4" @click="openNew" />

    <DataTable :value="fighters" dataKey="id" :rows="10">
      <Column field="name" header="Имя" sortable />
      <Column field="nickname" header="Никнейм" sortable />
      <Column field="country" header="Страна" sortable />
      <Column field="weightClass" header="Весовая категория" />
      <Column header="Действия" style="width: 150px">
        <template #body="{ data }">
          <div class="flex space-x-2">
            <Button
              icon="pi pi-pencil"
              class="p-button-rounded p-button-text"
              @click="editFighter(data)"
              aria-label="Редактировать"
            />
            <Button
              icon="pi pi-trash"
              class="p-button-rounded p-button-text p-button-danger"
              @click="deleteFighter(data.id)"
              aria-label="Удалить"
            />
          </div>
        </template>
      </Column>
    </DataTable>

    <Dialog header="Боец" :visible="dialog" modal @hide="hideDialog" style="width: 700px;">
      <form @submit.prevent="saveFighter">
        <div class="grid grid-cols-2 gap-4">

          <div>
            <label class="block mb-1 font-semibold">Имя</label>
            <InputText v-model="fighter.name" required class="w-full" />
          </div>
          <div>
            <label class="block mb-1 font-semibold">Никнейм</label>
            <InputText v-model="fighter.nickname" class="w-full" />
          </div>
          <div>
            <label class="block mb-1 font-semibold">Место рождения</label>
            <InputText v-model="fighter.birthplace" class="w-full" />
          </div>
          <div>
            <label class="block mb-1 font-semibold">Весовая категория</label>
            <InputText v-model="fighter.weightClass" class="w-full" />
          </div>
          <div>
            <label class="block mb-1 font-semibold">Страна</label>
            <InputText v-model="fighter.country" class="w-full" />
          </div>
          <div>
            <label class="block mb-1 font-semibold">Спорт</label>
            <InputText v-model="fighter.sport" class="w-full" />
          </div>
          <div>
            <label class="block mb-1 font-semibold">Ранк</label>
            <InputText v-model="fighter.rank" class="w-full" />
          </div>
          <div>
            <label class="block mb-1 font-semibold">Инстаграм</label>
            <InputText v-model="fighter.instagram" class="w-full" />
          </div>
          <div class="col-span-2">
            <label class="block mb-1 font-semibold">Фото (URL)</label>
            <InputText v-model="fighter.img" class="w-full" />
          </div>
          <div class="col-span-2">
            <label class="block mb-1 font-semibold">Рекорд</label>
            <Textarea v-model="fighter.record" rows="2" class="w-full" />
          </div>
          <div class="col-span-2">
            <label class="block mb-1 font-semibold">Достижения</label>
            <div v-for="(ach, index) in fighter.achievements" :key="index" class="flex items-center mb-2 space-x-2">
              <InputText v-model="ach.description" placeholder="Описание" class="flex-grow" />
              <Button icon="pi pi-times" class="p-button-danger p-button-rounded" @click.prevent="removeAchievement(index)" />
            </div>
            <Button label="Добавить достижение" icon="pi pi-plus" class="mt-2" @click.prevent="addAchievement" />
          </div>
        </div>

<div class="mt-6 flex justify-between">
  <Button label="Отмена" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
  <Button label="Сохранить" icon="pi pi-check" type="submit" />
</div>

      </form>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const fighters = ref([])
const dialog = ref(false)
const fighter = ref({
  name: '',
  nickname: '',
  birthplace: '',
  weightClass: '',
  record: '',
  tko: '',
  solution: '',
  submissive: '',
  other: '',
  country: '',
  sport: '',
  rank: '',
  instagram: '',
  img: '',
  achievements: []
})

const fetchFighters = async () => {
  try {
    const res = await axios.get('/api/fighters')
    fighters.value = res.data
  } catch (e) {
    console.error('Ошибка загрузки бойцов', e)
  }
}

const openNew = () => {
  fighter.value = {
    name: '',
    nickname: '',
    birthplace: '',
    weightClass: '',
    record: '',
    tko: '',
    solution: '',
    submissive: '',
    other: '',
    country: '',
    sport: '',
    rank: '',
    instagram: '',
    img: '',
    achievements: []
  }
  dialog.value = true
}

const hideDialog = () => {
  dialog.value = false
}

const saveFighter = async () => {
  try {
    if (fighter.value.id) {
      // обновление
      await axios.put(`/api/fighters/${fighter.value.id}`, fighter.value)
    } else {
      // создание
      await axios.post('/api/fighters', fighter.value)
    }
    await fetchFighters()
    dialog.value = false
  } catch (e) {
    console.error('Ошибка сохранения бойца', e)
  }
}

const editFighter = (data) => {
  fighter.value = JSON.parse(JSON.stringify(data))
  dialog.value = true
}

const removeAchievement = (index) => {
  fighter.value.achievements.splice(index, 1)
}

const addAchievement = () => {
  fighter.value.achievements.push({ description: '' })
}

const deleteFighter = async (id) => {
  if (!confirm('Удалить бойца?')) return
  try {
    await axios.delete(`/api/fighters/${id}`)
    await fetchFighters()
  } catch (e) {
    console.error('Ошибка удаления бойца', e)
  }
}

onMounted(() => {
  // fetchFighters()
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

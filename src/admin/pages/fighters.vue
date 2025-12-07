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
          <div class="flex gap-3 items-center justify-center">
            <Button
              icon="pi pi-pencil"
              class="p-button-rounded p-button-text p-button-sm"
              @click="editFighter(data)"
              aria-label="Редактировать"
            />
            <Button
              icon="pi pi-trash"
              class="p-button-rounded p-button-text p-button-danger p-button-sm"
              @click="deleteFighter(data)"
              aria-label="Удалить"
            />
          </div>
        </template>
      </Column>
    </DataTable>

    <Dialog header="Боец" v-model:visible="dialog" modal style="width: 700px; max-height: 95vh; overflow-y: hidden;">
      <form @submit.prevent="saveFighter">
        <!-- Основные поля -->
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-sm font-medium mb-1">Имя</label>
            <InputText v-model="fighter.name" required class="w-full" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Никнейм</label>
            <InputText v-model="fighter.nickname" class="w-full" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Место рождения</label>
            <InputText v-model="fighter.birthplace" class="w-full" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Весовая категория</label>
            <InputText v-model="fighter.weightClass" class="w-full" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Страна</label>
            <InputText v-model="fighter.country" class="w-full" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Спорт</label>
            <InputText v-model="fighter.sport" class="w-full" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Ранк</label>
            <InputText v-model="fighter.rank" class="w-full" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Инстаграм</label>
            <InputText v-model="fighter.instagram" class="w-full" />
          </div>
          <div class="col-span-2">
            <label class="block text-sm font-medium mb-1">Фото бойца</label>
            <FileUpload
              mode="basic"
              name="file"
              accept="image/*"
              chooseLabel="Загрузить фото"
              :auto="true"
              customUpload
              @uploader="uploadImage"
          />

            <div v-if="fighter.img" class="mt-2">
              <img :src="fighter.img" alt="preview" class="h-32 rounded border" />
            </div>
          </div>
          <div class="col-span-2">
            <label class="block text-sm font-medium mb-1">Рекорд</label>
            <Textarea v-model="fighter.record" rows="2" class="w-full" />
          </div>
        </div>

        <!-- Статистика Побед -->
        <Panel header="Статистика Побед" toggleable collapsed class="mt-2">
          <div class="grid grid-cols-2 gap-3 mt-1">
            <div>
              <label class="block text-sm font-medium mb-1">КО/ТКО</label>
              <InputText v-model="fighter.tko" class="w-full" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Решением</label>
              <InputText v-model="fighter.solution" class="w-full" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Сабмишен</label>
              <InputText v-model="fighter.submissive" class="w-full" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Остальное</label>
              <InputText v-model="fighter.other" class="w-full" />
            </div>
          </div>
        </Panel>

        <!-- Достижения -->
        <div class="mt-3">
          <label class="block text-sm font-medium mb-1">Достижения</label>
          <div v-for="(ach, index) in fighter.achievements" :key="index" class="flex items-center gap-2 mb-2">
            <InputText v-model="ach.title" placeholder="Описание" class="flex-grow" />
            <Button icon="pi pi-times" class="p-button-danger p-button-rounded" @click.prevent="removeAchievement(ach.id)" />
          </div>
          <Button label="Добавить достижение" icon="pi pi-plus" class="p-button-sm" @click.prevent="addAchievement" />
        </div>

        <!-- Кнопки -->
        <div class="mt-2 flex justify-between">
          <Button label="Отмена" icon="pi pi-times" class="p-button-text p-button-sm" @click="dialog = false" />
          <Button label="Сохранить" icon="pi pi-check" class="p-button-sm" type="submit"/>
        </div>
      </form>
    </Dialog>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAllFighters, senFighters, deleteFighterId, updateFighterId, deleteAchievementId, sendImgMinio} from '@/services/fighter-services'
import { showError, showSuccess } from '@/shared/lib/toastService'
import { useConfirmDialog } from '@/shared/lib/useConfirm'



const { show } = useConfirmDialog()
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
const isEditing = ref(false)
const currentFighterId = ref(null)

const fetchFighters = async () => {
  try {
    const res = await getAllFighters()
    fighters.value = res.data
  } catch (err) {
    showError(err)
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
  isEditing.value = false
  dialog.value = true
}

const saveFighter = async () => {
  try {
    if (isEditing.value) {
      await updateFighterId(currentFighterId.value, fighter.value)
      showSuccess('Боец успешно обновлен')
    } else {
      await senFighters(fighter.value)
      showSuccess('Боец успешно создан')
    }
    
    await fetchFighters()
    dialog.value = false
  }catch(err){
    showError(err)
  }
}

const editFighter = (data) => {
  isEditing.value = true
  currentFighterId.value = data.id
    fighter.value = {
    ...data,
    achievements: data.achievements ? [...data.achievements] : []
  }
  dialog.value = true
}

const removeAchievement = async (index) => {
  try{
    await deleteAchievementId(currentFighterId.value, index)
    showSuccess('Успешно удалено')
    await fetchFighters()
  }catch(err){
    showError(err)
  }
}

const addAchievement = () => {
  fighter.value.achievements.push({ description: '' })
}


const deleteFighter = async (data) => {
  let result = await show({
    message: 'Вы точно хотите удалить этого бойца ?',
  })
  if(!result) return
  try {
    await deleteFighterId(data.id)
    showSuccess('Успешно удалено')
    await fetchFighters()
  } catch (err) {
    showError(err)
  }
}

const uploadImage = async (event) => {
  const file = event.files?.[0];
  if (!file) return;

  try {
    const res = await sendImgMinio(file);
    fighter.value.img = res.data;
    showSuccess("Фото загружено!");
  } catch (err) {
    showError(err);
  }
};


onMounted(() => {
  fetchFighters()
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

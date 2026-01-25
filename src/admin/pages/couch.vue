<template>
  <div class="p-6 max-w-7xl mx-auto">
    <h1 class="text-3xl mb-6 font-bold text-white">Управление тренерами</h1>

    <Button label="Добавить тренера" icon="pi pi-plus" class="mb-4" @click="openNew" />

    <DataTable :value="coaches" dataKey="id" responsiveLayout="scroll" class="schedule-table">
      <Column field="name" header="Имя" sortable />
      <Column field="status" header="Статус" sortable />
      <Column header="Действия" style="width: 150px">
        <template #body="{ data }">
          <div class="flex gap-3 space-x-2">
            <Button icon="pi pi-pencil" class="p-button-rounded p-button-text" @click="editCoach(data)" />
            <Button icon="pi pi-trash" class="p-button-rounded p-button-text" @click="deleteCoach(data)" />
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
              <div class="flex items-center gap-4">
                <FileUpload
                  mode="basic"
                  name="file"
                  accept="image/*"
                  chooseLabel="Загрузить фото"
                  :auto="true"
                  customUpload
                  @uploader="uploadImage"
                />
                <Button
                  label="Удалить фото" 
                  icon="pi pi-minus" 
                  @click.prevent="deleteImg(coach.id)" 
                />
              </div>

            <div v-if="coach.img" class="mt-2">
              <img :src="coach.img" alt="preview" class="h-32 rounded border" />
            </div>
          </div>

          <div class="col-span-2">
            <label class="block mb-1 font-semibold">Заслуги</label>
            <div v-for="(m, index) in coach.merit" :key="index" class="flex items-center mb-2 space-x-2">
              <InputText v-model="m.list" placeholder="Описание" class="flex-grow" />
              <Button icon="pi pi-times" class="p-button-rounded" @click.prevent="removeMerit(m.id)" />
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
import { showError, showSuccess } from '@/shared/lib/toastService'
import { useConfirmDialog } from '@/shared/lib/useConfirm'
import { getAllCouches, sendCouches, deleteCoucheId, updateCoucheId, deleteMeritId, deleteCoucheImgId, sendImgMinio } from '@/services/couch-services'


const { show } = useConfirmDialog()
const coaches = ref([])
const dialog = ref(false)
const coach = ref({
  name: '',
  status: '',
  img: '',
  merit: []
})
const isEditing = ref(false)
const currentCouchesId = ref(null)

const fetchCoaches = async () => {
  try {
    const res = await getAllCouches()
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
  isEditing.value = false
  dialog.value = true
}

const editCoach = (data) => {
  isEditing.value = true
  currentCouchesId.value = data.id
  coach.value = {
    ...data,
    merit: data.merit ? [...data.merit] : []
  }
  dialog.value = true
}

const saveCoach = async () => {
  try {
    if(isEditing.value){
      await updateCoucheId(currentCouchesId.value, coach.value)
      showSuccess('Тренер успешно обновлен')
    }else{
      await sendCouches(coach.value)
      showSuccess('Тренер успешно создан')
    }
    await fetchCoaches()
    dialog.value = false
  } catch (err) {
    showError(err)
  }
}

const deleteCoach = async (data) => {
  let result = await show({
    message: 'Вы точно хотите удалить этого Тренера ?',
  })
  if(!result) return
  try {
    await deleteCoucheId(data.id)
    showSuccess('Успешно удалено')
    await fetchCoaches()
  } catch (err) {
    showError(err)
  }
}

const addMerit = () => {
  coach.value.merit.push({ list: '' })
}

const removeMerit = async (index) => {
  try{
    await deleteMeritId(currentCouchesId.value, index)
    await fetchCoaches()
  }catch(err){
    showError(err)
  }
}

const uploadImage = async (event) => {
  const file = event.files?.[0];
  let nameFolder = 'coache'
  if (!file) return;

  try {
    const res = await sendImgMinio(file, nameFolder);
    coach.value.img = res.data;
    showSuccess("Фото загружено!");
  } catch (err) {
    showError(err);
  }
};

const deleteImg = async (id) => {
  try {
    await deleteCoucheImgId(id)
    showSuccess('Успешно удалено фото')
    await fetchCoaches()
  } catch (err) {
    showError(err)
  }
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
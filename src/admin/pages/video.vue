<template>
  <div class="p-6 max-w-7xl mx-auto">
    <h1 class="text-3xl mb-6 font-bold text-white">Управление видео контентом</h1>

    <Button label="Добавить видео" icon="pi pi-plus" class="mb-4" @click="openNew" />

    <DataTable :value="video" dataKey="id" responsiveLayout="scroll" class="schedule-table">
      <Column field="title" header="Заглавие" sortable />
      <Column field="description" header="Описание" sortable />
      <Column field="youtubeVideoId" header="youtube" sortable />
      <Column header="Действия" style="width: 150px">
        <template #body="{ data }">
          <div class="flex gap-3 space-x-2">
            <Button icon="pi pi-pencil" class="p-button-rounded p-button-text" @click="editCoach(data)" />
            <Button icon="pi pi-trash" class="p-button-rounded p-button-text" @click="deleteCoach(data)" />
          </div>
        </template>
      </Column>
    </DataTable>

    <!-- Диалог -->
    <Dialog header="Редактировать запись" v-model:visible="dialog" modal style="width: 500px">
      <form @submit.prevent="saveVideo">
        <div class="flex flex-col gap-4">
          <div>
            <label class="block mb-1 font-semibold">Заглавие</label>
            <InputText v-model="videoForm.title" required class="w-full"/>
          </div>
          <div>
            <label class="block mb-1 font-semibold">Описание</label>
            <InputText v-model="videoForm.description" required class="w-full" />
          </div>
          <div>
            <label class="block mb-1 font-semibold">youtube</label>
            <InputText v-model="videoForm.youtubeVideoId" class="w-full" />
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
import { showError, showSuccess } from '@/shared/lib/toastService'
import { useConfirmDialog } from '@/shared/lib/useConfirm'
import { getAllVideos, postVideos, putIdVideos, deletIdVideos } from '@/services/video-services'


const { show } = useConfirmDialog()
const dialog = ref(false)
const video = ref([])
const videoForm = ref({
  title: '',
  description: '',
  youtubeVideoId: ''
})
const isEditing = ref(false)
const currentCouchesId = ref(null)

const fetchCoaches = async () => {
  try {
    const res = await getAllVideos()
    video.value = res.data
  } catch (err) {
    showError(err)
  }
}

const openNew = () => {
  videoForm.value = {
    title: '',
    description: '',
    youtubeVideoId: ''
  }
  isEditing.value = false
  dialog.value = true
}

const editCoach = (data) => {
  isEditing.value = true
  currentCouchesId.value = data.id
  videoForm.value = { ...data }
  dialog.value = true
}

const saveVideo = async () => {
  try {
    if(isEditing.value){
      await putIdVideos(currentCouchesId.value, videoForm.value)
      showSuccess('Видео успешно обновлен')
    }else{
      await postVideos(videoForm.value)
      showSuccess('Видео успешно создан')
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
    await deletIdVideos(data.id)
    showSuccess('Успешно удалено')
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
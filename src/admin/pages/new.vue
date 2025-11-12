<template>
  <div class="p-6 max-w-7xl mx-auto">
    <h1 class="text-3xl mb-6 font-bold">Управление новостями</h1>

    <Button label="Добавить новость" icon="pi pi-plus" class="mb-4" @click="openNew" />

    <DataTable :value="newsList" dataKey="id" :rows="10" responsiveLayout="scroll">
      <Column field="title" header="Заголовок" sortable />
      <Column field="date" header="Дата" sortable />
      <Column header="Изображение" style="width: 120px">
        <template #body="{ data }">
          <img :src="data.img" alt="news image" class="w-20 h-12 object-cover rounded" />
        </template>
      </Column>
      <Column header="Действия" style="width: 140px">
        <template #body="{ data }">
          <div class="flex space-x-2">
            <Button icon="pi pi-pencil" class="p-button-rounded p-button-text" @click="editNews(data)" aria-label="Редактировать" />
            <Button icon="pi pi-trash" class="p-button-rounded p-button-text p-button-danger" @click="deleteNews(data)" aria-label="Удалить" />
          </div>
        </template>
      </Column>
    </DataTable>

    <Dialog header="Новость" v-model:visible="dialog" modal style="width: 600px;">
      <form @submit.prevent="saveNews" class="space-y-4">
        <div>
          <label class="block mb-1 font-semibold">Заголовок</label>
          <InputText v-model="news.title" required class="w-full" />
        </div>
        <div>
          <label class="block mb-1 font-semibold">Содержание</label>
          <Textarea v-model="news.content" rows="4" class="w-full" />
        </div>
        <div>
          <label class="block mb-1 font-semibold">Изображение (URL)</label>
          <InputText v-model="news.img" class="w-full" />
        </div>
        <div>
          <label class="block mb-1 font-semibold">Дата</label>
          <Calendar v-model="news.date" dateFormat="yy-mm-dd" showIcon class="w-full" />
        </div>

        <div class="flex justify-between mt-6">
          <Button label="Отмена" icon="pi pi-times" class="p-button-text" @click="dialog = false" />
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
import { getAllNews, sendNews, deleteNewsId, updateNewsId } from '@/services/news-services'

const { show } = useConfirmDialog()
const newsList = ref([])
const dialog = ref(false)
const news = ref({
  id: null,
  title: '',
  content: '',
  img: '',
  date: null,
})
const isEditing = ref(false)
const currentFighterId = ref(null)

const fetchNews = async () => {
  try {
    newsList.value = await getAllNews()
  } catch (err) {
    showError(err)
  }
}

const openNew = () => {
  news.value = {
    id: null,
    title: '',
    content: '',
    img: '',
    date: null,
  }
  isEditing.value = false
  dialog.value = true
}

const saveNews = async () => {
  try {
    if (isEditing.value) {
      await updateNewsId(currentFighterId.value, news.value)
      showSuccess('Новость успешно обновлен')
    } else {
      await sendNews(news.value)
      showSuccess('Новость успешно создан')
    }
    
    await fetchNews()
    dialog.value = false
  }catch(err){
    showError(err)
  }
}

const editNews = (data) => {
  isEditing.value = true
  currentFighterId.value = data.id
  news.value = data
  dialog.value = true
}

const deleteNews = async (data) => {
  let result = await show({
    message: 'Вы точно хотите удалить этого Новость ?',
  })
  if(!result) return
  try {
    await deleteNewsId(data.id)
    showSuccess('Успешно удалено')
    await fetchNews()
  } catch (err) {
    showError(err)
  }
}

onMounted(() => {
  fetchNews()
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
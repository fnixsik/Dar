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
            <Button icon="pi pi-trash" class="p-button-rounded p-button-text p-button-danger" @click="deleteNews(data.id)" aria-label="Удалить" />
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
import axios from 'axios'
import { showError, showSuccess } from '@/shared/lib/toastService'
import { useConfirmDialog } from '@/shared/lib/useConfirm'
import { getAllNews, sendNews } from '@/services/news-services'

const newsList = ref([])
const dialog = ref(false)
const news = ref({
  id: null,
  title: '',
  content: '',
  img: '',
  date: null,
})

const fetchNews = async () => {
  try {
    let res = await getAllNews()
    newsList.value = res
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
  dialog.value = true
}

const saveNews = async () => {
  try {
    await sendNews(news.value)
    await fetchNews()
    dialog.value = false
  } catch (err) {
    showError(err)
  }
}

const editNews = (data) => {
  news.value = { ...data }
  if (news.value.date) news.value.date = new Date(news.value.date)
  dialog.value = true
}

const deleteNews = async (id) => {
  if (!confirm('Удалить новость?')) return
  try {
    await axios.delete(`/api/news/${id}`)
    await fetchNews()
  } catch (e) {
    console.error('Ошибка удаления новости', e)
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
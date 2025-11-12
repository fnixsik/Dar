<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { getAllNews, getSoloNewsId } from "@/services/news-services"
import { showError } from '@/shared/lib/toastService'
import type { News } from "../../../types/news"
import Dialog from "@/components/AllDialogs/dialogNews/DialogNews.vue";

const visibleDialog = ref(false)
const newscard = ref<News[]>([])
const selectData = ref<News | undefined>()

const props = defineProps({
  newLimit: {
    type: Number,
    default: 0,
  },
});


onMounted(async () => {
  await allNews();
})

const allNews = async () => {
  try{
    newscard.value = await getAllNews()
  }catch(err){
    showError(err)
  }
}

const openDialog = async (value: boolean, data?: any) =>{
  if(value){
    visibleDialog.value = true
  }else{
    visibleDialog.value = false
  }
  selectData.value = await getpersonalyDate(data.id)
}

const getpersonalyDate = async (id: any) => {
  let res = await getSoloNewsId(id)
  return res.data
}

const limitedNews = computed(() => {
  // если newLimit = 0 → показать всё
  if (props.newLimit > 0) {
    return newscard.value.slice(0, props.newLimit)
  }
  return newscard.value
})


</script>

<template>
  <Dialog :modelValue="visibleDialog" @update:modelValue="openDialog" :userData="selectData"/>
  <div class="container mx-auto main-h-screen px-4 py-8">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card 
        v-for="value in limitedNews"
        :key="value.id"
        class="w-full h-full max-w-sm mx-auto flex flex-col cursor-pointer"
        @click="openDialog(true , value)"
      >
        <template #header>
          <img 
            alt="user header" 
            src="../../../assets/img/Page1.jpg" 
            class="w-full h-48 object-cover"
          />
        </template>

        <template #title>
          <h3 class="text-lg font-semibold line-clamp-2">
            {{ value.title }}
          </h3>
        </template>

        <template #subtitle>
          <p class="text-sm text-gray-500">{{ value.date }}</p>
        </template>
      </Card>
    </div>
  </div>
</template>
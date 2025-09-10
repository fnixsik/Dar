<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getAllNews } from "../../../../services/news-services"
import { News } from "../../../types/news"

const newscard = ref<News[]>([
  {
      id: 1,
      title: "DAR TEAM завоевал новые победы",
      date: "2025-09-01",
      img: "/src/assets/img/Page1.jpg",
      content: "Файтеры команды DAR TEAM успешно выступили на международном турнире."
    },
    {
      id: 2,
      title: "Открытие нового зала в Алматы",
      date: "2025-08-20",
      img: "/src/assets/img/Page2.jpg",
      content: "DAR TEAM открыл новый спортивный зал для молодых спортсменов."
    },
    {
      id: 3,
      title: "Шавкат Рахмонов готовится к бою",
      date: "2025-08-15",
      img: "/src/assets/img/Page3.jpg",
      content: "Звезда команды проводит тренировочный лагерь перед важным поединком."
    },
])

const props = defineProps({
  newLimit: {
    type: Number,
    default: 6,
  },
});


onMounted(
  async () => {
    newscard.value = await getAllNews();
  }
)


</script>

<template>
  <div class="container mx-auto main-h-screen px-4 py-8">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card 
        v-for="value in newscard.slice(0, props.newLimit)" 
        :key="value.id"
        class="w-full h-full max-w-sm mx-auto flex flex-col"
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
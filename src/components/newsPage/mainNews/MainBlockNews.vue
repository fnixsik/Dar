<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getAllNews } from "../../../../services/news-services"
import { News } from "../../../types/news"

const newscard = ref<News[]>([])

onMounted(
  async () => {
    newscard.value = await getAllNews();
  }
)


</script>

<template>
  <div class=" bg-green-300 w-full w-auto">
    <div class="grid grid-cols-3 gap-7 container mx-auto px-50">
      <Card style="width: 22.5rem; overflow: hidden" v-for="value in newscard">
        <template #header>
          <img alt="user header" src="../../../assets/img/Page1.jpg" />
        </template>
        <template #title>{{ value.title }}</template>
        <template #subtitle>{{ value.date }}</template>
      </Card>
    </div>
  </div>
</template>
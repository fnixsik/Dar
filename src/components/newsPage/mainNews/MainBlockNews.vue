<script setup lang="ts">
import { onMounted } from "vue";
import { getAllNews } from "../../../../services/news-services"


onMounted(
  async () => {
    let data = await getAllNews();
    console.log(' 1 ', data)
  }
)

const cards = [
  {
    title: "Star only",
    data: "04.07.2020",

  },
  {
    title: "Star only",
    data: "07.08.2020",

  },
  {
    title: "Star only",
    data: "20.01.2020",

  },
  {
    title: "Star only",
    data: "24.02.2020",

  },
  {
    title: "Star only",
    data: "17.05.2020",

  },
  {
    title: "Star only",
    data: "11.07.2020",

  },
  {
    title: "Star only",
    data: "14.03.2020",

  },
]

</script>

<template>
  <div class=" bg-green-300 w-full w-auto">
    <div class="grid grid-cols-3 gap-7 container mx-auto px-50">
      <Card style="width: 22.5rem; overflow: hidden" v-for="value in cards">
        <template #header>
          <img alt="user header" src="../../../assets/img/Page1.jpg" />
        </template>
        <template #title>{{ value.title }}</template>
        <template #subtitle>{{ value.data }}</template>
      </Card>
    </div>
  </div>
</template>
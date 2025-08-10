<script setup lang="ts">
import { onMounted } from "vue";
import { getAllNews } from "../../../../services/news-services"


onMounted(
  async () => {
    let data = await getAllNews();
    console.log(' 1 ', data)
  }
)

</script>

<template>
  <div class=" bg-green-300 w-full" style="height: 2000px;">

  </div>
</template>
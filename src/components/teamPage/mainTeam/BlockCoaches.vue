<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { showError } from '@/shared/lib/toastService'
import { getAllCouches } from '@/services/couch-services'
import type { Coaches } from '@/types/coachesType'
import Dialog from '@/components/AllDialogs/dialogCoache/DialogCoache.vue'

const visibleDialog = ref(false)
const coacheCard = ref<Coaches[]>([])

onMounted( async () => {
  await getDataFight()
})

const getDataFight = async () => {
  try{
    let res = await getAllCouches()
    coacheCard.value = res.data;
  }catch(err){
    showError(err)
  }
}

const openDialog = (value: boolean) =>{
  if(value){
    visibleDialog.value = true
  }else{
    visibleDialog.value = false
  }
}

</script>

<template>
  <Dialog :modelValue="visibleDialog" @update:modelValue="openDialog"/>
  <div class="container mx-auto main-h-screen px-4 py-8">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card 
        v-for="value in coacheCard" 
        :key="value.id"
        class="w-full h-full max-w-sm mx-auto flex flex-col cursor-pointer"
        @click="openDialog(true)"
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
            {{ value.name }}
          </h3>
        </template>

        <template #subtitle>
          <p class="text-sm text-gray-500">{{ value.status }}</p>
        </template>
      </Card>
    </div>
  </div>
</template>
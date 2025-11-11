<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { showError } from '@/shared/lib/toastService'
import { getAllFighters } from '@/services/fighter-services'
import type { Fighters } from '@/types/fightType'
import Dialog from '@/components/AllDialogs/dialogFighter/DialogFighter.vue'

const visibleDialog = ref(false)
const fighterCard = ref<Fighters[]>([])

onMounted( async () => {
  await getDataFight()
})

const openDialog = (value: boolean) =>{
  if(value){
    visibleDialog.value = true
  }else{
    visibleDialog.value = false
  }
}

const getDataFight = async () => {
  try{
    let res = await getAllFighters()
    fighterCard.value = res.data;
  }catch(err){
    showError(err)
  }
}

</script>

<template>
  <Dialog :modelValue="visibleDialog" @update:modelValue="openDialog"/>
  <div class="container mx-auto main-h-screen px-4 py-8">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card 
        v-for="value in fighterCard" 
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
          <p class="text-sm text-gray-500">{{ value.country }}</p>
        </template>
      </Card>
    </div>
  </div>
</template>
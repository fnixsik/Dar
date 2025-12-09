<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { showError } from '@/shared/lib/toastService'
import { getAllCouches, getPersonCoucheId } from '@/services/couch-services'
import type { Coaches } from '@/types/coachesType'
import Dialog from '@/components/AllDialogs/dialogCoache/DialogCoache.vue'

const visibleDialog = ref(false)
const coacheCard = ref<Coaches[]>([])
const selectData = ref<Coaches | null>()

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

const openDialog = async (value: boolean , data?: any) =>{
  if(value){
    visibleDialog.value = true
  }else{
    visibleDialog.value = false
  }
  if (data && data.id) {
    selectData.value = await getpersonalyDate(data.id)
  }else{
    selectData.value = null
  }
}

const getpersonalyDate = async (id: any) => {
  let res = await getPersonCoucheId(id)
  return res.data
}

</script>

<template>
  <Dialog :modelValue="visibleDialog" @update:modelValue="openDialog" :userData="selectData"/>
  <div class="container mx-auto main-h-screen px-4 py-8">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card 
        v-for="value in coacheCard" 
        :key="value.id"
        class="w-full h-full max-w-sm mx-auto flex flex-col cursor-pointer"
        @click="openDialog(true, value)"
      >
        <template #header>
          <div class="relative w-full h-64 rounded-md overflow-hidden">

            <!-- Размытие фона (подложка) -->
            <img 
              :src="value.img"
              class="absolute inset-0 w-full h-full object-cover blur-xl opacity-30"
            />

            <img 
              :src="value.img"
              class="absolute inset-0 m-auto max-h-full max-w-full object-contain"
            />

          </div>
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
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { showError, showSuccess } from '@/shared/lib/toastService'
import { getAllVideos, addSubscribeIdVideos } from '@/services/video-services'


const videoCard = ref()

onMounted( async () => {
  await getDataFight()
})


const getDataFight = async () => {
  try{
    let res = await getAllVideos()
    videoCard.value = res.data;
  }catch(err){
    showError(err)
  }
}

const handleBuy = async (id: any) => {
  console.log('  id  ', id)
  try{
    await addSubscribeIdVideos(id.id, id.youtubeVideoId)
    showSuccess('Успешно добавлен')
  }catch(err){
    showError(err)
  }
}

</script>

<template>
  <div class="container mx-auto min-h-screen px-4 py-8">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <Card 
        v-for="value in videoCard" 
        :key="value.id"
        class="w-full max-w-sm mx-auto flex flex-col cursor-pointer group bg-slate-950 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-900/50"

      >
        <template #header>
          <div class="relative w-full h-52 sm:h-60 overflow-hidden rounded-t-2xl bg-slate-950">
            
            <img 
              :src="`https://img.youtube.com/vi/${value.youtubeVideoId}/maxresdefault.jpg`" 
              alt="Video thumbnail"
              class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              loading="lazy" 
            />
            
            <div 
              class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent pointer-events-none opacity-90 transition-opacity duration-700 ease-out group-hover:opacity-100"
            ></div>
            
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div @click="handleBuy(value)" class="bg-white/10 backdrop-blur-sm text-white p-3 rounded-full border border-white/20 shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-7 h-7">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </div>
            </div>
          </div>
        </template>

        <template #title>
          <div class="px-5 pt-3">
            <h3 class="text-base font-medium text-slate-200 group-hover:text-white transition-colors duration-200 line-clamp-1">
              {{ value.title }}
            </h3>
          </div>
        </template>

        <template #subtitle>
          <div class="px-5 pb-5 pt-1">
            <p class="text-xs text-slate-400 line-clamp-2">
              {{ value.description }}
            </p>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>
<!-- <script setup lang="ts">
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
  try{
    await addSubscribeIdVideos(id.id, id.youtubeVideoId)
    showSuccess('Успешно добавлен')
  }catch(err:any){
    showError(err.response?.data)
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


                                                                                                Закоментил этот стиль для подписки 


-->




<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { showError } from '@/shared/lib/toastService';
import { getPublicAllVideos } from '@/services/video-services';

const loading = ref(false);
const dataMyVideo = ref<any[]>([]);

const isPlayerOpen = ref(false);
const currentVideoId = ref('');

// Функция для запуска видео
const openVideo = (videoLink: string) => {
  if (!videoLink) {
    showError('ID видео отсутствует');
    return;
  }
  currentVideoId.value = videoLink; 
  isPlayerOpen.value = true;
};

// Функция закрытия плеера
const closePlayer = () => {
  isPlayerOpen.value = false;
  currentVideoId.value = '';
};

// Вычисляемая ссылка для безопасного встраивания в iframe
const activeVideoUrl = computed(() => {
  if (!currentVideoId.value) return '';
  return `https://www.youtube-nocookie.com/embed/${currentVideoId.value}?autoplay=1&modestbranding=1&rel=0`;
});

const getMyVideo = async () => {
  try {
    loading.value = true;
    const res = await getPublicAllVideos();
    dataMyVideo.value = res?.data || res || [];
  } catch (err: any) {
    showError(err?.response?.data || 'Не удалось загрузить видеоматериалы');
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await getMyVideo();
});
</script>

<template>
  <div class="videos-page relative px-6 py-8">

    <div v-if="loading" class="flex justify-center items-center py-20">
      <i class="pi pi-spin pi-spinner text-3xl text-red-500"></i>
    </div>

    <div v-else-if="dataMyVideo.length === 0" class="empty-state bg-[#18181B] border border-gray-800 rounded-2xl p-12 text-center">
      <i class="pi pi-video text-5xl text-gray-600 mb-4 block"></i>
      <h3 class="text-white font-semibold text-lg mb-1">Доступных видео пока нет</h3>
      <p class="text-gray-500 text-sm mb-6">Оформите подписку на интересующие вас материалы на главной странице.</p>
      <a href="/teams/video" class="inline-block bg-red-600 hover:bg-red-700 text-white font-medium text-sm py-2.5 px-5 rounded-lg transition">
        Перейти к каталогу
      </a>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <div 
        v-for="sub in dataMyVideo" 
        :key="sub.id" 
        class="video-card bg-[#18181B] border border-gray-800 rounded-2xl overflow-hidden flex flex-col hover:border-gray-700 transition-all duration-300 group shadow-lg"
      >
        <div class="relative aspect-video bg-gray-900 flex items-center justify-center overflow-hidden cursor-pointer" @click="openVideo(sub.youtubeVideoId)">
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
          
          <img 
            v-if="sub.youtubeVideoId"
            :src="`https://i.ytimg.com/vi/${sub.youtubeVideoId}/mqdefault.jpg`" 
            alt="Превью видео"
            class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <i v-else class="pi pi-video text-4xl text-gray-700 group-hover:scale-110 transition-transform duration-300"></i>
          
          <div class="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
            <div class="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white shadow-xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
              <i class="pi pi-play text-lg ml-1"></i>
            </div>
          </div>
        </div>

        <div class="p-5 flex flex-col flex-1">
          <h3 class="text-white font-bold text-base line-clamp-1 mb-2 group-hover:text-red-500 transition-colors cursor-pointer" @click="openVideo(sub.youtubeVideoId)">
            {{ sub.title || `Материал команды DAR Team` }}
          </h3>
          
          <p class="text-gray-400 text-xs line-clamp-2 mb-5 flex-1 leading-relaxed">
            {{ sub.description || 'Вам открыт эксклюзивный доступ к разбору техники от тренерского состава.' }}
          </p>
        </div>
      </div>
    </div>

    <div 
      v-if="isPlayerOpen" 
      class="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-all duration-300"
      @click.self="closePlayer"
    >
      <div class="relative w-full max-w-4xl bg-[#111] rounded-2xl overflow-hidden border border-gray-800 shadow-2xl animate-fade-in">
        
        <button 
          @click="closePlayer" 
          class="absolute top-4 right-4 z-50 bg-black/60 hover:bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center transition shadow-lg border border-white/10"
        >
          <i class="pi pi-times text-sm"></i>
        </button>

        <div class="aspect-video w-full">
          <iframe
            v-if="activeVideoUrl"
            :src="activeVideoUrl"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            class="w-full h-full"
          ></iframe>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}

/* Плавное появление модалки */
.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>

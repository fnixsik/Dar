<template>
  <div class="rounded-3xl p-8 text-zinc-200">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
      <Button
        v-for="c in cities"
        :key="c"
        :label="$t(`cities.${c}`).toUpperCase()"
        @click="selectCity(c)"
        :class="[
          'justify-center py-4 text-lg font-semibold tracking-wide rounded-xl transition-colors border border-zinc-700',
          c === selectedCity
            ? 'bg-red-600 hover:bg-red-700 text-white border-red-500 shadow-md shadow-red-900/20'
            : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-100'
        ]"
      />
    </div>

    <div class="grid grid-cols-12 gap-8">
      <div class="col-span-12 md:col-span-5">
        <div class="rounded-xl overflow-hidden border border-zinc-700 h-[280px] md:h-[320px]">
          <iframe
            :src="mapUrl"
            width="100%" height="100%" frameborder="0"
            allowfullscreen
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div v-if="cityAddresses.length" class="mt-4 space-y-2">
          <div class="text-sm text-zinc-500 uppercase">{{ $t('lable.addressesInAlmaty') }} {{ selectedCity }}:</div>
          <div class="flex flex-col gap-2">
            <button
              v-for="(addr, i) in cityAddresses"
              :key="i"
              @click="selectAddress(i)"
              class="text-left px-4 py-3 rounded-lg border transition-colors"
              :class="i === selectedIndex
                ? 'border-red-500 bg-red-600/10 text-white'
                : 'border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-zinc-300'"
            >
              <div class="font-medium">{{ addr.address }}</div>
              <div class="text-xs text-zinc-500" v-if="addr.phones?.length">
                {{ addr.phones.join(' · ') }}
              </div>
            </button>
          </div>
        </div>
      </div>

      <div class="col-span-12 md:col-span-7 flex flex-col space-y-6">
        <div class="h-[505px] w-full max-w-[840px] flex flex-col overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-900 shadow-xl">
          <div class="flex-1 relative min-h-0"> 
            <template v-if="current.image?.length && current.image[0] !== ''">
              <Galleria 
                :value="current.image" 
                :numVisible="current.image[selectedIndex].length" 
                :circular="true"
                :autoPlay="true"
                :showItemNavigators="false"
                :showThumbnailNavigators="false"
                :transitionInterval="3000"
                class="h-full custom-static-galleria"
              >
                <template #item="slotProps">
                  <img 
                    :src="slotProps.item" 
                    class="w-full h-[270px] object-cover block" 
                    alt="Interior" 
                  />
                </template>
                <template #thumbnail="slotProps">
                  <img 
                    :src="slotProps.item" 
                    class="w-full h-[50px] object-cover block" 
                  />
                </template>
              </Galleria>
            </template>

            <div v-else class="flex flex-col items-center justify-center h-full bg-zinc-800/30 text-zinc-600">
              <i class="pi pi-images text-5xl mb-2"></i>
              <p class="text-xs uppercase tracking-widest">Фото отсутствуют</p>
            </div>
          </div>

          <div class="bg-zinc-900/90 border-t border-zinc-800 p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div class="flex gap-x-3 items-start">
              <div class="w-8 h-8 shrink-0 rounded-full bg-red-600/10 flex items-center justify-center">
                <i class="pi pi-map-marker text-red-500 text-sm"></i>
              </div>
              <div class="min-w-0">
                <div class="text-red-400 text-[10px] font-bold uppercase tracking-widest mb-0.5">{{ $t('lable.addressesPoint') }}</div>
                <div class="text-zinc-200 text-xs leading-tight truncate" :title="current.address">{{ current.address }}</div>
              </div>
            </div>

            <div class="flex gap-x-3 items-start">
              <div class="w-8 h-8 shrink-0 rounded-full bg-red-600/10 flex items-center justify-center">
                <i class="pi pi-phone text-red-500 text-sm"></i>
              </div>
              <div>
                <div class="text-red-400 text-[10px] font-bold uppercase tracking-widest mb-0.5">{{ $t('lable.Telephone') }}</div>
                <div class="flex flex-col text-xs text-zinc-200">
                  <a v-for="p in current.phones" :key="p" :href="'tel:'+p" class="hover:text-red-400 transition-colors">
                    {{ p }}
                  </a>
                </div>
              </div>
            </div>

            <div class="flex gap-x-3 items-start md:col-span-2 border-t border-zinc-800/50 pt-3 mt-1">
              <div class="w-8 h-8 shrink-0 rounded-full bg-red-600/10 flex items-center justify-center">
                <i class="pi pi-envelope text-red-500 text-sm"></i>
              </div>
              <div>
                <div class="text-red-400 text-[10px] font-bold uppercase tracking-widest mb-0.5">Email</div>
                <a :href="'mailto:'+current.email" class="text-zinc-200 text-xs hover:underline truncate block">
                  {{ current.email }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, computed } from 'vue'
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
// lat и lon теперь необязательны (что позволяет поддерживать старые записи без координат)
type Address = { address: string; phones?: string[], lat?: number; lon?: number; email?: string; image?: string[]}
type Directory = Record<string, Address[]>

const cities = [
  'Almaty','Astana','Konaev','Atyrau','Aktau','Kyzylorda','Aktobe','Kokshetau','AlmatyRegion','TurkestanRegion',
]

const directory = computed<Directory>(()=> (
  {
 'Almaty': [
 {
  address: t('cities.AlmatyStr'), 
  phones: ['+7 (727) 321‒04‒63', '+7 (727) 321‒04‒62'],
  email: 'darteam@dar.io',
  image: [''],
  lat: 43.211185, 
  lon: 76.890700 // Координаты для маркера
 },
 { 
  address: t('cities.AlmatyStr2'), 
  phones: ['+7‒708‒205‒06‒16', '+7‒776‒333‒54‒54'],
  email: 'darteam@dar.io',
  image: [''],
  lat: 43.206670,
  lon: 76.857041 // Координаты для маркера
 }
 ],
 'Aktau': [
  { 
    address: t('cities.AktauStr'), 
    phones: ['+7‒702‒000‒53‒52'],
    email: 'darteam@dar.io',
    image: [new URL('@/assets/img/Актау/img1.webp', import.meta.url).href,new URL('@/assets/img/Актау/img2.webp', import.meta.url).href,new URL('@/assets/img/Актау/img3.webp', import.meta.url).href,],
    lat: 43.678784,
    lon: 51.155507 // Координаты для маркера
  }
],
 'Aktobe': [
  {
    address: t('cities.AktobeStr'), 
    phones: ['+7-777-560-09-61','+7-705-242-56-91'],
    email: 'darteam@dar.io',
    image: [new URL('@/assets/img/АктобеНурСити/img1.webp', import.meta.url).href,new URL('@/assets/img/АктобеНурСити/img2.webp', import.meta.url).href,new URL('@/assets/img/АктобеНурСити/img3.webp', import.meta.url).href,],
    lat: 50.318663,
    lon: 57.339019 // Координаты для маркера
  },
  {
    address: t('cities.AktobeStr2'), 
    phones: ['+7-701-558-49-00'],
    email: 'darteam@dar.io',
    image: [new URL('@/assets/img/АктобеЕсетБатыра/img1.webp', import.meta.url).href,new URL('@/assets/img/АктобеЕсетБатыра/img2.webp', import.meta.url).href,new URL('@/assets/img/АктобеЕсетБатыра/img3.webp', import.meta.url).href,],
    lat: 50.300477,
    lon: 57.164846 // Координаты для маркера
  },
  {
    address: t('cities.AktobeStr3'),
    phones: ['+7-702-889-99-60'],
    email: 'darteam@dar.io',
    image: [new URL('@/assets/img/АктобеМаресьева/img1.webp', import.meta.url).href,new URL('@/assets/img/АктобеМаресьева/img2.webp', import.meta.url).href,new URL('@/assets/img/АктобеМаресьева/img3.webp', import.meta.url).href,new URL('@/assets/img/АктобеМаресьева/img4.webp', import.meta.url).href,
      new URL('@/assets/img/АктобеМаресьева/img5.webp', import.meta.url).href,new URL('@/assets/img/АктобеМаресьева/img6.webp', import.meta.url).href,new URL('@/assets/img/АктобеМаресьева/img7.webp', import.meta.url).href,new URL('@/assets/img/АктобеМаресьева/img8.webp', import.meta.url).href,
    ],
    lat: 50.305162,
    lon: 57.144386 // Координаты для маркера
  }
],
'AlmatyRegion':[
  { 
    address: t('cities.AlmatyRegStr'), 
    phones: ['+7-747-106-54-77'],
    email: 'darteam@dar.io',
    image: ['',],
    lat: 43.306347,
    lon: 77.149421 // Координаты для маркера
  }
],
'TurkestanRegion':[
  { 
    address: t('cities.TurkestanStr'), 
    phones: ['+7-705-270-13-68'],
    email: 'darteam@dar.io',
    image: ['',],
    lat: 42.493096,
    lon: 70.310401 // Координаты для маркера
  }
],
'Kokshetau':[
  { 
    address: t('cities.KokshetauStr'), 
    phones: ['+7-702-828-62-94'],
    email: 'darteam@dar.io',
    image: [new URL('@/assets/img/КокшетауАуельбекова/img1.webp', import.meta.url).href,new URL('@/assets/img/КокшетауАуельбекова/img2.webp', import.meta.url).href,new URL('@/assets/img/КокшетауАуельбекова/img3.webp', import.meta.url).href,new URL('@/assets/img/КокшетауАуельбекова/img4.webp', import.meta.url).href,],
    lat: 53.282040,
    lon: 69.365425 // Координаты для маркера
  },
  { 
    address: t('cities.KokshetauStr2'), 
    phones: ['+7-701-536-65-55'],
    email: 'darteam@dar.io',
    image: [new URL('@/assets/img/КокшетауБайтурсынова/img1.webp', import.meta.url).href,new URL('@/assets/img/КокшетауБайтурсынова/img2.webp', import.meta.url).href,new URL('@/assets/img/КокшетауБайтурсынова/img3.webp', import.meta.url).href,],
    lat: 53.292209,
    lon: 69.390972 // Координаты для маркера
  }
],
'Kyzylorda':[
  { 
    address: t('cities.KyzylordaStr'), 
    phones: ['+7-701-112-55-51'],
    email: 'darteam@dar.io',
    image: [new URL('@/assets/img/Кызылорда/img1.webp', import.meta.url).href,new URL('@/assets/img/Кызылорда/img2.webp', import.meta.url).href,],
    lat: 44.827906,
    lon: 65.501242 // Координаты для маркера
  }
],
'Atyrau':[
  { 
    address: t('cities.AtyrauStr'), 
    phones: [''],
    email: 'darteam@dar.io',
    image: [
      new URL('@/assets/img/Атырау/img1.webp', import.meta.url).href,new URL('@/assets/img/Атырау/img2.webp', import.meta.url).href,
    ],
    lat: 47.124659,
    lon: 51.941792 // Координаты для маркера
  }
],
'Konaev':[
  { 
    address: t('cities.KonaevStr'), 
    phones: ['+7-707-173-39-83','+7-776-415-20-01','+7-771-402-45-47'],
    email: 'darteam@dar.io',
    image: [
      new URL('@/assets/img/Қонаев/img1.webp', import.meta.url).href,new URL('@/assets/img/Қонаев/img2.webp', import.meta.url).href,new URL('@/assets/img/Қонаев/img3.webp', import.meta.url).href,new URL('@/assets/img/Қонаев/img4.webp', import.meta.url).href,
      new URL('@/assets/img/Қонаев/img5.webp', import.meta.url).href,new URL('@/assets/img/Қонаев/img6.webp', import.meta.url).href,new URL('@/assets/img/Қонаев/img7.webp', import.meta.url).href,new URL('@/assets/img/Қонаев/img8.webp', import.meta.url).href,
      new URL('@/assets/img/Қонаев/img9.webp', import.meta.url).href,new URL('@/assets/img/Қонаев/img10.webp', import.meta.url).href,new URL('@/assets/img/Қонаев/img11.webp', import.meta.url).href,new URL('@/assets/img/Қонаев/img12.webp', import.meta.url).href,
      new URL('@/assets/img/Қонаев/img13.webp', import.meta.url).href,new URL('@/assets/img/Қонаев/img14.webp', import.meta.url).href,new URL('@/assets/img/Қонаев/img15.webp', import.meta.url).href,new URL('@/assets/img/Қонаев/img16.webp', import.meta.url).href,
    ],
    lat: 43.849462,
    lon: 77.052731 // Координаты для маркера
  }
],
'Astana':[
  { 
    address: t('cities.AstanaStr'), 
    phones: ['+7-702-505-03-52',' +7-701-393-42-70'],
    email: 'darteam@dar.io',
    image: [
      new URL('@/assets/img/Astana/Astanaimg1.webp',import.meta.url).href,new URL('@/assets/img/Astana/Astanaimg2.webp',import.meta.url).href,new URL('@/assets/img/Astana/Astanaimg3.webp',import.meta.url).href,new URL('@/assets/img/Astana/Astanaimg4.webp',import.meta.url).href,
      new URL('@/assets/img/Astana/Astanaimg5.webp',import.meta.url).href,new URL('@/assets/img/Astana/Astanaimg6.webp',import.meta.url).href,new URL('@/assets/img/Astana/Astanaimg7.webp',import.meta.url).href,new URL('@/assets/img/Astana/Astanaimg8.webp',import.meta.url).href,
      new URL('@/assets/img/Astana/Astanaimg9.webp',import.meta.url).href,new URL('@/assets/img/Astana/Astanaimg10.webp',import.meta.url).href,
    ],
    lat: 51.188204,
    lon: 71.414430 // Координаты для маркера
  }
],
}
)) 

const selectedCity = ref('Almaty')
const selectedIndex = ref(0)

const cityAddresses = computed(() => directory.value[selectedCity.value] ?? [])
const current = computed(() => cityAddresses.value[selectedIndex.value] ?? { address: '' })

function selectCity(c: string) {
 selectedCity.value = c
 selectedIndex.value = 0
}
function selectAddress(i: number) {
 selectedIndex.value = i
}

// 🔑 ОБНОВЛЕННЫЙ mapUrl ДЛЯ ОТОБРАЖЕНИЯ МАРКЕРА
const mapUrl = computed(() => {
    const currentAddress = current.value;

    // Проверяем, есть ли координаты (lat и lon) у выбранного адреса
    if (currentAddress.lat && currentAddress.lon) {
        const { lat, lon } = currentAddress;
        
        return `https://yandex.ru/map-widget/v1/?ll=${lon},${lat}&z=16&pt=${lon},${lat},pm2rdl`;
    }

    // РЕЗЕРВНЫЙ ВАРИАНТ: Если координат нет, используем старый метод — поиск по тексту
    const addr = currentAddress?.address ? `${selectedCity.value}, ${currentAddress.address}` : selectedCity.value
    return `https://yandex.ru/map-widget/v1/?text=${encodeURIComponent(addr)}&z=16`
})
</script>

<style scoped>
:deep(.p-button:not(:disabled):hover) {
  border-color: #B00D15;
}
:deep(.p-button) {
  width: 100%;
  border-radius: 0.75rem;
  background: #18181b;
  border: 1px solid #27272a;
  color: #f4f4f5;
  transition: all 0.2s;
}
:deep(.p-button:hover) {
  background: #27272a;
  color: #f4f4f5;
}
</style>

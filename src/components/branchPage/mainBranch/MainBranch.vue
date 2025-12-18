<template>
  <div class="rounded-3xl p-8 text-zinc-200">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
      <Button
        v-for="c in cities"
        :key="c"
        :label="c.toUpperCase()"
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
          <div class="text-sm text-zinc-500 uppercase">Адреса в городе {{ selectedCity }}:</div>
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

      <div class="col-span-12 md:col-span-7 flex flex-col **space-y-6**">         
        <div class="grid grid-cols-[24px_1fr] gap-x-3 items-start">
          <i class="pi pi-map-marker text-red-500 text-lg leading-6"></i>
          <div>
            <div class="text-red-400 font-semibold">Мекенжай</div>
            <div class="text-zinc-200">
              <span v-if="cityAddresses.length">{{ current.address }}</span>
              <span v-else class="text-zinc-500">Адресов пока нет</span>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-[24px_1fr] gap-x-3 items-start">
          <i class="pi pi-phone text-red-500 text-lg leading-6"></i>
          <div>
            <div class="text-red-400 font-semibold">Телефон</div>
            <div class="text-zinc-200">
              <template v-if="current.phones?.length">
                <a
                  v-for="(p, i) in current.phones"
                  :key="p"
                  :href="'tel:'+p.replace(/\\s|\\+/g,'')"
                  class="hover:underline"
                >
                  {{ p }}<span v-if="i < current.phones.length - 1">, </span>
                </a>
              </template>
              <span v-else class="text-zinc-500">—</span>
          </div>
          </div>
        </div>

        <div class="grid grid-cols-[24px_1fr] gap-x-3 items-start">
          <i class="pi pi-envelope text-red-500 text-lg leading-6"></i>
          <div>
            <div class="text-red-400 font-semibold">Email</div>
            <a href="mailto:almaty.center@utemuratovfund.org" class="text-zinc-200 hover:underline">
              darteam@dar.io
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, computed } from 'vue'
import Button from 'primevue/button'

// lat и lon теперь необязательны (что позволяет поддерживать старые записи без координат)
type Address = { address: string; phones?: string[], lat?: number; lon?: number;}
type Directory = Record<string, Address[]>

const cities = [
  'Алматы','Актау','Актобе'
]

const directory: Directory = {
 'Алматы': [
 {
  address: 'улица Патшаим Тажибаевой, 155', 
  phones: ['+7 (727) 321‒04‒63', '+7 (727) 321‒04‒62'], 
  lat: 43.211185, 
  lon: 76.890700 // Координаты для маркера
 },
 { 
  address: 'Ораза Жандосова улица, 87', 
  phones: ['+7‒708‒205‒06‒16', '+7‒776‒333‒54‒54'],
  lat: 43.206670,
  lon: 76.857041 // Координаты для маркера
 }
 ],
 'Актау': [
  { 
    address: '19-й микрорайон, 26', 
    phones: ['+7‒702‒000‒53‒52'],
    lat: 43.678784,
    lon: 51.155507 // Координаты для маркера
  }
],
 'Актобе': [
  { 
    address: 'мкр.Есет батыра, 2-й микрорайон, 28', 
    phones: ['+7‒777‒560‒09‒61'],
    lat: 50.318671,
    lon: 57.338961 // Координаты для маркера
  }
]
}

const selectedCity = ref('Алматы')
const selectedIndex = ref(0)

const cityAddresses = computed(() => directory[selectedCity.value] ?? [])
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
        
        // Используем параметры ll (центр карты) и pt (точка маркера)
        // pm2rdl - это тип маркера: стандартный, красный, с точкой.
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
}
</style>

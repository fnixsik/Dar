<template>
  <div class="rounded-3xl p-8 text-zinc-200">
    <!-- Список городов -->
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
      <!-- Карта -->
      <div class="col-span-12 md:col-span-5">
        <div class="rounded-xl overflow-hidden border border-zinc-700 h-[280px] md:h-[320px]">
          <iframe
            :src="mapUrl"
            width="100%" height="100%" frameborder="0"
            allowfullscreen
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <!-- Список адресов -->
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

      <!-- Инфо -->
      <div class="col-span-12 md:col-span-7 grid grid-cols-[24px_1fr] gap-x-3 items-start">
        <i class="pi pi-map-marker text-red-500 text-lg leading-6"></i>
        <div>
          <div class="text-red-400 font-semibold">Мекенжай</div>
          <div class="text-zinc-200">
            <span v-if="cityAddresses.length">{{ current.address }}</span>
            <span v-else class="text-zinc-500">Адресов пока нет</span>
          </div>
        </div>

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

        <i class="pi pi-envelope text-red-500 text-lg leading-6"></i>
        <div>
          <div class="text-red-400 font-semibold">Email</div>
          <a href="mailto:almaty.center@utemuratovfund.org" class="text-zinc-200 hover:underline">
            almaty.center@utemuratovfund.org
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Button from 'primevue/button'

type Address = { address: string; phones?: string[] }
type Directory = Record<string, Address[]>

const cities = [
  'Алматы','Астана','Караганда','Актау','Атырау','Актобе',
  'Кокшетау','Туркестан','Кызылорда','Конаев','Кордай','Талгар','Темиртау'
]

const directory: Directory = {
  'Алматы': [
    { address: 'Тажибаева 155', phones: ['+7 705 626 6969', '+7 747 722 0786'] },
    { address: 'Жандосова 87',  phones: ['+7 705 626 6969'] }
  ],
  'Астана': [{ address: 'пр. Туран 45', phones: ['+7 705 222 1234'] }],
  'Караганда': [{ address: 'ул. Абая 13', phones: ['+7 777 333 1212'] }]
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

const mapUrl = computed(() => {
  const addr = current.value?.address ? `${selectedCity.value}, ${current.value.address}` : selectedCity.value
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

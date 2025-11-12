<template>
  <Dialog
    v-model:visible="modelValueLocal"
    @update:visible="handleClose"
    modal
    :dismissableMask="true"
    :closeOnEscape="true"
    :breakpoints="{ '1280px':'70vw', '960px':'90vw', '640px':'95vw' }"
    :style="{ width: '920px', maxWidth: '95vw' }"
    :pt="{
      root:{ class:'bg-black text-white rounded-2xl overflow-hidden' },
      header:{ class:'bg-black text-white border-0 pb-0' },
      content:{ class:'bg-black text-white' },
      footer:{ class:'bg-black text-white border-0 pt-0' }
    }"
    aria-label="Карточка бойца"
  >
    <!-- Заголовок -->
    <template #header>
      <div class="flex flex-col gap-1">
        <h2 class="text-xl font-semibold">{{ props.userData?.name || 'Имя не указано' }}</h2>
        <span class="text-sm text-zinc-400">{{ props.userData?.nickname }}</span>
        <span class="text-xs text-zinc-500">{{ props.userData?.country }}</span>
      </div>
    </template>

    <div class="grid grid-cols-12 gap-6">
      <!-- Левая часть -->
      <div class="col-span-12 lg:col-span-7">
        <div class="text-sm tracking-wider text-zinc-300 mb-3">СТАТИСТИКА ПОБЕД</div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div v-for="(label, key) in nameProcentInt" :key="key" class="bg-zinc-900 rounded-2xl p-4 flex flex-col items-center">
            <CircleProgress
              :percent="Number(numericData?.[key]) || 0"
              :size="100"
              :border-width="13"
              :is-percent="true"
              :animation="true"
              :animation-duration="1200"
              class="glow-circle"
            />
            <div class="mt-3 flex flex-col items-center">
              <span class="text-lg font-semibold text-white">{{ numericData?.[key] || 0 }}%</span>
              <span class="text-xs text-zinc-500 uppercase tracking-wider">{{ label }}</span>
            </div>
          </div>
        </div>

        <TabView class="mt-6" :pt="{ nav:{ class:'bg-transparent border-b border-zinc-800' } }">
          <TabPanel header="БИОГРАФИЯ" value="bio">
            <div class="space-y-2 pt-3">
              <p class="text-sm leading-relaxed text-zinc-300">
                Родился: <strong>{{ props.userData?.birthplace }}</strong>
              </p>
              <p class="text-sm leading-relaxed text-zinc-300">
                Весовая категория: <strong>{{ props.userData?.weightClass }}</strong>
              </p>
              <p class="text-sm leading-relaxed text-zinc-300">
                Рекорд: <strong>{{ props.userData?.record }}</strong>
              </p>
              <p class="text-sm leading-relaxed text-zinc-300">
                Вид спорта: <strong>{{ props.userData?.sport }}</strong>
              </p>
            </div>
          </TabPanel>

          <TabPanel header="ДОСТИЖЕНИЯ" value="achievements">
            <ul class="list-disc ml-5 space-y-1 pt-3">
              <li v-for="(a, i) in props.userData?.achievements || []" :key="i" class="text-sm text-zinc-300">
                {{ a.title }}
              </li>
              <li v-if="!props.userData?.achievements?.length" class="text-zinc-500 text-sm">
                Достижений пока нет.
              </li>
            </ul>
          </TabPanel>
        </TabView>
      </div>

      <!-- Фото бойца -->
      <div class="col-span-12 lg:col-span-5">
        <div class="bg-zinc-900 rounded-2xl overflow-hidden h-[420px] flex items-center justify-center">
          <img
            v-if="props.userData?.img"
            :src="props.userData.img"
            :alt="props.userData.name"
            class="object-cover w-full h-full"
          />
          <Skeleton v-else width="80%" height="70%" class="bg-zinc-800" />
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import Dialog from 'primevue/dialog'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import Skeleton from 'primevue/skeleton'
// @ts-ignore
import CircleProgress from 'vue3-circle-progress'
import type { Fighters } from '@/types/fightType'

const props = defineProps<{
  modelValue: boolean
  /** Проценты для 4 карточек, по умолчанию все 72 */
  stats?: number[]
  userData?: any
}>()

const emit = defineEmits<{ 
  (e:'update:modelValue', v:boolean):void,
}>()

// ------- start -----------

const nameProcentInt = {
  other: 'Other',
  solution: 'Solution', 
  submissive: 'Submissive',
  tko: 'TKO'
}

// Фильтруем userData, оставляя только числовые поля из nameProcentInt
const numericData = computed(() => {
  if (!props.userData) return {}
  
  const result: any = {}
  Object.keys(nameProcentInt).forEach(key => {
    if (props.userData[key] !== undefined && props.userData[key] !== null) {
      result[key] = props.userData[key]
    }
  })
  return result
})

// ------- end -------------

const modelValueLocal = ref(props.modelValue)
const nameProcent = {
  kto: "КТО/ТКО",
  decision: "РЕШЕНИЕ",
  sabmision: "САБМИШЕН",
  other: "ОСТАЛЬНОЕ",
}
watch(() => props.modelValue, v => (modelValueLocal.value = v))
watch(modelValueLocal, v => emit('update:modelValue', v))

const handleClose = (v: boolean) => {
  emit('update:modelValue', v)
}
</script>

<style scoped>
:deep(svg circle:not(.circle-progress__background)) {
  stroke: #B00D15 !important;
}

:deep(svg .circle-progress__background),
:deep(svg circle:first-child) {
  stroke: #3f3f46 !important;
}

:deep(.p-tabview-ink-bar) {
  background: #B00D15 !important;
}
</style>

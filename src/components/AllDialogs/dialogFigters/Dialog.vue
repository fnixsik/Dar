<!-- src/components/FighterDialogMock.vue -->
<template>
  <Dialog
    v-model:visible="modelValueLocal"
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
    aria-label="Карточка бойца (макет)"
  >
    <template #header>
      <div class="flex flex-col gap-1">
        <Skeleton width="10rem" height="0.75rem" class="bg-zinc-800" />
        <Skeleton width="18rem" height="1.5rem" class="bg-zinc-800" />
        <Skeleton width="12rem" height="0.75rem" class="bg-zinc-800" />
      </div>
    </template>

    <div class="grid grid-cols-12 gap-6">
      <!-- Левая часть -->
      <div class="col-span-12 lg:col-span-7">
        <div class="text-sm tracking-wider text-zinc-300 mb-3">СТАТИСТИКА ПОБЕД</div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div
            v-for="(p, idx) in safeStats"
            :key="idx"
            class="bg-zinc-900 rounded-2xl p-4 flex flex-col items-center"
          >
<CircleProgress
  :percent="50"
  :is-percent="true"
  :size="100"
  :border-width="10"
  :color="getColor(72)"
  background="#27272a"
  :animation="true"
  :animation-duration="1200"
  :show-percent="true"
/>


            <p class="mt-2 text-sm text-zinc-200">{{ p }}%</p>
            <Skeleton width="3rem" height="1rem" class="mt-3 bg-zinc-800" />
            <Skeleton width="5rem" height="0.75rem" class="mt-2 bg-zinc-800" />
          </div>
        </div>

        <TabView class="mt-6" :pt="{ nav:{ class:'bg-transparent border-b border-zinc-800' } }">
          <TabPanel header="БИОГРАФИЯ" value="bio">
            <div class="space-y-3 pt-3">
              <Skeleton width="85%" height="0.9rem" class="bg-zinc-800" />
              <Skeleton width="88%" height="0.9rem" class="bg-zinc-800" />
              <Skeleton width="75%" height="0.9rem" class="bg-zinc-800" />
              <Skeleton width="82%" height="0.9rem" class="bg-zinc-800" />
            </div>
          </TabPanel>
          <TabPanel header="ДОСТИЖЕНИЯ" value="achievements">
            <div class="space-y-2 pt-3">
              <Skeleton v-for="i in 4" :key="i" width="80%" height="0.9rem" class="bg-zinc-800" />
            </div>
          </TabPanel>
        </TabView>
      </div>

      <!-- Правая часть: фото-заглушка -->
      <div class="col-span-12 lg:col-span-5">
        <div class="bg-zinc-900 rounded-2xl overflow-hidden h-[420px] flex items-center justify-center">
          <Skeleton width="80%" height="70%" class="bg-zinc-800" />
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

const props = defineProps<{
  modelValue: boolean
  /** Проценты для 4 карточек, по умолчанию все 72 */
  stats?: number[]
}>()

const emit = defineEmits<{ (e:'update:modelValue', v:boolean): void }>()
const modelValueLocal = ref(props.modelValue)
watch(() => props.modelValue, v => (modelValueLocal.value = v))
watch(modelValueLocal, v => emit('update:modelValue', v))

const safeStats = computed(() => {
  const base = props.stats && props.stats.length ? props.stats : [72, 72, 72, 72]
  // гарантируем 4 значения
  return [...base].slice(0, 4).concat(Array(Math.max(0, 4 - base.length)).fill(72))
})

const getColor = (v: number) => (v < 40 ? '#ef4444' : v < 70 ? '#facc15' : '#4ade80')
</script>

<style scoped>
:deep(.p-tabview-nav li.p-highlight .p-tabview-nav-link){
  border-bottom:2px solid #ef4444;
  color:#fff;
}
:deep(.p-dialog-header){ display:flex; flex-direction:column; gap:.25rem; }
</style>

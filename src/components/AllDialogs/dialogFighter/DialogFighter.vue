<!-- src/components/FighterDialogMock.vue -->
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
            v-for="(p, idx) in nameProcent"
            :key="idx"
            class="bg-zinc-900 rounded-2xl p-4 flex flex-col items-center"
          >
            <CircleProgress
              :percent="p"
              :size="100"
              :border-width="13"
              :is-percent="true"
              :animation="true"
              :animation-duration="1200"
              class="glow-circle"
            />
            <div class="mt-3 flex flex-col items-center">
              <span class="text-lg font-semibold text-white">{{  }}%</span>
              <span class="text-xs text-zinc-500 uppercase tracking-wider">{{ p }}</span>
            </div>
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
            <div class="space-y-3 pt-3">
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

const emit = defineEmits<{ 
  (e:'update:modelValue', v:boolean): void,
}>()
const modelValueLocal = ref(props.modelValue)
const nameProcent = {
  kto: "КТО/ТКО",
  decision: "РЕШЕНИЕ",
  sabmision: "САБМИШЕН",
  other: "ОСТАЛЬНОЕ",
}
watch(() => props.modelValue, v => (modelValueLocal.value = v))
watch(modelValueLocal, v => emit('update:modelValue', v))

const handleClose = (v: any) => {
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

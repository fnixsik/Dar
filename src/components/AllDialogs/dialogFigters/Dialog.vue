<!-- src/components/FighterDialogMock.vue -->
<template>
  <Dialog
    v-model:visible="modelValueLocal"
    modal
    :dismissableMask="true"
    :style="{ width: '920px', maxWidth: '95vw' }"
    :breakpoints="{ '1280px':'70vw', '960px':'90vw', '640px':'95vw' }"
    :pt="{
      root:{ class:'bg-black text-white' },
      header:{ class:'bg-black text-white border-0 pb-0' },
      content:{ class:'bg-black text-white' },
      footer:{ class:'bg-black text-white border-0 pt-0' }
    }"
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

        <!-- Четыре кружка-заменителя -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div v-for="n in 4" :key="n" class="bg-zinc-900 rounded-2xl p-4 flex flex-col items-center">
            <div class="w-28 h-28 rounded-full border-8 border-zinc-800"></div>
            <Skeleton width="3rem" height="1rem" class="mt-3 bg-zinc-800" />
            <Skeleton width="5rem" height="0.75rem" class="mt-2 bg-zinc-800" />
          </div>
        </div>

        <!-- Вкладки -->
        <TabView class="mt-6" :pt="{ nav:{ class:'bg-transparent border-b border-zinc-800' } }">
          <TabPanel header="БИОГРАФИЯ">
            <div class="space-y-4 pt-2">
              <FieldRow label="Место рождения" />
              <FieldRow label="Вид спорта" />
              <FieldRow label="Разряд" />
              <FieldRow label="Инстаграм" />
            </div>
          </TabPanel>
          <TabPanel header="ДОСТИЖЕНИЯ">
            <div class="space-y-2 pt-2">
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
import { ref, watch } from 'vue'
import Dialog from 'primevue/dialog'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import Skeleton from 'primevue/skeleton'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{ (e:'update:modelValue', v:boolean): void }>()
const modelValueLocal = ref(props.modelValue)
watch(() => props.modelValue, v => (modelValueLocal.value = v))
watch(modelValueLocal, v => emit('update:modelValue', v))
</script>

<script lang="ts">
import { defineComponent } from 'vue'
import Skeleton from 'primevue/skeleton'
export default defineComponent({
  name: 'FieldRow',
  props: { label: String },
  setup(props) {
    return () => (
      <div class="flex gap-3 items-start">
        <div class="w-40 shrink-0 text-xs uppercase tracking-wider text-zinc-400">{props.label}</div>
        <Skeleton width="60%" height="1rem" class="bg-zinc-800" />
      </div>
    )
  }
})
</script>

<style scoped>
:deep(.p-tabview-nav li.p-highlight .p-tabview-nav-link){
  border-bottom:2px solid #ef4444; /* красная линия как акцент */
  color:#fff;
}
:deep(.p-dialog-header){ display:flex; flex-direction:column; gap:.25rem; }
</style>

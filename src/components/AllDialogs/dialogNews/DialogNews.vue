<!-- src/components/CoachDialogFullscreen.vue -->
<template>
  <Dialog
    v-model:visible="modelValueLocal" modal maximizable
    :pt="{ root:{ class:'bg-black text-white' }, header:{ class:'bg-black text-white border-0' }, content:{ class:'bg-black text-white' } }"
    :style="{ width: '95vw' }"
  >
    <template #header>
      <div class="flex items-center justify-between w-full">
        <div class="text-2xl sm:text-3xl font-extrabold uppercase">Новости</div>
      </div>
    </template>

    <div class="grid grid-cols-12 gap-8">
      <div class="col-span-12 xl:col-span-8">
        <div class="h-[60vh] overflow-auto pr-2">
          <ul class="space-y-3">
            <li v-for="(a, i) in achievements" :key="i" class="flex gap-3">
              <span class="mt-[7px] w-2 h-2 rounded-full bg-red-600 shrink-0"></span>
              <span class="text-zinc-100">{{ a }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-span-12 xl:col-span-4">
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Dialog from 'primevue/dialog'
const props = defineProps<{ modelValue: boolean; name: string; image: string; achievements: string[] }>()
const emit = defineEmits<{ (e:'update:modelValue', v:boolean): void }>()
const modelValueLocal = ref(props.modelValue)
watch(() => props.modelValue, v => (modelValueLocal.value = v))
watch(modelValueLocal, v => emit('update:modelValue', v))
</script>

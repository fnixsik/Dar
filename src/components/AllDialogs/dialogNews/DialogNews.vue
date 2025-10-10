<!-- src/components/CoachDialogFullscreen.vue -->
<template>
  <Dialog
    v-model:visible="modelValueLocal" modal maximizable
    @update:visible="handleClose"
    :pt="{ root:{ class:'bg-black text-white' }, header:{ class:'bg-black text-white border-0' }, content:{ class:'bg-black text-white' } }"
    :style="{ width: '95vw' }"
  >
    <template #header>
      <div class="w-full flex">
        <div class="text-2xl sm:text-3xl font-extrabold uppercase ">
          Новости
        </div>
      </div>
    </template>
    <div class="mt-2 h-[2px] w-full bg-red-600 rounded-full"></div>

    <div class="mt-6 flex flex-col gap-4 items-center">
      <div class="bg-red-600 w-40 h-[50vh] "></div>
      <div class="bg-zinc-700 w-40 h-[50vh] "></div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Dialog from 'primevue/dialog'

const props = defineProps<{ modelValue: boolean; name?: string; image?: string; achievements?: string[] }>()
const emit = defineEmits<{ (e:'update:modelValue', v:boolean): void }>()
const modelValueLocal = ref(props.modelValue)
watch(() => props.modelValue, v => (modelValueLocal.value = v))
watch(modelValueLocal, v => emit('update:modelValue', v))

const handleClose = (v: boolean) => {
  emit('update:modelValue', v)
}
</script>

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

<div class="flex justify-center items-center min-h-screen bg-black">
  <div class="w-[80%] flex flex-col gap-4 items-center">
    <!-- Верхний блок (например, изображение или баннер) -->
    <div class="bg-red-600 w-full md:w-2/3 h-[80vh] flex justify-center items-center text-white text-xl font-semibold">
      Здесь будет изображение / баннер
    </div>

    <!-- Нижний блок с текстом -->
    <div class="bg-zinc-700 w-full md:w-2/3 h-auto flex justify-center items-center text-white text-lg md:text-xl font-medium p-6 rounded-lg leading-relaxed text-center">
      <p>
        Это пример текстового описания. Здесь можно разместить краткую информацию о проекте,
        команде, событии или любом другом контенте. Текст адаптируется под ширину экрана,
        а отступы обеспечивают комфортное чтение на мобильных устройствах.
      </p>
    </div>
  </div>
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

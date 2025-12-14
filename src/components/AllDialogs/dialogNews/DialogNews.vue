<!-- src/components/CoachDialogFullscreen.vue -->
<template>
  <Dialog
    v-model:visible="modelValueLocal" modal maximizable
    @update:visible="handleClose"
    :pt="{ root:{ class:'bg-black text-white' }, header:{ class:'bg-black text-white border-0' }, content:{ class:'bg-black text-white' } }"
    :style="{ width: '95vw', '--p-dialog-border-color': '#3f3f46' }"
  >
    <template #header>
      <div class="w-full flex">
        <div class="text-2xl sm:text-3xl font-extrabold uppercase ">
          <p>
            {{ props.userData?.title }}
          </p>
        </div>
      </div>
    </template>
    <div class="mt-2 h-[2px] w-full bg-red-600 rounded-full"></div>

    <div class="flex justify-center items-center min-h-screen bg-black">
      <div class="w-[80%] flex flex-col gap-4 items-center">

        <!-- Верхний блок (адаптивное изображение) -->
        <div v-if="props.userData?.img" 
            class="w-full md:w-2/3 max-h-[80vh] flex justify-center items-center">

          <img 
            :src="props.userData?.img"
            alt="Новости"
            class="max-h-[80vh] max-w-full object-contain rounded-lg"
          />
        </div>

        <div v-else class="text-white text-4xl">
          📸
        </div>

        <!-- Нижний блок с текстом -->
        <div class="bg-zinc-700 w-full md:w-2/3 h-auto flex justify-center items-center 
                    text-white text-lg md:text-xl font-medium p-6 rounded-lg leading-relaxed text-center">
          <p>
            {{ props.userData?.content }}
          </p>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Dialog from 'primevue/dialog'

const props = defineProps<{ modelValue: boolean; userData: any }>()
const emit = defineEmits<{ (e:'update:modelValue', v:boolean): void }>()
const modelValueLocal = ref(props.modelValue)
watch(() => props.modelValue, v => (modelValueLocal.value = v))
watch(modelValueLocal, v => emit('update:modelValue', v))

const handleClose = (v: boolean) => {
  emit('update:modelValue', v)
}
</script>

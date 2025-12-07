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
          <p>
            {{ props.userData.title }}
          </p>
        </div>
      </div>
    </template>
    <div class="mt-2 h-[2px] w-full bg-red-600 rounded-full"></div>

    <div class="bg-gray-800 w-full md:w-2/3 h-[80vh] flex justify-center items-center text-gray-200 text-xl font-semibold rounded-lg shadow-2xl overflow-hidden">
      <div v-if="props.userData.img" class="w-full h-full">
        <img 
          :src="props.userData.img"
          alt="Новости" 
          class="w-full h-full object-cover"
        />
      </div>
      <div v-else class="text-6xl text-gray-500 flex items-center justify-center w-full h-full">
        📸
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

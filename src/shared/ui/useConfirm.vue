<script setup lang="ts">
import { ref, watch } from 'vue'

const visible = ref(false)
const props = defineProps<{
  confirmText: string
}>()

export const resolveFn = (res: boolean) => {
  return res
}
</script>

<template>
  <Dialog v-model:visible="visible" header="Подтвердите действие" modal>
    <p class="text-white">{{ props.confirmText }}</p>
    <div class="mt-4 flex justify-end gap-2">
      <Button label="Отмена" class="p-button-text" @click="resolveFn(false)" />
      <Button label="Подтвердить" class="p-button-danger" @click="resolveFn(true)" />
    </div>
  </Dialog>
</template>

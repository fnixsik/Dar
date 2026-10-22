<template>
  <Dialog v-model:visible="isVisible" :header="confirmHeader" modal>
    <p class="text-white">{{ confirmMessage }}</p>
    <div class="mt-4 flex justify-end gap-2">
      <Button label="Отмена" class="p-button-text" @click="cancel" />
      <Button label="Подтвердить" class="p-button-danger" @click="confirm" />
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { useConfirmDialog } from '@/shared/lib/useConfirm'

const {
  isVisible,
  confirmMessage,
  confirmHeader,
  confirm,
  cancel
} = useConfirmDialog()
</script>

<style scoped>
:deep(.p-button) {
  padding: 12px 24px;
  background-color: #B00D15;
  border:#B00D15;
  color: white;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s;
  margin: 12px 0;
}
:deep(.p-button:hover) {
  background-color: #9B0B12;
  border:#B00D15;
}
.p-button-text:not(:disabled):hover {
    background: #ffe5e5;
    border-color: transparent;
    color: #B00D15;
}
</style>

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

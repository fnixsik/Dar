import { ref } from 'vue'

type ConfirmOptions = {
  message: string
  header?: string
}

const isVisible = ref(false)
const confirmMessage = ref('')
const confirmHeader = ref('Подтвердите действие')

let resolver: (value: boolean) => void = () => {}

export function useConfirmDialog() {
  const show = (options: ConfirmOptions): Promise<boolean> => {
    confirmMessage.value = options.message
    confirmHeader.value = options.header || 'Подтвердите действие'
    isVisible.value = true

    return new Promise<boolean>((resolve) => {
      resolver = resolve
    })
  }

  const confirm = () => {
    isVisible.value = false
    resolver(true)
  }

  const cancel = () => {
    isVisible.value = false
    resolver(false)
  }

  return {
    isVisible,
    confirmMessage,
    confirmHeader,
    show,
    confirm,
    cancel,
  }
}

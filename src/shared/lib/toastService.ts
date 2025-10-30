import { useToast } from 'primevue/usetoast'
import type { AxiosError } from 'axios'

let toastInstance: ReturnType<typeof useToast> | null = null

export const setGlobalToast = (toast: ReturnType<typeof useToast>) => {
  toastInstance = toast
}

export const showSuccess = (summary: string = 'Добро пожаловать!', detail: string = 'Вы успешно вошли') => {
  if (!toastInstance) return
  toastInstance.add({
    severity: 'success',
    summary: summary,
    detail: detail,
    life: 3000
  })
}

export const showError = (err: unknown) => {
  if (!toastInstance) return
  const error = err as AxiosError
  toastInstance.add({
    severity: 'error',
    summary: error.code,
    detail: error.message,
    life: 3000
  })
}
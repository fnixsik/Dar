import { useToast } from 'primevue/usetoast'

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

  let summary = "Ошибка"
  let detail = "Произошла неизвестная ошибка"

  if(typeof err === "string"){
    detail = err;
  }

  else if(err instanceof Error){
    summary = err.name || "Ошибка"
    detail = err.message || "Неизвестная ошибка"
  }

  toastInstance.add({
    severity: 'error',
    summary,
    detail,
    life: 3000
  })
}
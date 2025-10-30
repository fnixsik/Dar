import axios from "axios";
import router from '@/router'
import { showError } from '@/shared/lib/toastService'

axios.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

let redirecting = false

axios.interceptors.response.use(
  (r) => r,
  (error) => {
    const status = error?.response?.status

    if(status === 401 && !redirecting){
      redirecting = true
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('expiresAt')
      router.push('/login')
    }else if (status === 403 && !redirecting){
      showError('Доступ запрещен')
    }
    return Promise.reject(error)
  }
)
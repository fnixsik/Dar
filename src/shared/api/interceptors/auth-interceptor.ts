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
      router.push('/login')
    }else if (status === 403 && !redirecting){
      showError('Недостаточно права доступа')
      router.push('/')
    }
    return Promise.reject(error)
  }
)
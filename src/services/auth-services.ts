import { BaseApi } from "../server"

export const auth = async (name: string, password: string): Promise<any> => {
  const response = await BaseApi.post('/api/auth/login',{
    "username": name,
    "password": password
  })
  return response.data
}
import { BaseApi } from "../server"

export const auth = async (name: string, password: string): Promise<any> => {
  const response = await BaseApi.post('/auth/login',{
    username: name,
    password: password
  })
  return response.data
}

export const registerUser = async (name: string, password: string, email: string) => {
  const response = await BaseApi.post('/auth/register',{
    username: name,
    password: password,
    email: email
  })
}
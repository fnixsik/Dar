import { accessServiceApi } from '../../shared/api/accessServiceApi'


export const auth = async (name: string, password: string) => {
    const response = await accessServiceApi.post('/api/auth/register',{
      username: name,
      password: password
    })
    return response;
}
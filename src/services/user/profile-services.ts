import { BaseApi } from "../../server"

export const getDataProfile = async (): Promise<any> => {
  const response = await BaseApi.get('/user/profile');
  return response;
}

export const sendDataProfile = async (data: any): Promise<any> => {
  const response = await BaseApi.post('/user/profile');
  return response;
}
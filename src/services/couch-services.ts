import { BaseApi } from "../server"

export const getAllCouches = async (): Promise<any> => {
  const response = await BaseApi.get('/admin/v1/coaches');
  return response;
}

export const sendCouches = async (data: any): Promise<any> => {
  const response = await BaseApi.post('/admin/v1/coaches', data);
  return response;
}
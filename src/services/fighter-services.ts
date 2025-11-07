import { BaseApi } from "../server"

export const getAllFighters = async (): Promise<any> => {
  const response = await BaseApi.get('/admin/v1/fighters');
  return response;
}

export const senFighters = async (data: any): Promise<any> => {
  const response = await BaseApi.post('/admin/v1/fighters', data);
  return response;
}
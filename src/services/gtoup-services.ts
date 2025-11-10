import { BaseApi } from "../server"

export const getAllschedul = async (): Promise<any> => {
  const response = await BaseApi.get('/admin/v1/schedules');
  return response;
}

export const sendschedul = async (data: any): Promise<any> => {
  const response = await BaseApi.post('/admin/v1/schedules', data);
  return response;
}
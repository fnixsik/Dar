import { BaseApi } from "../server"

export const getAllNews = async (): Promise<any> =>{
  const response = await BaseApi.get('/admin/v1/news');
  return response;
}

export const sendNews = async (data: any): Promise<any> => {
  const response = await BaseApi.post('/admin/v1/news', data);
  return response;
}
import { BaseApi } from "../server"

export const getAllNews = async (): Promise<any> =>{
  const response = await BaseApi.get('/admin/v1/news');
  return response.data;
}


import { BaseApi } from "../server"

export const getAllNews = async (): Promise<any> =>{
  const response = await BaseApi.get('/admin/v1/news');
  return response.data;
}

export const sendNews = async (data: any): Promise<any> => {
  const response = await BaseApi.post('/admin/v1/news', data);
  return response;
}

export const deleteNewsId = async (id: any): Promise<any> => {
  const response = await BaseApi.delete(`/admin/v1/news/${id}`);
  return response;
}

export const updateNewsId = async (id: any, data: any): Promise<any> => {
  const response = await BaseApi.put(`/admin/v1/news/${id}`,data);
  return response;
}

export const getSoloNewsId = async (id: any): Promise<any> => {
  const response = await BaseApi.get(`/admin/v1/news/${id}`);
  return response;
}
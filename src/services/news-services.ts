import { BaseApi } from "../server"

export const getAllNews = async (): Promise<any> =>{
  const response = await BaseApi.get('/v1/News');
  return response.data;
}


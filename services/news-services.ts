import { newsApi } from "../server"

export const getAllNews = async (): Promise<any> =>{
  const response = await newsApi.get('/v1/News');
  return response.data;
}


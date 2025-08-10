import { newsApi } from "../server"

export const getAllNews = async (): Promise<any> =>{
  const response = await newsApi.get('/v1/getAllNews');
  return response!.data;
}
import { BaseApi } from "../server"

export const getAllFighters = async (): Promise<any> =>{
  const response = await BaseApi.get('/admin/v1/fighters');
  return response.data;
}
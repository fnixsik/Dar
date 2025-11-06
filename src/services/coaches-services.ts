import { BaseApi } from "../server"

export const getAllCoaches = async (): Promise<any> =>{
  const response = await BaseApi.get('/admin/v1/coaches');
  return response.data;
}
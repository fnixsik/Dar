import { BaseApi } from "../server"

export const getAllTableFan = async (): Promise<any> =>{
  const response = await BaseApi.get('/admin/v1/schedules');
  return response.data;
}
import {
  Sell as Model,
  SellCreate as ModelCreate,
  SellUpdate as ModelUpdate,
} from '@Types/index';
import { axiosInstance } from './axios';

const getAllSells = async (): Promise<Model[]> =>
    await axiosInstance.get('/sells').then((res) => res.data),
  getOneSell = async (id: string | String): Promise<Model> =>
    await axiosInstance.get(`/sell/${id}`).then((res) => res.data),
  createSell = async (postData: ModelCreate): Promise<Model> =>
    await axiosInstance.post('/sell', postData).then((res) => res.data),
  updateSell = async (
    id: string | String,
    postData: ModelUpdate,
  ): Promise<Model> =>
    await axiosInstance.put(`/sell/${id}`, postData).then((res) => res.data),
  deleteSell = async (id: string | String): Promise<Model> =>
    await axiosInstance.delete(`/sell/${id}`).then((res) => res.data);

export { getAllSells, getOneSell, createSell, updateSell, deleteSell };

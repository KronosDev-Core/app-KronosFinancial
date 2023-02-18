import {
  Buy as Model,
  BuyCreate as ModelCreate,
  BuyUpdate as ModelUpdate,
} from '@Types/index';
import { axiosInstance } from './axios';

const getAllBuys = async (): Promise<Model[]> =>
    await axiosInstance.get('/buys').then((res) => res.data),
  getOneBuy = async (id: string | String): Promise<Model> =>
    await axiosInstance.get(`/buy/${id}`).then((res) => res.data),
  createBuy = async (postData: ModelCreate): Promise<Model> =>
    await axiosInstance.post('/buy', postData).then((res) => res.data),
  updateBuy = async (
    id: string | String,
    postData: ModelUpdate,
  ): Promise<Model> =>
    await axiosInstance.put(`/buy/${id}`, postData).then((res) => res.data),
  deleteBuy = async (id: string | String): Promise<Model> =>
    await axiosInstance.delete(`/buy/${id}`).then((res) => res.data);

export { getAllBuys, getOneBuy, createBuy, updateBuy, deleteBuy };

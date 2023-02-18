import {
  Stock as Model,
  StockCreate as ModelCreate,
  StockUpdate as ModelUpdate,
} from '@Types/index';
import { axiosInstance } from './axios';

const getAllStocks = async (): Promise<Model[]> =>
    await axiosInstance.get('/stocks').then((res) => res.data),
  getOneStock = async (symbolOrId: string | String): Promise<Model> =>
    await axiosInstance.get(`/stock/${symbolOrId}`).then((res) => res.data),
  createStock = async (postData: ModelCreate): Promise<Model> =>
    await axiosInstance.post('/stock', postData).then((res) => res.data),
  updateStock = async (
    symbolOrId: string | String,
    postData: ModelUpdate,
  ): Promise<Model> =>
    await axiosInstance
      .put(`/stock/${symbolOrId}`, postData)
      .then((res) => res.data),
  deleteStock = async (symbolOrId: string | String): Promise<Model> =>
    await axiosInstance.delete(`/stock/${symbolOrId}`).then((res) => res.data);

export { getAllStocks, getOneStock, createStock, updateStock, deleteStock };

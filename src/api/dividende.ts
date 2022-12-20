import {
  Dividende as Model,
  DividendeCreate as ModelCreate,
  DividendeUpdate as ModelUpdate,
} from '@Types/index';
import axiosInstance from './Axios';

const getAllDividendes = async (): Promise<Model[]> =>
    await axiosInstance.get('/dividendes').then((res) => res.data),
  getOneDividende = async (symbolOrId: string | String): Promise<Model> =>
    await axiosInstance.get(`/dividende/${symbolOrId}`).then((res) => res.data),
  createDividende = async (postData: ModelCreate): Promise<Model> =>
    await axiosInstance.post('/dividende', postData).then((res) => res.data),
  updateDividende = async (
    symbolOrId: string | String,
    postData: ModelUpdate,
  ): Promise<Model> =>
    await axiosInstance
      .put(`/dividende/${symbolOrId}`, postData)
      .then((res) => res.data),
  deleteDividende = async (symbolOrId: string | String): Promise<Model> =>
    await axiosInstance
      .delete(`/dividende/${symbolOrId}`)
      .then((res) => res.data);

export {
  getAllDividendes,
  getOneDividende,
  createDividende,
  updateDividende,
  deleteDividende,
};

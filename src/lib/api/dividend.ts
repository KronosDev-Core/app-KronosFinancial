import {
  Dividend as Model,
  DividendCreate as ModelCreate,
  DividendUpdate as ModelUpdate,
} from '@Types/index';
import { axiosInstance } from './axios';

const getAllDividends = async ({
    pageParam,
    name,
    dateExDividend,
    strict,
  }: {
    pageParam?: string;
    name?: string;
    dateExDividend?: string;
    strict?: boolean;
  }): Promise<Model[]> =>
    await axiosInstance
      .get(
        pageParam ||
          name ||
          dateExDividend ||
          (!pageParam && !name && !dateExDividend && !strict)
          ? `/dividends?${pageParam ? `cursor=${pageParam}` : 'cursor=0'}${
              name ? `&name=${name}` : ''
            }${dateExDividend ? `&dateExDividend=${dateExDividend}` : ''}${
              strict ? `&strict=${strict}` : ''
            }`
          : '/dividends',
      )
      .then((res) => res.data),
  count = async (name?: string, dateExDividend?: string): Promise<number> =>
    await axiosInstance
      .get(
        name || dateExDividend
          ? `/dividends/count?${name ? `name=${name}` : ''}${
              dateExDividend ? '&' : ''
            }${dateExDividend ? `dateExDividend=${dateExDividend}` : ''}`
          : '/dividends/count',
      )
      .then((res) => res.data),
  getOneDividend = async (symbolOrId: string | String): Promise<Model> =>
    await axiosInstance.get(`/dividend/${symbolOrId}`).then((res) => res.data),
  createDividend = async (postData: ModelCreate): Promise<Model> =>
    await axiosInstance.post('/dividend', postData).then((res) => res.data),
  updateDividend = async (
    symbolOrId: string | String,
    postData: ModelUpdate,
  ): Promise<Model> =>
    await axiosInstance
      .put(`/dividend/${symbolOrId}`, postData)
      .then((res) => res.data),
  deleteDividend = async (symbolOrId: string | String): Promise<Model> =>
    await axiosInstance
      .delete(`/dividend/${symbolOrId}`)
      .then((res) => res.data);

export {
  getAllDividends,
  count,
  getOneDividend,
  createDividend,
  updateDividend,
  deleteDividend,
};

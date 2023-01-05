import {
  DayJs,
  Dividende as Model,
  DividendeCreate as ModelCreate,
  DividendeUpdate as ModelUpdate,
} from '@Types/index';
import axiosInstance from './Axios';

const getAllDividendes = async ({
  pageParam,
  name,
  dateExDividende,
}: {
  pageParam?: string;
  name?: string;
  dateExDividende?: string;
}): Promise<Model[]> =>
  await axiosInstance
    .get(
      pageParam ||
        name ||
        dateExDividende ||
        (!pageParam && !name && !dateExDividende)
        ? `/dividendes?${pageParam ? `cursor=${pageParam}` : 'cursor=0'}${
            name ? '&' : ''
          }${name ? `name=${name}` : ''}${dateExDividende ? '&' : ''}${
            dateExDividende ? `dateExDividende=${dateExDividende}` : ''
          }`
        : '/dividendes',
    )
    .then((res) => res.data);

const count = async (
    name?: string,
    dateExDividende?: string,
  ): Promise<number> =>
    await axiosInstance
      .get(
        name || dateExDividende
          ? `/dividendes/count?${name ? `name=${name}` : ''}${
              dateExDividende ? '&' : ''
            }${dateExDividende ? `dateExDividende=${dateExDividende}` : ''}`
          : '/dividendes/count',
      )
      .then((res) => res.data),
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
  count,
  getOneDividende,
  createDividende,
  updateDividende,
  deleteDividende,
};

import {
  Dividende as Model,
  DividendeCreate as ModelCreate,
  DividendeUpdate as ModelUpdate,
} from '../../types';

const axiosInstance = (await import('.')).default.base.axiosInstance;

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
          ? `/dividendes?${pageParam ? `cursor=${pageParam}` : 'cursor=0'}${
              name ? `&name=${name}` : ''
            }${dateExDividend ? `&dateExDividende=${dateExDividend}` : ''}${
              strict ? `&strict=${strict}` : ''
            }`
          : '/dividendes',
      )
      .then((res) => res.data),
  count = async (name?: string, dateExDividend?: string): Promise<number> =>
    await axiosInstance
      .get(
        name || dateExDividend
          ? `/dividendes/count?${name ? `name=${name}` : ''}${
              dateExDividend ? '&' : ''
            }${dateExDividend ? `dateExDividende=${dateExDividend}` : ''}`
          : '/dividendes/count',
      )
      .then((res) => res.data),
  getOneDividend = async (symbolOrId: string | String): Promise<Model> =>
    await axiosInstance.get(`/dividende/${symbolOrId}`).then((res) => res.data),
  createDividend = async (postData: ModelCreate): Promise<Model> =>
    await axiosInstance.post('/dividende', postData).then((res) => res.data),
  updateDividend = async (
    symbolOrId: string | String,
    postData: ModelUpdate,
  ): Promise<Model> =>
    await axiosInstance
      .put(`/dividende/${symbolOrId}`, postData)
      .then((res) => res.data),
  deleteDividend = async (symbolOrId: string | String): Promise<Model> =>
    await axiosInstance
      .delete(`/dividende/${symbolOrId}`)
      .then((res) => res.data);

export {
  getAllDividends,
  count,
  getOneDividend,
  createDividend,
  updateDividend,
  deleteDividend,
};

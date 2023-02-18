import { Finnhub } from './Finnhub';

export const getTrends = async (symbol: string) =>
  await Finnhub.get(`/stock/recommendation?symbol=${symbol}`).then(
    (res: { data: any; }) => res.data,
  );

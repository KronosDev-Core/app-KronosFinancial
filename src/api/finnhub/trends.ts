import Finnhub from './Finnhub';

const getTrends = async (symbol: string) =>
  await Finnhub.get(`/stock/recommendation?symbol=${symbol}`).then(
    (res) => res.data,
  );

export { getTrends };

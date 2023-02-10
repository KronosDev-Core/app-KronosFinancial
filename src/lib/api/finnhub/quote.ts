import { FinnhubQuote } from '../../../types';
import { Finnhub } from './Finnhub';

export const quote = async (symbol: string): Promise<FinnhubQuote> =>
  await Finnhub.get(`/quote?symbol=${symbol}`).then((res) => res.data);

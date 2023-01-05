import { FinnhubQuote } from '@Types/index';
import Finnhub from './Finnhub';

const quote = async (symbol: string): Promise<FinnhubQuote> =>
  await Finnhub.get(`/quote?symbol=${symbol}`).then((res) => res.data);

export { quote };

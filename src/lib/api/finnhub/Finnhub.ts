import axios from 'axios';

export const Finnhub = axios.create({
  baseURL: 'https://finnhub.io/api/v1',
  headers: {
    'X-Finnhub-Token': import.meta.env.VITE_FINNHUB_KEY,
  },
});

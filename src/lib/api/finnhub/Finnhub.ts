import axios from 'axios';

export const Finnhub = axios.create({
  baseURL: 'https://finnhub.io/api/v1',
  headers: {
    'X-Finnhub-Token': process.env.FINNHUB_KEY,
  },
});

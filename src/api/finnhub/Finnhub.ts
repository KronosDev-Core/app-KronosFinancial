import axios from "axios";


const Finnhub = axios.create({
  baseURL: 'https://finnhub.io/api/v1',
  headers: {
    'X-Finnhub-Token': process.env.FINNHUB_KEY,
  },
});

export default Finnhub;
export default {
  base: await import('./axios'),
  finnhub: await import('./finnhub'),
  buy: { ...(await import('./buy')) },
  sell: { ...(await import('./sell')) },
  dividend: { ...(await import('./dividend')) },
  stock: { ...(await import('./stock')) },
};

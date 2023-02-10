export const finnhub = {
  base: await import('./Finnhub'),
  getQuotes: (await import('./quote')).quote,
  getTrends: (await import('./trends')).getTrends,
};

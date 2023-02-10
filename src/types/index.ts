// Default
export enum Status {
  New = 'NEW',
  Updated = 'UPDATED',
  NotChanged = 'NOT_CHANGED',
}

export enum BuyStatus {
  Pending = 'PENDING',
  Buy = 'BUY',
  Sold = 'SOLD',
}

interface ID {
  id: string;
}

// Stock
export interface Stock extends ID {
  symbol: string;
  name: string;
  sector: string;
  price: number;
  status: Status;
  dividend: Dividend[];
}

export interface StockCreate
  extends Omit<Stock, 'id' | 'status' | 'dividend'> {}

export interface StockUpdate
  extends Partial<Omit<Stock, 'id' | 'symbol' | 'status' | 'dividend'>> {}

export interface Dividend extends ID {
  dateExDividend: string;
  datePayment: string;
  dividendPerShare: number;
  status: Status;
  stockSymbol: string;
  stock: Stock;
  buy: Buy[];
}

export interface DividendCreate
  extends Omit<Dividend, 'id' | 'status' | 'stock' | 'buy'> {}

export interface DividendUpdate
  extends Partial<
    Omit<Dividend, 'id' | 'status' | 'stockSymbol' | 'stock' | 'buy'>
  > {}

// Buy
export interface Buy extends ID {
  date: string;
  price: number;
  amount: number;
  dividend: Dividend;
  dividendId: string;
  sell: Sell | null;
}

export interface BuyCreate extends Omit<Buy, 'id' | 'dividend' | 'sell'> {}

export interface BuyUpdate
  extends Partial<Omit<Buy, 'id' | 'dividend' | 'sell'>> {}

// Sell
export interface Sell extends ID {
  date: string;
  price: number;
  buyId: string;
  buy: Buy;
}

export interface SellCreate extends Omit<Sell, 'id' | 'buy'> {}

export interface SellUpdate extends Partial<Omit<Sell, 'id' | 'buy'>> {}

export interface FinnhubQuote {
  c: number;
  d: number;
  dp: number;
  h: number;
  l: number;
  o: number;
  pc: number;
}

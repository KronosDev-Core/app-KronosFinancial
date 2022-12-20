/* ------------------ Rework Types for Fastify ------------------ */

// Default
export enum Status {
  'NEW',
  'UPDATED',
  'NOT_CHANGED',
}

interface ID {
  _id: String | string;
}

// Stock
export interface Stock extends ID {
  symbol: String | string;
  name: String | string;
  sector: String | string;
  price: Number | number;
  status: Status;
  dividende: Dividende | null;
  buy: Buy[] | null;
}

export interface StockCreate
  extends Omit<Stock, '_id' | 'dividende' | 'buy' | 'status'> {}

export interface StockUpdate
  extends Omit<
    Stock,
    '_id' | 'name' | 'sector' | 'price' | 'status' | 'dividende' | 'buy'
  > {
  name?: String | string;
  sector?: String | string;
  price?: Number | number;
}

// Dividende
export interface Dividende extends ID {
  dateExDividende: String | string;
  datePaiement: String | string;
  dividendePerShare: Number | number;
  status: Status;
  stockSymbol: String | string;
  stock: Stock;
}

export interface DividendeCreate
  extends Omit<Dividende, '_id' | 'status' | 'stock'> {}

export interface DividendeUpdate
  extends Omit<
    Dividende,
    | '_id'
    | 'dateExDividende'
    | 'datePaiement'
    | 'dividendePerShare'
    | 'status'
    | 'stockSymbol'
    | 'stock'
  > {
  stockSymbol?: String | string;
  dateExDividende?: String | string;
  datePaiement?: String | string;
  dividendePerShare?: Number | number;
}

// Buy
export interface Buy extends ID {
  date: String | string;
  price: Number | number;
  amount: Number | number;
  stock: Stock;
  stockSymbol: String | string;
  sell: Sell | null;
}

export interface BuyCreate extends Omit<Buy, '_id' | 'sell' | 'stock'> {}

export interface BuyUpdate
  extends Omit<Buy, 'date' | 'price' | 'amount' | 'stock' | 'sell'> {
  date?: String | string;
  price?: Number | number;
  amount?: Number | number;
  stockSymbol?: String | string;
}

// Sell
export interface Sell extends ID {
  date: String | string;
  price: Number | number;
  buyId: String | string;
  buy: Buy;
}

export interface SellCreate extends Omit<Sell, '_id' | 'buy'> {}

export interface SellUpdate
  extends Omit<Sell, '_id' | 'date' | 'price' | 'buy' | 'buyId'> {
  date?: String | string;
  price?: Number | number;
  buyId?: String | string;
}

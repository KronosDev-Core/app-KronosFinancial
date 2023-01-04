/* ------------------ Rework Types for Fastify ------------------ */

import { Dayjs } from 'dayjs';

// Default
export enum Status {
  New = 'NEW',
  Updated = 'UPDATED',
  NotChanged = 'NOT_CHANGED',
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
  dividende: Dividende[];
}

export interface StockCreate
  extends Omit<Stock, 'id' | 'status' | 'dividende'> {}

export interface StockUpdate
  extends Partial<Omit<Stock, 'id' | 'symbol' | 'status' | 'dividende'>> {}

export interface Dividende extends ID {
  dateExDividende: string;
  datePaiement: string;
  dividendePerShare: number;
  status: Status;
  stockSymbol: string;
  stock: Stock;
  buy: Buy[];
}

export interface DividendeCreate
  extends Omit<Dividende, 'id' | 'status' | 'stock' | 'buy'> {}

export interface DividendeUpdate
  extends Partial<
    Omit<Dividende, 'id' | 'status' | 'stockSymbol' | 'stock' | 'buy'>
  > {}

// Buy
export interface Buy extends ID {
  date: string;
  price: number;
  amount: number;
  dividende: Dividende;
  dividendeId: string;
  sell: Sell | null;
}

export interface BuyCreate extends Omit<Buy, 'id' | 'dividende' | 'sell'> {}

export interface BuyUpdate
  extends Partial<Omit<Buy, 'id' | 'dividende' | 'sell'>> {}

// Sell
export interface Sell extends ID {
  date: string;
  price: number;
  buyId: string;
  buy: Buy;
}

export interface SellCreate extends Omit<Sell, 'id' | 'buy'> {}

export interface SellUpdate extends Partial<Omit<Sell, 'id' | 'buy'>> {}

// each function in Dayjs is also available in DayJs and return DayJs type

export interface DayJs extends Dayjs {
  /**
   * @example
   * ```js
   * // Christmas day is a Friday
   * dayjs('2020-12-25').isBusinessDay(); // returns true
   *
   * // Boxing day is a Saturday
   * dayjs('2020-12-26').isBusinessDay(); // returns false
   * ```
   */
  isBusinessDay: () => boolean;
  /**
   * @example
   * ```js
   * dayjs('2020-12-25').businessDaysAdd(3).format('DD/MM/YYYY'); // returns 30/12/2020
   * ```
   */
  businessDaysAdd: (days: number) => DayJs;
  /**
   * @example
   * ```js
   * dayjs('2020-12-30').businessDaysSubtract(3).format('DD/MM/YYYY'); // returns 25/12/2020
   * ```
   */
  businessDaysSubtract: (days: number) => DayJs;
  /**
   * @example
   * ```js
   * dayjs('2020-12-25').businessDiff(dayjs('2020-12-30')); // returns -5
   * dayjs('2020-12-30').businessDiff(dayjs('2020-12-25')); // returns 5
   * ```
   */
  businessDiff: (date: this) => Number;
  /**
   * @example
   * ```js
   * // 25th December 2020 is a Friday. Next business day is Monday 28th December.
   * dayjs('2020-12-25').nextBusinessDay().format('DD/MM/YYYY'); // returns 28/12/2020
   *  ```
   */
  nextBusinessDay: () => DayJs;
  /**
   * @example
   * ```js
   * // // 28th December 2020 is a Monday. Previous business day is Friday 25th December.
   * dayjs('2020-12-28').prevBusinessDay().format('DD/MM/YYYY'); // returns 25/12/2020
   *  ```
   */
  prevBusinessDay: () => DayJs;
  /**
   * @example
   * ```js
   * dayjs('2020-12-25').businessDaysInMonth();
   * // returns equivalent of [dayjs('2020-12-01'), dayjs('2020-12-02'), ...]
   *  ```
   */
  businessDaysInMonth: () => DayJs[];
  /**
   * @example
   * ```js
   * dayjs('2020-12-25').businessWeeksInMonth();
   * // returns equivalent of
   * // [
   * //   [dayjs('2020-12-01'), dayjs('2020-12-02'), ...],
   * //   [dayjs('2020-12-07'), dayjs('2020-12-08'), ...],
   * //   ...
   * // ]
   *  ```
   */
  businessWeeksInMonth: () => [DayJs[]];
  /**
   * @example
   * ```js
   * // Add holidays to plugin options
   * const options = {
   *  holidays: ['2020-12-25'],
   *  holidayFormat: 'YYYY-MM-DD',
   * };
   * dayjs.extend(businessDays, options);
   *
   * // Christmas day is a Friday
   * dayjs('2020-12-25').isHoliday(); // returns true
   *  ```
   */
  isHoliday: () => [DayJs[]];

  
  add(value: number, unit?: string): DayJs;
  subtract(value: number, unit?: string): DayJs;
  startOf(unit: string): DayJs;
  endOf(unit: string): DayJs;
  format(format: string): string;
  month(): number;
  month(value: number): DayJs;
  year(): number;
  year(value: number): DayJs;
}

export interface FinnhubQuote {
  c: number;
  d: number;
  dp: number;
  h: number;
  l: number;
  o: number;
  pc: number;
}

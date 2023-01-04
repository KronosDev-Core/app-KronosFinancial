const add = (a: number | Number, b: number | Number): number =>
  ((a as number) + (b as number)) as number;

const sub = (a: number | Number, b: number | Number): number =>
  ((a as number) - (b as number)) as number;

const mul = (a: number | Number, b: number | Number): number =>
  ((a as number) * (b as number)) as number;

const div = (a: number | Number, b: number | Number): number =>
  ((a as number) / (b as number)) as number;

const dividendeFormule = (
  amount: number | Number,
  price: number | Number,
  dividendePerShare: number | Number,
): number => mul(mul(div(amount, price), dividendePerShare), 0.7) as number;

const roundUp = (value: number | Number, decimals: number | Number): number =>
  Math.ceil((value as number) * 10 ** (decimals as number)) /
  10 ** (decimals as number);

export { dividendeFormule, add, sub, mul, div, roundUp };

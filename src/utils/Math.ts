const add = (a: number | Number, b: number | Number): Number =>
  ((a as number) + (b as number)) as Number;

const sub = (a: number | Number, b: number | Number): Number =>
  ((a as number) - (b as number)) as Number;

const mul = (a: number | Number, b: number | Number): Number =>
  ((a as number) * (b as number)) as Number;

const div = (a: number | Number, b: number | Number): Number =>
  ((a as number) / (b as number)) as Number;

const dividendeFormule = (
  amount: number | Number,
  price: number | Number,
  dividendePerShare: number | Number,
): Number => mul(mul(div(amount, price), dividendePerShare), 0.7) as Number;

export { dividendeFormule, add, sub, mul, div };

const { ceil, abs, sqrt } = Math,
  add = (a: number, b: number): number => a + b,
  sub = (a: number, b: number): number => a - b,
  mul = (a: number, b: number): number => a * b,
  div = (a: number, b: number): number => a / b,
  Abs = (a: number): number => abs(a),
  Sqrt = (a: number): number => sqrt(a),
  pow = (a: number, b: number): number => a ** b,
  dividend = (
    amount: number,
    price: number,
    dividendPerShare: number,
  ): number => mul(mul(div(amount, price), dividendPerShare), 0.7),
  roundUp = (value: number, decimal: number): number =>
    ceil(mul(value, pow(10, decimal))) / pow(10, decimal);

export { add, sub, mul, div, Abs, Sqrt, pow, dividend, roundUp };

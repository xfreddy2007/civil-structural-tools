// to fix .toFixed and Math.round methods not rounding correctly, impl custom rounding
export const roundToDigit = (num:number, digit:number):number => {
  // @ts-ignore
  return +(Math.round(num + `e+${digit}`) + `e-${digit}`);
};
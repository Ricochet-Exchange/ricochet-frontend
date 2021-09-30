import web3 from './web3instance';

const zero = web3.utils.toBN(0);
const negative1 = web3.utils.toBN(-1);

function fromWei(
  weiInput: string, 
  decimals: number, 
  options: { pad?: boolean, commify?: boolean } = { pad: false, commify: false },
) {
  let wei = web3.utils.toBN(weiInput); // eslint-disable-line
  let negative = wei.lt(zero); // eslint-disable-line
  const base = web3.utils.toBN(10).pow(web3.utils.toBN(decimals));
  const baseLength = decimals;
  if (negative) {
    wei = wei.mul(negative1);
  }
  let fraction = wei.mod(base).toString(10); // eslint-disable-line
  while (fraction.length < baseLength) {
    fraction = `0${fraction}`;
  }
  if (!options.pad) {
    const fractionParts = fraction.match(/^([0-9]*[1-9]|0)(0*)/);
    if (fractionParts) fraction = fractionParts[1]; // eslint-disable-line
  }
  let whole = wei.div(base).toString(10); // eslint-disable-line
  if (options.commify) {
    whole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  let value = `${whole}${fraction == '0' ? '' : `.${fraction}`}`; // eslint-disable-line
  if (negative) {
    value = `-${value}`;
  }
  return value;
}

function trimPad(amount: string, decimals: number) {
  const [int, fract] = amount.split('.');
  let fractional = fract || '';
  fractional = fractional.slice(0, decimals);
  while (fractional.length < decimals) {
    fractional = `${fractional}0`;
  }
  const combined = [int];
  if (fractional.length > 0) {
    combined.push(fractional);
  }
  return combined.join('.');
}

export { fromWei, trimPad };

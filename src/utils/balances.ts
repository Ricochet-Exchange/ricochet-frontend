import web3 from './web3instance';

const zero = web3.utils.toBN(0);
const negative1 = web3.utils.toBN(-1);

function fromWei(
  weiInput: string, 
  decimals: number, 
  options: { pad: boolean, commify: boolean } = { pad: false, commify: false },
) {
  var wei = web3.utils.toBN(weiInput); // eslint-disable-line
  var negative = wei.lt(zero); // eslint-disable-line
  const base = web3.utils.toBN(10).pow(web3.utils.toBN(decimals));
  const baseLength = decimals;

  if (negative) {
    wei = wei.mul(negative1);
  }

  var fraction = wei.mod(base).toString(10); // eslint-disable-line

  while (fraction.length < baseLength) {
    fraction = `0${fraction}`;
  }

  if (!options.pad) {
    const fractionParts = fraction.match(/^([0-9]*[1-9]|0)(0*)/);
    if (fractionParts) fraction = fractionParts[1]; // eslint-disable-line
  }

  var whole = wei.div(base).toString(10); // eslint-disable-line

  if (options.commify) {
    whole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  var value = `${whole}${fraction == '0' ? '' : `.${fraction}`}`; // eslint-disable-line

  if (negative) {
    value = `-${value}`;
  }

  return value;
}

export { fromWei };

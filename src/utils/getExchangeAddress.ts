import {
  daixEthxExchangeAddress,
  daixMaticxExchangeAddress,
  daixMkrxExchangeAddress,
  ethxDaixExchangeAddress,
  maticxDaixExchangeAddress,
  maticxUsdcxExchangeAddress,
  mkrxDaixExchangeAddress,
  mkrxUsdcxExchangeAddress,
  usdcxEthSlpxExchangeAddress,
  usdcxIdleExchangeAddress,
  usdcxMaticxExchangeAddress,
  usdcxMkrxExchangeAddress,
  usdcxRicExchangeAddress,
  usdcxWbtcxExchangeAddress,
  usdcxWethxExchangeAddress,
  wbtcxUsdcxExchangeAddress,
  wethxUsdcxExchangeAddress,
} from 'constants/polygon_config';

export const getExchangeAddressFromKey = (exchangeKey: string) => {
  const addresses = {
    daiEth: daixEthxExchangeAddress,
    daiMatic: daixMaticxExchangeAddress,
    daiMkr: daixMkrxExchangeAddress,
    ethDai: ethxDaixExchangeAddress,
    maticDai: maticxDaixExchangeAddress,
    maticUsdc: maticxUsdcxExchangeAddress,
    mkrDai: mkrxDaixExchangeAddress,
    mkrUsdc: mkrxUsdcxExchangeAddress,
    usdcEthSlp: usdcxEthSlpxExchangeAddress,
    usdcIdle: usdcxIdleExchangeAddress,
    usdcMatic: usdcxMaticxExchangeAddress,
    usdcMkr: usdcxMkrxExchangeAddress,
    usdcRic: usdcxRicExchangeAddress,
    usdcWbtc: usdcxWbtcxExchangeAddress,
    usdcWeth: usdcxWethxExchangeAddress,
    wbtcUsdc: wbtcxUsdcxExchangeAddress,
    wethUsdc: wethxUsdcxExchangeAddress,
  };

  return addresses[exchangeKey];
};

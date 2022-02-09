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
    daiEthExchangeAddress: daixEthxExchangeAddress,
    daiMaticExchangeAddress: daixMaticxExchangeAddress,
    daiMkrExchangeAddress: daixMkrxExchangeAddress,
    ethDaiExchangeAddress: ethxDaixExchangeAddress,
    maticDaiExchangeAddress: maticxDaixExchangeAddress,
    maticUsdcExchangeAddress: maticxUsdcxExchangeAddress,
    mkrDaiExchangeAddress: mkrxDaixExchangeAddress,
    mkrUsdcExchangeAddress: mkrxUsdcxExchangeAddress,
    usdcEthSlpExchangeAddress: usdcxEthSlpxExchangeAddress,
    usdcIdleExchangeAddress: usdcxIdleExchangeAddress,
    usdcMaticExchangeAddress: usdcxMaticxExchangeAddress,
    usdcMkrExchangeAddress: usdcxMkrxExchangeAddress,
    usdcRicEchangeAddress: usdcxRicExchangeAddress,
    usdcWbtcExchangeAddress: usdcxWbtcxExchangeAddress,
    usdcWethExchangeAddress: usdcxWethxExchangeAddress,
    wbtcUsdcExchangeAddress: wbtcxUsdcxExchangeAddress,
    wethUsdcExchangeAddress: wethxUsdcxExchangeAddress,
  };

  return addresses[exchangeKey];
};

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

export enum ExchangeKeys {
  'DAI_ETH' = 'daiEth',
  'DAI_MATIC' = 'daiMatic',
  'DAI_MKR' = 'daiMkr',
  'ETH_DAI' = 'ethDai',
  'MATIC_DAI' = 'maticDai',
  'MATIC_USDC' = 'maticUsdc',
  'MKR_DAI' = 'mkrDai',
  'MKR_USDC' = 'mkrUsdc',
  'USDC_ETH_SLP' = 'usdcEthSlp',
  'USDC_IDLE' = 'usdcIdle',
  'USDC_MATIC' = 'usdcMatic',
  'USDC_MKR' = 'usdcMkr',
  'USDC_RIC' = 'usdcRic',
  'USDC_WBTC' = 'usdcWbtc',
  'USDC_WETH' = 'usdcWeth',
  'WBTC_USDC' = 'wbtcUsdc',
  'WETH_USDC' = 'wethUsdc',
}

export const getExchangeAddressFromKey = (exchangeKey: ExchangeKeys) => {
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

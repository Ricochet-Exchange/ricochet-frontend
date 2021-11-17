import wbtc from '../assets/images/coins/bitcoin.svg';
import btc from '../assets/images/coins/bitcoinRotate.svg';
import eth from '../assets/images/coins/ethereum.svg';
import shib from '../assets/images/coins/shibaInu.svg';
import usdt from '../assets/images/coins/tetherUsdt.svg';
import usdc from '../assets/images/coins/usdCoin.svg';
import dai from '../assets/images/coins/dai.svg';
import wmatic from '../assets/images/coins/matic.svg';
import mkr from '../assets/images/coins/mkr.svg';
import ric from '../assets/images/coins/ric.svg';
import sushi from '../assets/images/coins/sushiswap.svg';
import slp from '../assets/images/coins/slp.svg';

export enum Coin {
  WBTC = 'WBTC',
  BTC = 'BTC',
  ETH = 'ETH',
  SHIB = 'SHIB',
  USDT = 'USDT',
  USDC = 'USDC',
  DAI = 'DAI',
  WMATIC = 'WMATIC',
  MKR = 'MKR',
  RIC = 'RIC',
  WETH = 'ETH',
  SLP = 'USDC-ETH',
  USDCx = 'USDCx',
  DAIx = 'DAIx',
  MKRx = 'MKRx',
  WETHx = 'WETHx',
  WBTCx = 'WBTCx',
  rexSLP = 'USDC/ETH',
  SUSHI = 'SUSHI',
  WMATICx = 'WMATICx',
  SUSHIx = 'SUSHIx',
}

export const namesCoin = [
  Coin.USDC,
  Coin.DAI,
  Coin.MKR,
  Coin.WETH,
  Coin.WBTC,
  Coin.SLP,
  Coin.WMATIC,
  Coin.SUSHI,
];

export const namesCoinX = [
  Coin.DAIx,
  Coin.MKRx,
  Coin.USDCx,
  Coin.WBTCx,
  Coin.WETHx,
  Coin.rexSLP,
  Coin.WMATICx,
  Coin.SUSHIx,
];

export const iconsCoin: Partial<Record<Coin, string>> = {
  [Coin.USDC]: usdc,
  [Coin.WBTC]: wbtc,
  [Coin.ETH]: eth,
  [Coin.USDT]: usdt,
  [Coin.SHIB]: shib,
  [Coin.BTC]: btc,
  [Coin.DAI]: dai,
  [Coin.WMATIC]: wmatic,
  [Coin.MKR]: mkr,
  [Coin.RIC]: ric,
  [Coin.WETH]: eth,
  [Coin.SLP]: ric,
  [Coin.DAIx]: dai,
  [Coin.MKRx]: mkr,
  [Coin.USDCx]: usdc,
  [Coin.WBTCx]: wbtc,
  [Coin.WETHx]: eth,
  [Coin.rexSLP]: slp,
  [Coin.SUSHI]: sushi,
  [Coin.WMATICx]: wmatic,
  [Coin.SUSHIx]: sushi,
};

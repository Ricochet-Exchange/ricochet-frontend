import { Coin } from './coins';
import {
  DAIAddress,
  USDCAddress,
  MKRAddress,
  WETHAddress,
  USDCxAddress,
  DAIxAddress,
  MKRxAddress,
  WETHxAddress,
  WBTCxAddress,
  WBTCAddress,
} from './polygon_config';

export const upgradeTokensList:{  
  coin: Coin,
  tokenAddress: string,
  superTokenAddress: string,
  multi: number,
  key: 'hasWethApprove' | 'hasUsdcApprove' | 'hasWbtcApprove' | 'hasDaiApprove' | 'hasMkrApprove',
}[] = [
  {
    coin: Coin.USDC,
    tokenAddress: USDCAddress,
    superTokenAddress: USDCxAddress,
    multi: 1e6,
    key: 'hasUsdcApprove',
  },
  {
    coin: Coin.DAI,
    tokenAddress: DAIAddress,
    superTokenAddress: DAIxAddress,
    multi: 1e18,
    key: 'hasDaiApprove',
  },
  {
    coin: Coin.MKR,
    tokenAddress: MKRAddress,
    superTokenAddress: MKRxAddress,
    multi: 1e18,
    key: 'hasMkrApprove',
  },
  {
    coin: Coin.WETH,
    tokenAddress: WETHAddress,
    superTokenAddress: WETHxAddress,
    multi: 1e18,
    key: 'hasWethApprove',
  },
  {
    coin: Coin.WBTC,
    tokenAddress: WBTCAddress,
    superTokenAddress: WBTCxAddress,
    multi: 1e8,
    key: 'hasWbtcApprove',
  },
];

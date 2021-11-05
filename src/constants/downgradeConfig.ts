import { Coin } from './coins';
import {
  USDCxAddress, 
  WETHxAddress,
  DAIxAddress,
  MKRxAddress,
  WBTCxAddress,
  WMATICxAddress,
  SUSHIxAddress,
} from './polygon_config';

export const downgradeTokensList = [
  {
    coin: Coin.USDCx,
    tokenAddress: USDCxAddress,
  },
  {
    coin: Coin.DAIx,
    tokenAddress: DAIxAddress,
  },
  {
    coin: Coin.MKRx,
    tokenAddress: MKRxAddress,
  },
  {
    coin: Coin.WETHx,
    tokenAddress: WETHxAddress,
  },
  {
    coin: Coin.WBTCx,
    tokenAddress: WBTCxAddress,
  },
  {
    coin: Coin.WMATICx,
    tokenAddress: WMATICxAddress,
  },
  {
    coin: Coin.SUSHIx,
    tokenAddress: SUSHIxAddress,
  },
];

import { Coin } from './coins';
import {
  DAIxAddress,
  USDCxAddress,
  WETHxAddress,
  MKRxAddress,
  WBTCxAddress,
  MATICxAddress,
  SUSHIxAddress,
  IDLExAddress,
  RICAddress,
} from './polygon_config';

export const swapTokensList:{
  coin: Coin,
  superTokenAddress: string,
  multi: number,
  key: 'hasWethxApprove' | 'hasUsdcxApprove' | 'hasWbtcxApprove' | 'hasDaixApprove' | 'hasMkrxApprove' | 'hasMaticxApprove' | 'hasSushixApprove' | 'hasIdlexApprove',
}[] = [
  {
    coin: Coin.RIC,
    superTokenAddress: RICAddress,
    multi: 1e6,
    key: 'hasUsdcxApprove',
  },
  {
    coin: Coin.USDCx,
    superTokenAddress: USDCxAddress,
    multi: 1e6,
    key: 'hasUsdcxApprove',
  },
  {
    coin: Coin.DAIx,
    superTokenAddress: DAIxAddress,
    multi: 1e18,
    key: 'hasDaixApprove',
  },
  {
    coin: Coin.MKRx,
    superTokenAddress: MKRxAddress,
    multi: 1e18,
    key: 'hasMkrxApprove',
  },
  {
    coin: Coin.WETHx,
    superTokenAddress: WETHxAddress,
    multi: 1e18,
    key: 'hasWethxApprove',
  },
  {
    coin: Coin.WBTCx,
    superTokenAddress: WBTCxAddress,
    multi: 1e8,
    key: 'hasWbtcxApprove',
  },
  {
    coin: Coin.MATICx,
    superTokenAddress: MATICxAddress,
    multi: 1e18,
    key: 'hasMaticxApprove',
  },
  {
    coin: Coin.SUSHIx,
    superTokenAddress: SUSHIxAddress,
    multi: 1e18,
    key: 'hasSushixApprove',
  },
  {
    coin: Coin.IDLEx,
    superTokenAddress: IDLExAddress,
    multi: 1e18,
    key: 'hasIdlexApprove',
  },
];

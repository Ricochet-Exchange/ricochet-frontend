import { Routes } from 'constants/routes';
import { Coin } from './coins';
import {
  USDCxAddress,
  WETHxAddress,
  RICAddress,
  usdcxRicExchangeAddress,
  twoWayMarketAddress,
} from './polygon_config';

export enum FlowEnum {
  usdcWethFlowQuery = 'usdcWethFlowQuery',
  wethUsdcFlowQuery = 'wethUsdcFlowQuery',
  // usdcRicFlowQuery = 'usdcRicFlowQuery',
}

export enum FlowTypes {
  launchpad = 'launchpad',
  market = 'market',
}

export type InvestmentFlow = {
  superToken: string,
  tokenA: string,
  tokenB: string,
  coinA: Coin,
  coinB: Coin,
  flowKey: FlowEnum,
  type: FlowTypes,
};

const markets: InvestmentFlow[] = [
  {
    superToken: twoWayMarketAddress,
    tokenA: USDCxAddress,
    tokenB: WETHxAddress,
    coinA: Coin.USDC,
    coinB: Coin.WETH,
    flowKey: FlowEnum.usdcWethFlowQuery,
    type: FlowTypes.market,
  },
  {
    superToken: twoWayMarketAddress,
    tokenA: WETHxAddress,
    tokenB: USDCxAddress,
    coinA: Coin.WETH,
    coinB: Coin.USDC,
    flowKey: FlowEnum.wethUsdcFlowQuery,
    type: FlowTypes.market,
  },

];

const liquidityMarkets: InvestmentFlow[] = [
  // {
  //   superToken: usdcxEthSlpxExchangeAddress,
  //   tokenA: USDCxAddress,
  //   tokenB: rexLPETHAddress,
  //   coinA: Coin.USDC,
  //   coinB: Coin.SLP,
  //   flowKey: FlowEnum.usdcSlpEthFlowQuery,
  //   type: FlowTypes.sushiLP,
  // },
];

const launchpads: InvestmentFlow[] = [
  {
    superToken: usdcxRicExchangeAddress,
    tokenA: USDCxAddress,
    tokenB: RICAddress,
    coinA: Coin.USDC,
    coinB: Coin.RIC,
    flowKey: FlowEnum.usdcRicFlowQuery,
    type: FlowTypes.launchpad,
  },
];

export const RoutesToFlowTypes = {
  [<string>Routes.Invest]: FlowTypes.market,
  [<string>Routes.InvestLiquidityMarkets]: FlowTypes.sushiLP,
  [<string>Routes.InvestLaunchpads]: FlowTypes.launchpad,
};

export const flowConfig: InvestmentFlow[] = [
  ...markets,
  ...liquidityMarkets,
  ...launchpads,
];

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
  usdcRicFlowQuery = 'usdcRicFlowQuery',
}
// eslint-disable-next-line max-len
export const indexIDA : { input: string, output:string, subsidy?: string, subsidyIndex?: number, inputIndex: number, outputIndex: number }[] = [
  {
    input: USDCxAddress,
    output: WETHxAddress,
    subsidy: RICAddress,
    subsidyIndex: 2,
    inputIndex: 0,
    outputIndex: 1, 
  },
  {
    input: WETHxAddress,
    output: USDCxAddress,
    subsidy: RICAddress, 
    subsidyIndex: 3,
    inputIndex: 1,
    outputIndex: 0, 
  },
];

export enum FlowTypes {
  launchpad = 'launchpad',
  market = 'market',
  sushiLP = 'sushiLP',
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
    flowKey: FlowEnum.usdcWethFlowQuery,
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

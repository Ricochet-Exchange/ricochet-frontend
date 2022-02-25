import { Routes } from 'constants/routes';
import { Coin } from './coins';
import {
  RICAddress,
  twoWayWETHMarketAddress,
  twoWayMarketWBTCAddress,
  USDCxAddress,
  usdcxRicExchangeAddress,
  WBTCxAddress,
  WETHxAddress,
} from './polygon_config';

export enum FlowEnum {
  twoWayusdcWethFlowQuery = 'twoWayusdcWethFlowQuery',
  twoWaywethUsdcFlowQuery = 'twoWaywethUsdcFlowQuery',
  twoWaywbtcUsdcFlowQuery = 'twoWaywbtcUsdcFlowQuery',
  twoWayusdcWbtcFlowQuery = 'twoWayusdcWbtcFlowQuery',
  usdcRicFlowQuery = 'usdcRicFlowQuery',
}
// eslint-disable-next-line max-len
export const indexIDA : { input: string, output:string, subsidy?: string, subsidyIndex?: number, inputIndex: number, outputIndex: number }[] = [
  {
    input: USDCxAddress,
    output: WETHxAddress,
    subsidy: RICAddress,
    subsidyIndex: 3,
    inputIndex: 0,
    outputIndex: 1, 
  },
  {
    input: WETHxAddress,
    output: USDCxAddress,
    subsidy: RICAddress, 
    subsidyIndex: 2,
    inputIndex: 1,
    outputIndex: 0, 
  },
  {
    input: WBTCxAddress,
    output: USDCxAddress,
    subsidy: RICAddress, 
    subsidyIndex: 2,
    inputIndex: 1,
    outputIndex: 0, 
  },
  {
    input: USDCxAddress,
    output: WBTCxAddress,
    subsidy: RICAddress, 
    subsidyIndex: 3,
    inputIndex: 0,
    outputIndex: 1, 
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
    superToken: twoWayWETHMarketAddress,
    tokenA: USDCxAddress,
    tokenB: WETHxAddress,
    coinA: Coin.USDC,
    coinB: Coin.WETH,
    flowKey: FlowEnum.twoWayusdcWethFlowQuery,
    type: FlowTypes.market,
  },
  {
    superToken: twoWayWETHMarketAddress,
    tokenA: WETHxAddress,
    tokenB: USDCxAddress,
    coinA: Coin.WETH,
    coinB: Coin.USDC,
    flowKey: FlowEnum.twoWaywethUsdcFlowQuery,
    type: FlowTypes.market,
  },
  {
    superToken: twoWayMarketWBTCAddress,
    tokenA: WBTCxAddress,
    tokenB: USDCxAddress,
    coinA: Coin.WBTC,
    coinB: Coin.USDC,
    flowKey: FlowEnum.twoWaywbtcUsdcFlowQuery,
    type: FlowTypes.market,
  },
  {
    superToken: twoWayMarketWBTCAddress,
    tokenA: USDCxAddress,
    tokenB: WBTCxAddress,
    coinA: Coin.USDC,
    coinB: Coin.WBTC,
    flowKey: FlowEnum.twoWayusdcWbtcFlowQuery,
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
  // [<string>Routes.InvestLiquidityMarkets]: FlowTypes.sushiLP,
  [<string>Routes.InvestLaunchpads]: FlowTypes.launchpad,
};

export const flowConfig: InvestmentFlow[] = [
  ...markets,
  ...liquidityMarkets,
  ...launchpads,
];

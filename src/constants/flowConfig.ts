import { Routes } from 'constants/routes';
import { Coin } from './coins';
import {
  USDCxAddress,
  usdcxWethxExchangeAddress,
  WETHxAddress,
  usdcxRicExchangeAddress,
  RICAddress,
  WBTCxAddress,
  usdcxWbtcxExchangeAddress,
  wethxUsdcxExchangeAddress,
  wbtcxUsdcxExchangeAddress,
  daixMkrxExchangeAddress,
  DAIxAddress,
  MKRxAddress,
  mkrxDaixExchangeAddress,
  usdcxMkrxExchangeAddress,
  mkrxUsdcxExchangeAddress,
  daixEthxExchangeAddress,
  ethxDaixExchangeAddress,
  daixMaticxExchangeAddress,
  MATICxAddress,
  IDLExAddress,
  maticxDaixExchangeAddress,
  usdcxMaticxExchangeAddress,
  maticxUsdcxExchangeAddress,
  usdcxIdleExchangeAddress,
  usdcxEthSlpxExchangeAddress,
<<<<<<< HEAD
  usdcxIdleSlpxExchangeAddress,
  rexLPETHAddress,
  rexLPIDLEAddress,
=======
  rexLPETHAddress,
>>>>>>> main
} from './polygon_config';

export enum FlowEnum {
  usdcWethFlowQuery = 'usdcWethFlowQuery',
  daiMkrFlowQuery = 'daiMkrFlowQuery',
  mkrDaiFlowQuery = 'mkrDaiFlowQuery',
  usdcMkrFlowQuery = 'usdcMkrFlowQuery',
  mkrUsdcFlowQuery = 'mkrUsdcFlowQuery',
  daiMaticFlowQuery = 'daiMaticFlowQuery',
  maticDaiFlowQuery = 'maticDaiFlowQuery',
  usdcMaticFlowQuery = 'usdcMaticFlowQuery',
  maticUsdcFlowQuery = 'maticUsdcFlowQuery',
  daiEthFlowQuery = 'daiEthFlowQuery',
  ethDaiFlowQuery = 'ethDaiFlowQuery',
  usdcWbtcFlowQuery = 'usdcWbtcFlowQuery',
  wethUsdcFlowQuery = 'wethUsdcFlowQuery',
  wbtcUsdcFlowQuery = 'wbtcUsdcFlowQuery',
  usdcRicFlowQuery = 'usdcRicFlowQuery',
  usdcSlpEthFlowQuery = 'usdcSlpEthFlowQuery',
<<<<<<< HEAD
  usdcSlpIdleFlowQuery = 'usdcSlpIdleFlowQuery',
=======
>>>>>>> main
  usdcIdleFlowQuery = 'usdcIdleFlowQuery',
}

export enum FlowTypes {
  launchpad = 'launchpad',
  sushiLP = 'sushiLP',
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
    superToken: usdcxIdleExchangeAddress,
    tokenA: USDCxAddress,
    tokenB: IDLExAddress,
    coinA: Coin.USDC,
    coinB: Coin.IDLE,
    flowKey: FlowEnum.usdcIdleFlowQuery,
    type: FlowTypes.market,
  },
  {
    superToken: usdcxWethxExchangeAddress,
    tokenA: USDCxAddress,
    tokenB: WETHxAddress,
    coinA: Coin.USDC,
    coinB: Coin.WETH,
    flowKey: FlowEnum.usdcWethFlowQuery,
    type: FlowTypes.market,
  },
  {
    superToken: usdcxWbtcxExchangeAddress,
    tokenA: USDCxAddress,
    tokenB: WBTCxAddress,
    coinA: Coin.USDC,
    coinB: Coin.WBTC,
    flowKey: FlowEnum.usdcWbtcFlowQuery,
    type: FlowTypes.market,
  },
  {
    superToken: wethxUsdcxExchangeAddress,
    tokenA: WETHxAddress,
    tokenB: USDCxAddress,
    coinA: Coin.WETH,
    coinB: Coin.USDC,
    flowKey: FlowEnum.wethUsdcFlowQuery,
    type: FlowTypes.market,
  },
  {
    superToken: wbtcxUsdcxExchangeAddress,
    tokenA: WBTCxAddress,
    tokenB: USDCxAddress,
    coinA: Coin.WBTC,
    coinB: Coin.USDC,
    flowKey: FlowEnum.wbtcUsdcFlowQuery,
    type: FlowTypes.market,
  },
  {
    superToken: daixMkrxExchangeAddress,
    tokenA: DAIxAddress,
    tokenB: MKRxAddress,
    coinA: Coin.DAI,
    coinB: Coin.MKR,
    flowKey: FlowEnum.daiMkrFlowQuery,
    type: FlowTypes.market,
  },
  {
    superToken: mkrxDaixExchangeAddress,
    tokenA: MKRxAddress,
    tokenB: DAIxAddress,
    coinA: Coin.MKR,
    coinB: Coin.DAI,
    flowKey: FlowEnum.mkrDaiFlowQuery,
    type: FlowTypes.market,
  },
  {
    superToken: usdcxMkrxExchangeAddress,
    tokenA: USDCxAddress,
    tokenB: MKRxAddress,
    coinA: Coin.USDC,
    coinB: Coin.MKR,
    flowKey: FlowEnum.usdcMkrFlowQuery,
    type: FlowTypes.market,
  },
  {
    superToken: mkrxUsdcxExchangeAddress,
    tokenA: MKRxAddress,
    tokenB: USDCxAddress,
    coinA: Coin.MKR,
    coinB: Coin.USDC,
    flowKey: FlowEnum.mkrUsdcFlowQuery,
    type: FlowTypes.market,
  },
  {
    superToken: daixEthxExchangeAddress,
    tokenA: DAIxAddress,
    tokenB: WETHxAddress,
    coinA: Coin.DAI,
    coinB: Coin.ETH,
    flowKey: FlowEnum.daiEthFlowQuery,
    type: FlowTypes.market,
  },
  {
    superToken: ethxDaixExchangeAddress,
    tokenA: WETHxAddress,
    tokenB: DAIxAddress,
    coinA: Coin.ETH,
    coinB: Coin.DAI,
    flowKey: FlowEnum.ethDaiFlowQuery,
    type: FlowTypes.market,
  },
  {
    superToken: daixMaticxExchangeAddress,
    tokenA: DAIxAddress,
    tokenB: MATICxAddress,
    coinA: Coin.DAI,
    coinB: Coin.MATIC,
    flowKey: FlowEnum.daiMaticFlowQuery,
    type: FlowTypes.market,
  },
  {
    superToken: maticxDaixExchangeAddress,
    tokenA: MATICxAddress,
    tokenB: DAIxAddress,
    coinA: Coin.MATIC,
    coinB: Coin.DAI,
    flowKey: FlowEnum.maticDaiFlowQuery,
    type: FlowTypes.market,
  },
  {
    superToken: usdcxMaticxExchangeAddress,
    tokenA: USDCxAddress,
    tokenB: MATICxAddress,
    coinA: Coin.USDC,
    coinB: Coin.MATIC,
    flowKey: FlowEnum.usdcMaticFlowQuery,
    type: FlowTypes.market,
  },
  {
    superToken: maticxUsdcxExchangeAddress,
    tokenA: MATICxAddress,
    tokenB: USDCxAddress,
    coinA: Coin.MATIC,
    coinB: Coin.USDC,
    flowKey: FlowEnum.maticUsdcFlowQuery,
    type: FlowTypes.market,
  },
  {
    superToken: usdcxIdleSlpxExchangeAddress,
    tokenA: USDCxAddress,
    tokenB: rexLPIDLEAddress,
    coinA: Coin.USDC,
    coinB: Coin.rexLPIdle,
    flowKey: FlowEnum.usdcSlpIdleFlowQuery,
    type: FlowTypes.sushiLP,
  },
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

const liquidityMarkets: InvestmentFlow[] = [
  {
    superToken: usdcxEthSlpxExchangeAddress,
    tokenA: USDCxAddress,
    tokenB: rexLPETHAddress,
    coinA: Coin.USDC,
    coinB: Coin.SLP,
    flowKey: FlowEnum.usdcSlpEthFlowQuery,
    type: FlowTypes.sushiLP,
  },
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

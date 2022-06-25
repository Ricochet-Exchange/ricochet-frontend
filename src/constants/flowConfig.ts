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
	twoWayMarketDAIWETHAddress,
	DAIxAddress,
	twoWayMarketRICUSDCAddress,
	MATICxAddress,
	twoWayMarketMATICUSDCAddress,
	twoWayMarketMATICDAIAddress,
	twoWayMarketWBTCDAIAddress,
} from './polygon_config';

export enum FlowEnum {
	twoWayusdcWethFlowQuery = 'twoWayusdcWethFlowQuery',
	twoWaywethUsdcFlowQuery = 'twoWaywethUsdcFlowQuery',
	twoWaywbtcUsdcFlowQuery = 'twoWaywbtcUsdcFlowQuery',
	twoWayusdcWbtcFlowQuery = 'twoWayusdcWbtcFlowQuery',
	twoWayWethDaiFlowQuery = 'twoWayWethDaiFlowQuery',
	twoWayDaiWethFlowQuery = 'twoWayDaiWethFlowQuery',
	twoWayRicUsdcFlowQuery = 'twoWayRicUsdcFlowQuery',
	twoWayUsdcRicFlowQuery = 'twoWayUsdcRicFlowQuery',
	twoWayMaticUsdcFlowQuery = 'twoWayMaticUsdcFlowQuery',
	twoWayUsdcMaticFlowQuery = 'twoWayUsdcMaticFlowQuery',
	twoWayMaticDaiFlowQuery = 'twoWayMaticDaiFlowQuery',
	twoWayDaiMaticFlowQuery = 'twoWayDaiMaticFlowQuery',
	twoWayWbtcDaiFlowQuery = 'twoWayWbtcDaiFlowQuery',
	twoWayDaiWbtcFlowQuery = 'twoWayDaiWbtcFlowQuery',
	usdcRicFlowQuery = 'usdcRicFlowQuery',
}

enum POOLS {
	'SUSHISWAP',
	'QUICKSWAP',
}

type IndexIDAType = {
	exchangeAddress: string;
	input: string;
	output: string;
	subsidy?: string;
	subsidyIndex?: number;
	inputIndex: number;
	outputIndex: number;
	// from superfluid subgraph
	superToken: {
		tokenA: string;
		tokenB: string;
	};
	// from liquidity pool
	wrappedToken: {
		tokenA: string;
		tokenB: string;
	};
	pool: {
		type: POOLS;
		id: string;
	};
}[];

export const indexIDA: IndexIDAType = [
	{
		exchangeAddress: twoWayWETHMarketAddress,
		input: USDCxAddress,
		output: WETHxAddress,
		subsidy: RICAddress,
		subsidyIndex: 3,
		inputIndex: 0,
		outputIndex: 1,
		superToken: {
			tokenA: 'USDCx',
			tokenB: 'ETHx',
		},
		wrappedToken: {
			tokenA: 'USDC',
			tokenB: 'WETH',
		},
		pool: {
			type: POOLS.SUSHISWAP,
			id: '0x34965ba0ac2451A34a0471F04CCa3F990b8dea27',
		},
	},
	{
		exchangeAddress: twoWayWETHMarketAddress,
		input: WETHxAddress,
		output: USDCxAddress,
		subsidy: RICAddress,
		subsidyIndex: 2,
		inputIndex: 1,
		outputIndex: 0,
		superToken: {
			tokenA: 'ETHx',
			tokenB: 'USDCx',
		},
		wrappedToken: {
			tokenA: 'WETH',
			tokenB: 'USDC',
		},
		pool: {
			type: POOLS.SUSHISWAP,
			id: '0x34965ba0ac2451A34a0471F04CCa3F990b8dea27',
		},
	},
	{
		exchangeAddress: twoWayMarketWBTCAddress,
		input: USDCxAddress,
		output: WBTCxAddress,
		subsidy: RICAddress,
		subsidyIndex: 3,
		inputIndex: 0,
		outputIndex: 1,
		superToken: {
			tokenA: 'USDCx',
			tokenB: 'WBTCx',
		},
		wrappedToken: {
			tokenA: 'USDC',
			tokenB: 'WBTC',
		},
		pool: {
			type: POOLS.QUICKSWAP,
			id: '0xf6a637525402643b0654a54bead2cb9a83c8b498',
		},
	},
	{
		exchangeAddress: twoWayMarketWBTCAddress,
		input: WBTCxAddress,
		output: USDCxAddress,
		subsidy: RICAddress,
		subsidyIndex: 2,
		inputIndex: 1,
		outputIndex: 0,
		superToken: {
			tokenA: 'WBTCx',
			tokenB: 'USDCx',
		},
		wrappedToken: {
			tokenA: 'WBTC',
			tokenB: 'USDC',
		},
		pool: {
			type: POOLS.QUICKSWAP,
			id: '0xf6a637525402643b0654a54bead2cb9a83c8b498',
		},
	},
	{
		exchangeAddress: twoWayMarketDAIWETHAddress,
		input: DAIxAddress,
		output: WETHxAddress,
		subsidy: RICAddress,
		subsidyIndex: 3,
		inputIndex: 0,
		outputIndex: 1,
		superToken: {
			tokenA: 'DAIx',
			tokenB: 'ETHx',
		},
		wrappedToken: {
			tokenA: 'DAI',
			tokenB: 'ETH',
		},
		pool: {
			type: POOLS.SUSHISWAP,
			id: '0x6FF62bfb8c12109E8000935A6De54daD83a4f39f',
		},
	},
	{
		exchangeAddress: twoWayMarketDAIWETHAddress,
		input: WETHxAddress,
		output: DAIxAddress,
		subsidy: RICAddress,
		subsidyIndex: 2,
		inputIndex: 1,
		outputIndex: 0,
		superToken: {
			tokenA: 'ETHx',
			tokenB: 'DAIx',
		},
		wrappedToken: {
			tokenA: 'ETH',
			tokenB: 'DAI',
		},
		pool: {
			type: POOLS.SUSHISWAP,
			id: '0x6FF62bfb8c12109E8000935A6De54daD83a4f39f',
		},
	},
	{
		exchangeAddress: twoWayMarketRICUSDCAddress,
		input: RICAddress,
		output: USDCxAddress,
		subsidy: WETHxAddress,
		subsidyIndex: 2,
		inputIndex: 1,
		outputIndex: 0,
		superToken: {
			tokenA: 'RIC',
			tokenB: 'USDCx',
		},
		wrappedToken: {
			tokenA: 'RIC',
			tokenB: 'USDC',
		},
		pool: {
			type: POOLS.SUSHISWAP,
			id: '0xDBF5d66d77a83B96763c965D193D0fdD1f8A184B',
		},
	},
	{
		exchangeAddress: twoWayMarketRICUSDCAddress,
		input: USDCxAddress,
		output: RICAddress,
		subsidy: WETHxAddress,
		subsidyIndex: 3,
		inputIndex: 0,
		outputIndex: 1,
		superToken: {
			tokenA: 'USDCx',
			tokenB: 'RIC',
		},
		wrappedToken: {
			tokenA: 'USDC',
			tokenB: 'RIC',
		},
		pool: {
			type: POOLS.SUSHISWAP,
			id: '0xDBF5d66d77a83B96763c965D193D0fdD1f8A184B',
		},
	},
	{
		exchangeAddress: twoWayMarketMATICUSDCAddress,
		input: MATICxAddress,
		output: USDCxAddress,
		subsidy: RICAddress,
		subsidyIndex: 2,
		inputIndex: 1,
		outputIndex: 0,
		superToken: {
			tokenA: 'MATICx',
			tokenB: 'USDCx',
		},
		wrappedToken: {
			tokenA: 'WMATIC',
			tokenB: 'USDC',
		},
		pool: {
			type: POOLS.QUICKSWAP,
			id: '0x6e7a5FAFcec6BB1e78bAE2A1F0B612012BF14827',
		},
	},
	{
		exchangeAddress: twoWayMarketMATICUSDCAddress,
		input: USDCxAddress,
		output: MATICxAddress,
		subsidy: RICAddress,
		subsidyIndex: 3,
		inputIndex: 0,
		outputIndex: 1,
		superToken: {
			tokenA: 'USDCx',
			tokenB: 'MATICx',
		},
		wrappedToken: {
			tokenA: 'USDC',
			tokenB: 'WMATIC',
		},
		pool: {
			type: POOLS.QUICKSWAP,
			id: '0x6e7a5FAFcec6BB1e78bAE2A1F0B612012BF14827',
		},
	},
	{
		exchangeAddress: twoWayMarketMATICDAIAddress,
		input: MATICxAddress,
		output: DAIxAddress,
		subsidy: RICAddress,
		subsidyIndex: 2,
		inputIndex: 1,
		outputIndex: 0,
		superToken: {
			tokenA: 'MATICx',
			tokenB: 'DAIx',
		},
		wrappedToken: {
			tokenA: 'WMATIC',
			tokenB: 'DAI',
		},
		pool: {
			type: POOLS.QUICKSWAP,
			id: '0xEEf611894CeaE652979C9D0DaE1dEb597790C6eE',
		},
	},
	{
		exchangeAddress: twoWayMarketMATICDAIAddress,
		input: DAIxAddress,
		output: MATICxAddress,
		subsidy: RICAddress,
		subsidyIndex: 3,
		inputIndex: 0,
		outputIndex: 1,
		superToken: {
			tokenA: 'DAIx',
			tokenB: 'MATICx',
		},
		wrappedToken: {
			tokenA: 'DAI',
			tokenB: 'WMATIC',
		},
		pool: {
			type: POOLS.QUICKSWAP,
			id: '0xEEf611894CeaE652979C9D0DaE1dEb597790C6eE',
		},
	},
	{
		exchangeAddress: twoWayMarketWBTCDAIAddress,
		input: WBTCxAddress,
		output: DAIxAddress,
		subsidy: RICAddress,
		subsidyIndex: 2,
		inputIndex: 1,
		outputIndex: 0,
		superToken: {
			tokenA: 'WBTCx',
			tokenB: 'DAIx',
		},
		wrappedToken: {
			tokenA: 'WBTC',
			tokenB: 'DAI',
		},
		pool: {
			type: POOLS.SUSHISWAP,
			id: '0x7a1d5E67c3a273274766E241363E3E98e721E456',
		},
	},
	{
		exchangeAddress: twoWayMarketWBTCDAIAddress,
		input: DAIxAddress,
		output: WBTCxAddress,
		subsidy: RICAddress,
		subsidyIndex: 3,
		inputIndex: 0,
		outputIndex: 1,
		superToken: {
			tokenA: 'DAIx',
			tokenB: 'WBTCx',
		},
		wrappedToken: {
			tokenA: 'DAI',
			tokenB: 'WBTC',
		},
		pool: {
			type: POOLS.SUSHISWAP,
			id: '0x7a1d5E67c3a273274766E241363E3E98e721E456',
		},
	},
	{
		exchangeAddress: usdcxRicExchangeAddress,
		input: USDCxAddress,
		output: RICAddress,
		subsidy: RICAddress,
		inputIndex: 0, // just a placeholder, not used
		outputIndex: 0,
		superToken: {
			tokenA: 'USDCx',
			tokenB: 'RIC',
		},
		wrappedToken: {
			tokenA: 'USDC',
			tokenB: 'RIC',
		},
		pool: {
			type: POOLS.SUSHISWAP,
			id: '0xDBF5d66d77a83B96763c965D193D0fdD1f8A184B',
		},
	},
];

export enum FlowTypes {
	launchpad = 'launchpad',
	market = 'market',
	sushiLP = 'sushiLP',
}

export type InvestmentFlow = {
	superToken: string;
	tokenA: string;
	tokenB: string;
	coinA: Coin;
	coinB: Coin;
	flowKey: FlowEnum;
	type: FlowTypes;
};

const markets: InvestmentFlow[] = [
	{
		superToken: twoWayMarketRICUSDCAddress,
		tokenA: USDCxAddress,
		tokenB: RICAddress,
		coinA: Coin.USDC,
		coinB: Coin.RIC,
		flowKey: FlowEnum.twoWayUsdcRicFlowQuery,
		type: FlowTypes.market,
	},
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
		superToken: twoWayMarketWBTCAddress,
		tokenA: USDCxAddress,
		tokenB: WBTCxAddress,
		coinA: Coin.USDC,
		coinB: Coin.WBTC,
		flowKey: FlowEnum.twoWayusdcWbtcFlowQuery,
		type: FlowTypes.market,
	},
	{
		superToken: twoWayMarketDAIWETHAddress,
		tokenA: DAIxAddress,
		tokenB: WETHxAddress,
		coinA: Coin.DAI,
		coinB: Coin.WETH,
		flowKey: FlowEnum.twoWayDaiWethFlowQuery,
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
		superToken: twoWayMarketDAIWETHAddress,
		tokenA: WETHxAddress,
		tokenB: DAIxAddress,
		coinA: Coin.WETH,
		coinB: Coin.DAI,
		flowKey: FlowEnum.twoWayWethDaiFlowQuery,
		type: FlowTypes.market,
	},
	{
		superToken: twoWayMarketRICUSDCAddress,
		tokenA: RICAddress,
		tokenB: USDCxAddress,
		coinA: Coin.RIC,
		coinB: Coin.USDC,
		flowKey: FlowEnum.twoWayRicUsdcFlowQuery,
		type: FlowTypes.market,
	},
	{
		superToken: twoWayMarketMATICUSDCAddress,
		tokenA: MATICxAddress,
		tokenB: USDCxAddress,
		coinA: Coin.MATIC,
		coinB: Coin.USDC,
		flowKey: FlowEnum.twoWayMaticUsdcFlowQuery,
		type: FlowTypes.market,
	},
	{
		superToken: twoWayMarketMATICUSDCAddress,
		tokenA: USDCxAddress,
		tokenB: MATICxAddress,
		coinA: Coin.USDC,
		coinB: Coin.MATIC,
		flowKey: FlowEnum.twoWayUsdcMaticFlowQuery,
		type: FlowTypes.market,
	},
	{
		superToken: twoWayMarketMATICDAIAddress,
		tokenA: MATICxAddress,
		tokenB: DAIxAddress,
		coinA: Coin.MATIC,
		coinB: Coin.DAI,
		flowKey: FlowEnum.twoWayMaticDaiFlowQuery,
		type: FlowTypes.market,
	},
	{
		superToken: twoWayMarketMATICDAIAddress,
		tokenA: DAIxAddress,
		tokenB: MATICxAddress,
		coinA: Coin.DAI,
		coinB: Coin.MATIC,
		flowKey: FlowEnum.twoWayDaiMaticFlowQuery,
		type: FlowTypes.market,
	},
	{
		superToken: twoWayMarketWBTCDAIAddress,
		tokenA: WBTCxAddress,
		tokenB: DAIxAddress,
		coinA: Coin.WBTC,
		coinB: Coin.DAI,
		flowKey: FlowEnum.twoWayWbtcDaiFlowQuery,
		type: FlowTypes.market,
	},
	{
		superToken: twoWayMarketWBTCDAIAddress,
		tokenA: DAIxAddress,
		tokenB: WBTCxAddress,
		coinA: Coin.DAI,
		coinB: Coin.WBTC,
		flowKey: FlowEnum.twoWayDaiWbtcFlowQuery,
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

export const flowConfig: InvestmentFlow[] = [...markets, ...liquidityMarkets, ...launchpads];

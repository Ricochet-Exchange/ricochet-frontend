import { Routes } from 'constants/routes';
import { Coin } from './coins';
import {
	RICAddress,
	RexShirtAddress,
	RexHatAddress,
	twoWayWETHMarketAddress,
	twoWayMarketWBTCAddress,
	USDCxAddress,
	usdcxRicExchangeAddress,
	ricRexShirtLaunchpadAddress,
	ricRexHatLaunchpadAddress,
	usdcxibAlluoUSDAddress,
	WBTCxAddress,
	WETHxAddress,
	twoWayMarketDAIWETHAddress,
	DAIxAddress,
	twoWayMarketRICUSDCAddress,
	MATICxAddress,
	twoWayMarketMATICUSDCAddress,
	// twoWayMarketMATICDAIAddress,
	// twoWayMarketWBTCDAIAddress,
	StIbAlluoETHAddress,
	StIbAlluoUSDAddress,
	twoWayMarketibAlluoUSDETHAddress,
	StIbAlluoBTCAddress,
	twoWayMarketibAlluoUSDBTCAddress,
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
	// twoWayMaticDaiFlowQuery = 'twoWayMaticDaiFlowQuery',
	// twoWayDaiMaticFlowQuery = 'twoWayDaiMaticFlowQuery',
	// twoWayWbtcDaiFlowQuery = 'twoWayWbtcDaiFlowQuery',
	// twoWayDaiWbtcFlowQuery = 'twoWayDaiWbtcFlowQuery',
	twoWayIbUsdIbEthFlowQuery = 'twoWayIbUsdIbEthFlowQuery',
	twoWayIbEthIbUsdFlowQuery = 'twoWayIbEthIbUsdFlowQuery',
	twoWayIbUsdIbBTCFlowQuery = 'twoWayIbUsdIbBTCFlowQuery',
	twoWayIbBTCIbUsdFlowQuery = 'twoWayIbBTCIbUsdFlowQuery',
	usdcRicFlowQuery = 'usdcRicFlowQuery',
	ricRexShirtFlowQuery = 'ricRexShirtFlowQuery',
	ricRexHatFlowQuery = 'ricRexHatFlowQuery',
	usdcxibAlluoUSDFlowQuery = 'usdcxibAlluoUSDFlowQuery',
}

type IndexIDAType = {
	exchangeAddress: string;
	input: string;
	output: string;
	subsidy?: string;
	subsidyIndex?: number;
	inputIndex: number;
	outputIndex: number;
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
	},
	{
		exchangeAddress: twoWayMarketMATICUSDCAddress,
		input: USDCxAddress,
		output: MATICxAddress,
		subsidy: RICAddress,
		subsidyIndex: 3,
		inputIndex: 0,
		outputIndex: 1,
	},
	{
		exchangeAddress: twoWayMarketWBTCAddress,
		input: USDCxAddress,
		output: WBTCxAddress,
		subsidy: RICAddress,
		subsidyIndex: 3,
		inputIndex: 0,
		outputIndex: 1,
	},
	{
		exchangeAddress: twoWayMarketibAlluoUSDETHAddress,
		input: StIbAlluoETHAddress,
		output: StIbAlluoUSDAddress,
		subsidy: RICAddress,
		subsidyIndex: 2,
		inputIndex: 1,
		outputIndex: 0,
	},
	{
		exchangeAddress: twoWayMarketibAlluoUSDETHAddress,
		input: StIbAlluoUSDAddress,
		output: StIbAlluoETHAddress,
		subsidy: RICAddress,
		subsidyIndex: 3,
		inputIndex: 0,
		outputIndex: 1,
	},
	{
		exchangeAddress: twoWayMarketibAlluoUSDBTCAddress,
		input: StIbAlluoBTCAddress,
		output: StIbAlluoUSDAddress,
		subsidy: RICAddress,
		subsidyIndex: 2,
		inputIndex: 1,
		outputIndex: 0,
	},
	{
		exchangeAddress: twoWayMarketibAlluoUSDBTCAddress,
		input: StIbAlluoUSDAddress,
		output: StIbAlluoBTCAddress,
		subsidy: RICAddress,
		subsidyIndex: 3,
		inputIndex: 0,
		outputIndex: 1,
	},

	{
		exchangeAddress: twoWayWETHMarketAddress,
		input: WETHxAddress,
		output: USDCxAddress,
		subsidy: RICAddress,
		subsidyIndex: 2,
		inputIndex: 1,
		outputIndex: 0,
	},

	{
		exchangeAddress: twoWayMarketWBTCAddress,
		input: WBTCxAddress,
		output: USDCxAddress,
		subsidy: RICAddress,
		subsidyIndex: 2,
		inputIndex: 1,
		outputIndex: 0,
	},
	{
		exchangeAddress: twoWayMarketDAIWETHAddress,
		input: DAIxAddress,
		output: WETHxAddress,
		subsidy: RICAddress,
		subsidyIndex: 3,
		inputIndex: 0,
		outputIndex: 1,
	},
	{
		exchangeAddress: twoWayMarketDAIWETHAddress,
		input: WETHxAddress,
		output: DAIxAddress,
		subsidy: RICAddress,
		subsidyIndex: 2,
		inputIndex: 1,
		outputIndex: 0,
	},
	{
		exchangeAddress: twoWayMarketRICUSDCAddress,
		input: RICAddress,
		output: USDCxAddress,
		subsidy: WETHxAddress,
		subsidyIndex: 2,
		inputIndex: 1,
		outputIndex: 0,
	},
	{
		exchangeAddress: twoWayMarketRICUSDCAddress,
		input: USDCxAddress,
		output: RICAddress,
		subsidy: WETHxAddress,
		subsidyIndex: 3,
		inputIndex: 0,
		outputIndex: 1,
	},
	{
		exchangeAddress: twoWayMarketMATICUSDCAddress,
		input: MATICxAddress,
		output: USDCxAddress,
		subsidy: RICAddress,
		subsidyIndex: 2,
		inputIndex: 1,
		outputIndex: 0,
	},
	// {
	// 	exchangeAddress: twoWayMarketMATICDAIAddress,
	// 	input: MATICxAddress,
	// 	output: DAIxAddress,
	// 	subsidy: RICAddress,
	// 	subsidyIndex: 2,
	// 	inputIndex: 1,
	// 	outputIndex: 0,
	// },
	// {
	// 	exchangeAddress: twoWayMarketMATICDAIAddress,
	// 	input: DAIxAddress,
	// 	output: MATICxAddress,
	// 	subsidy: RICAddress,
	// 	subsidyIndex: 3,
	// 	inputIndex: 0,
	// 	outputIndex: 1,
	// },
	// {
	// 	exchangeAddress: twoWayMarketWBTCDAIAddress,
	// 	input: WBTCxAddress,
	// 	output: DAIxAddress,
	// 	subsidy: RICAddress,
	// 	subsidyIndex: 2,
	// 	inputIndex: 1,
	// 	outputIndex: 0,
	// },
	// {
	// 	exchangeAddress: twoWayMarketWBTCDAIAddress,
	// 	input: DAIxAddress,
	// 	output: WBTCxAddress,
	// 	subsidy: RICAddress,
	// 	subsidyIndex: 3,
	// 	inputIndex: 0,
	// 	outputIndex: 1,
	// },
	{
		exchangeAddress: usdcxRicExchangeAddress,
		input: USDCxAddress,
		output: RICAddress,
		subsidy: RICAddress,
		inputIndex: 0, // just a placeholder, not used
		outputIndex: 0,
	},
	{
		exchangeAddress: ricRexShirtLaunchpadAddress,
		input: RICAddress,
		output: RexShirtAddress,
		subsidy: RICAddress,
		inputIndex: 0, // just a placeholder, not used
		outputIndex: 0,
	},
	{
		exchangeAddress: ricRexHatLaunchpadAddress,
		input: RICAddress,
		output: RexHatAddress,
		subsidy: RICAddress,
		inputIndex: 0, // just a placeholder, not used
		outputIndex: 0,
	},
	{
		exchangeAddress: usdcxibAlluoUSDAddress,
		input: USDCxAddress,
		output: StIbAlluoUSDAddress,
		subsidy: RICAddress,
		subsidyIndex: 1,
		inputIndex: 0,
		outputIndex: 0,
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
		superToken: twoWayMarketMATICUSDCAddress,
		tokenA: USDCxAddress,
		tokenB: MATICxAddress,
		coinA: Coin.USDC,
		coinB: Coin.MATIC,
		flowKey: FlowEnum.twoWayUsdcMaticFlowQuery,
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
		superToken: usdcxibAlluoUSDAddress,
		tokenA: USDCxAddress,
		tokenB: StIbAlluoUSDAddress,
		coinA: Coin.USDC,
		coinB: Coin.IbAlluoUSD,
		flowKey: FlowEnum.usdcxibAlluoUSDFlowQuery,
		type: FlowTypes.market,
	},
	{
		superToken: twoWayMarketibAlluoUSDBTCAddress,
		tokenA: StIbAlluoUSDAddress,
		tokenB: StIbAlluoBTCAddress,
		coinA: Coin.IbAlluoUSD,
		coinB: Coin.IbAlluoBTC,
		flowKey: FlowEnum.twoWayIbUsdIbBTCFlowQuery,
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
		superToken: twoWayMarketibAlluoUSDETHAddress,
		tokenA: StIbAlluoUSDAddress,
		tokenB: StIbAlluoETHAddress,
		coinA: Coin.IbAlluoUSD,
		coinB: Coin.IbAlluoETH,
		flowKey: FlowEnum.twoWayIbUsdIbEthFlowQuery,
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
		superToken: twoWayMarketMATICUSDCAddress,
		tokenA: MATICxAddress,
		tokenB: USDCxAddress,
		coinA: Coin.MATIC,
		coinB: Coin.USDC,
		flowKey: FlowEnum.twoWayMaticUsdcFlowQuery,
		type: FlowTypes.market,
	},
	{
		superToken: twoWayMarketibAlluoUSDETHAddress,
		tokenA: StIbAlluoETHAddress,
		tokenB: StIbAlluoUSDAddress,
		coinA: Coin.IbAlluoETH,
		coinB: Coin.IbAlluoUSD,
		flowKey: FlowEnum.twoWayIbEthIbUsdFlowQuery,
		type: FlowTypes.market,
	},
	{
		superToken: twoWayMarketibAlluoUSDBTCAddress,
		tokenA: StIbAlluoBTCAddress,
		tokenB: StIbAlluoUSDAddress,
		coinA: Coin.IbAlluoBTC,
		coinB: Coin.IbAlluoUSD,
		flowKey: FlowEnum.twoWayIbBTCIbUsdFlowQuery,
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
	{
		superToken: ricRexShirtLaunchpadAddress,
		tokenA: RICAddress,
		tokenB: RexShirtAddress,
		coinA: Coin.RIC,
		coinB: Coin.REXSHIRT,
		flowKey: FlowEnum.ricRexShirtFlowQuery,
		type: FlowTypes.launchpad,
	},
	{
		superToken: ricRexHatLaunchpadAddress,
		tokenA: RICAddress,
		tokenB: RexHatAddress,
		coinA: Coin.RIC,
		coinB: Coin.REXHAT,
		flowKey: FlowEnum.ricRexHatFlowQuery,
		type: FlowTypes.launchpad,
	},
];

export const RoutesToFlowTypes = {
	[Routes.Invest as string]: FlowTypes.market,
	// [<string>Routes.InvestLiquidityMarkets]: FlowTypes.sushiLP,
	[Routes.InvestLaunchpads as string]: FlowTypes.launchpad,
};

export const flowConfig: InvestmentFlow[] = [...markets, ...liquidityMarkets, ...launchpads];

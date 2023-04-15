import { Routes } from 'constants/routes';
import { Coin } from './coins';
import {
	RICAddress,
	RexShirtAddress,
	RexHatAddress,
	usdcEthMarketAddress,
	ethUsdcMarketAddress,
	usdcWbtcMarketAddress,
	wbtcUsdcMarketAddress,
	usdcMaticMarketAddress,
	maticUsdcMarketAddress,
	USDCxAddress,
	usdcxRicExchangeAddress,
	ricRexShirtLaunchpadAddress,
	ricRexHatLaunchpadAddress,
	WBTCxAddress,
	WETHxAddress,
	DAIxAddress,
	twoWayMarketRICUSDCAddress,
	usdcRicMarketAddress,
	MATICxAddress,
	USDC_DAI_MARKET_ADDRESS,
	DAI_USDC_MARKET_ADDRESS,
} from './polygon_config';

export enum FlowEnum {
	twoWayusdcWethFlowQuery = 'twoWayusdcWethFlowQuery',
	twoWaywethUsdcFlowQuery = 'twoWaywethUsdcFlowQuery',
	twoWaywbtcUsdcFlowQuery = 'twoWaywbtcUsdcFlowQuery',
	twoWayusdcWbtcFlowQuery = 'twoWayusdcWbtcFlowQuery',
	twoWayRicUsdcFlowQuery = 'twoWayRicUsdcFlowQuery',
	twoWayUsdcRicFlowQuery = 'twoWayUsdcRicFlowQuery',
	twoWayMaticUsdcFlowQuery = 'twoWayMaticUsdcFlowQuery',
	twoWayUsdcMaticFlowQuery = 'twoWayUsdcMaticFlowQuery',
	usdcDaiFlowQuery = 'usdcDaiFlowQuery',
	daiUsdcFlowQuery = 'daiUsdcFlowQuery',
	usdcRicFlowQuery = 'usdcRicFlowQuery',
	ricRexShirtFlowQuery = 'ricRexShirtFlowQuery',
	ricRexHatFlowQuery = 'ricRexHatFlowQuery',
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
		exchangeAddress: USDC_DAI_MARKET_ADDRESS,
		input: USDCxAddress,
		output: DAIxAddress,
		subsidy: RICAddress,
		subsidyIndex: 1,
		inputIndex: 0,
		outputIndex: 0,
	},
	{
		exchangeAddress: DAI_USDC_MARKET_ADDRESS,
		input: DAIxAddress,
		output: USDCxAddress,
		subsidy: RICAddress,
		subsidyIndex: 1,
		inputIndex: 0,
		outputIndex: 0,
	},
	{
		exchangeAddress: usdcEthMarketAddress,
		input: USDCxAddress,
		output: WETHxAddress,
		subsidy: RICAddress,
		subsidyIndex: 1,
		inputIndex: 0,
		outputIndex: 0,
	},
	{
		exchangeAddress: usdcMaticMarketAddress,
		input: USDCxAddress,
		output: MATICxAddress,
		subsidy: RICAddress,
		subsidyIndex: 1,
		inputIndex: 0,
		outputIndex: 0,
	},
	{
		exchangeAddress: usdcWbtcMarketAddress,
		input: USDCxAddress,
		output: WBTCxAddress,
		subsidy: RICAddress,
		subsidyIndex: 1,
		inputIndex: 0,
		outputIndex: 0,
	},
	{
		exchangeAddress: ethUsdcMarketAddress,
		input: WETHxAddress,
		output: USDCxAddress,
		subsidy: RICAddress,
		subsidyIndex: 1,
		inputIndex: 0,
		outputIndex: 0,
	},

	{
		exchangeAddress: wbtcUsdcMarketAddress,
		input: WBTCxAddress,
		output: USDCxAddress,
		subsidy: RICAddress,
		subsidyIndex: 1,
		inputIndex: 0,
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
		exchangeAddress: usdcRicMarketAddress,
		input: USDCxAddress,
		output: RICAddress,
		subsidy: RICAddress,
		subsidyIndex: 1,
		inputIndex: 0,
		outputIndex: 0,
	},
	{
		exchangeAddress: maticUsdcMarketAddress,
		input: MATICxAddress,
		output: USDCxAddress,
		subsidy: RICAddress,
		subsidyIndex: 1,
		inputIndex: 0,
		outputIndex: 0,
	},
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
		superToken: usdcEthMarketAddress,
		tokenA: USDCxAddress,
		tokenB: WETHxAddress,
		coinA: Coin.USDC,
		coinB: Coin.WETH,
		flowKey: FlowEnum.twoWayusdcWethFlowQuery,
		type: FlowTypes.market,
	},
	{
		superToken: usdcMaticMarketAddress,
		tokenA: USDCxAddress,
		tokenB: MATICxAddress,
		coinA: Coin.USDC,
		coinB: Coin.MATIC,
		flowKey: FlowEnum.twoWayUsdcMaticFlowQuery,
		type: FlowTypes.market,
	},
	{
		superToken: usdcWbtcMarketAddress,
		tokenA: USDCxAddress,
		tokenB: WBTCxAddress,
		coinA: Coin.USDC,
		coinB: Coin.WBTC,
		flowKey: FlowEnum.twoWayusdcWbtcFlowQuery,
		type: FlowTypes.market,
	},
	{
		superToken: ethUsdcMarketAddress,
		tokenA: WETHxAddress,
		tokenB: USDCxAddress,
		coinA: Coin.WETH,
		coinB: Coin.USDC,
		flowKey: FlowEnum.twoWaywethUsdcFlowQuery,
		type: FlowTypes.market,
	},
	{
		superToken: maticUsdcMarketAddress,
		tokenA: MATICxAddress,
		tokenB: USDCxAddress,
		coinA: Coin.MATIC,
		coinB: Coin.USDC,
		flowKey: FlowEnum.twoWayMaticUsdcFlowQuery,
		type: FlowTypes.market,
	},
	{
		superToken: wbtcUsdcMarketAddress,
		tokenA: WBTCxAddress,
		tokenB: USDCxAddress,
		coinA: Coin.WBTC,
		coinB: Coin.USDC,
		flowKey: FlowEnum.twoWaywbtcUsdcFlowQuery,
		type: FlowTypes.market,
	},
	{
		superToken: USDC_DAI_MARKET_ADDRESS,
		tokenA: USDCxAddress,
		tokenB: DAIxAddress,
		coinA: Coin.USDC,
		coinB: Coin.DAI,
		flowKey: FlowEnum.usdcDaiFlowQuery,
		type: FlowTypes.market,
	},
	{
		superToken: DAI_USDC_MARKET_ADDRESS,
		tokenA: DAIxAddress,
		tokenB: USDCxAddress,
		coinA: Coin.DAI,
		coinB: Coin.USDC,
		flowKey: FlowEnum.daiUsdcFlowQuery,
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
		superToken: usdcRicMarketAddress,
		tokenA: USDCxAddress,
		tokenB: RICAddress,
		coinA: Coin.USDC,
		coinB: Coin.RIC,
		flowKey: FlowEnum.twoWayUsdcRicFlowQuery,
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

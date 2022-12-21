import { Coin } from './coins';
import {
	MATICxAddress,
	USDCxAddress,
	WETHxAddress,
	WBTCxAddress,
	RICAddress,
	DAIAddress,
	DAIxAddress,
	USDCAddress,
	WETHAddress,
	WBTCAddress,
	IbAlluoETHAddress,
	StIbAlluoETHAddress,
	IbAlluoUSDAddress,
	StIbAlluoUSDAddress,
	IbAlluoBTCAddress,
	StIbAlluoBTCAddress,
} from './polygon_config';

type Transformer = {
	token: string;
	coin: Coin;
};

export const tokenCoinTransformer: Transformer[] = [
	{
		token: IbAlluoETHAddress,
		coin: Coin.IbAlluoETH,
	},
	{
		token: StIbAlluoETHAddress,
		coin: Coin.StIbAlluoETH,
	},
	{
		token: IbAlluoBTCAddress,
		coin: Coin.IbAlluoBTC,
	},
	{
		token: StIbAlluoBTCAddress,
		coin: Coin.StIbAlluoBTC,
	},
	{
		token: IbAlluoUSDAddress,
		coin: Coin.IbAlluoUSD,
	},
	{
		token: StIbAlluoUSDAddress,
		coin: Coin.StIbAlluoUSD,
	},
	{
		token: MATICxAddress,
		coin: Coin.MATICx,
	},
	{
		token: USDCAddress,
		coin: Coin.USDC,
	},
	{
		token: USDCxAddress,
		coin: Coin.USDCx,
	},
	{
		token: WETHAddress,
		coin: Coin.WETH,
	},
	{
		token: WETHxAddress,
		coin: Coin.WETHx,
	},
	{
		token: WBTCAddress,
		coin: Coin.WBTC,
	},
	{
		token: WBTCxAddress,
		coin: Coin.WBTCx,
	},
	{
		token: RICAddress,
		coin: Coin.RIC,
	},
	{
		token: DAIAddress,
		coin: Coin.DAI,
	},
	{
		token: DAIxAddress,
		coin: Coin.DAIx,
	},
];

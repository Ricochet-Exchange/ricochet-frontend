import { Coin } from './coins';
import {
	MATICxAddress,
	USDCxAddress,
	WETHxAddress,
	WBTCxAddress,
	RICAddress,
	DAIAddress,
	DAIxAddress,
	MKRAddress,
	MKRxAddress,
	USDCAddress,
	WETHAddress,
	WBTCAddress,
	SUSHIAddress,
	SUSHIxAddress,
	IDLEAddress,
	IDLExAddress,
	IbAlluoETHAddress,
	StIbAlluoETHAddress,
	IbAlluoUSDAddress,
	StIbAlluoUSDAddress,
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
	{
		token: MKRAddress,
		coin: Coin.MKR,
	},
	{
		token: MKRxAddress,
		coin: Coin.MKRx,
	},
	{
		token: SUSHIAddress,
		coin: Coin.SUSHI,
	},
	{
		token: SUSHIxAddress,
		coin: Coin.SUSHIx,
	},
	{
		token: IDLEAddress,
		coin: Coin.IDLE,
	},
	{
		token: IDLExAddress,
		coin: Coin.IDLEx,
	},
];

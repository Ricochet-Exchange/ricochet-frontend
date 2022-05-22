import { Coin } from './coins';
import {
	DAIAddress,
	DAIxAddress,
	IDLEAddress,
	IDLExAddress,
	MATICxAddress,
	MKRAddress,
	MKRxAddress,
	RICAddress,
	SUSHIAddress,
	SUSHIxAddress,
	USDCAddress,
	USDCxAddress,
	WBTCAddress,
	WBTCxAddress,
	WETHAddress,
	WETHxAddress,
} from './polygon_config';

type Transformer = {
	token: string;
	coin: Coin;
};

export const tokenCoinTransformer: Transformer[] = [
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

import { Coin } from './coins';
import {
	USDCxAddress,
	WETHxAddress,
	DAIxAddress,
	MKRxAddress,
	WBTCxAddress,
	MATICxAddress,
	SUSHIxAddress,
	IDLExAddress,
	StIbAlluoETHAddress,
	StIbAlluoUSDAddress,
	StIbAlluoBTCAddress,
} from './polygon_config';

export const downgradeTokensList = [
	{
		coin: Coin.USDCx,
		tokenAddress: USDCxAddress,
	},
	{
		coin: Coin.DAIx,
		tokenAddress: DAIxAddress,
	},
	{
		coin: Coin.MKRx,
		tokenAddress: MKRxAddress,
	},
	{
		coin: Coin.WETHx,
		tokenAddress: WETHxAddress,
	},
	{
		coin: Coin.WBTCx,
		tokenAddress: WBTCxAddress,
	},
	{
		coin: Coin.MATICx,
		tokenAddress: MATICxAddress,
	},
	{
		coin: Coin.SUSHIx,
		tokenAddress: SUSHIxAddress,
	},
	{
		coin: Coin.IDLEx,
		tokenAddress: IDLExAddress,
	},
	{
		coin: Coin.StIbAlluoETH,
		tokenAddress: StIbAlluoETHAddress,
	},
	{
		coin: Coin.StIbAlluoUSD,
		tokenAddress: StIbAlluoUSDAddress,
	},
	{
		coin: Coin.StIbAlluoBTC,
		tokenAddress: StIbAlluoBTCAddress,
	},
];

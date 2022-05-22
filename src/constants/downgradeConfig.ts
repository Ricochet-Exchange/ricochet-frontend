import { Coin } from './coins';
import {
	DAIxAddress,
	IDLExAddress,
	MATICxAddress,
	MKRxAddress,
	SUSHIxAddress,
	USDCxAddress,
	WBTCxAddress,
	WETHxAddress,
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
];

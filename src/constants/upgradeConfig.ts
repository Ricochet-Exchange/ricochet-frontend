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
	WMATICAddress,
	ZeroAddress,
} from './polygon_config';

export const upgradeTokensList: {
	coin: Coin;
	tokenAddress: string;
	superTokenAddress: string;
	multi: number;
	key:
		| 'hasWethApprove'
		| 'hasUsdcApprove'
		| 'hasWbtcApprove'
		| 'hasDaiApprove'
		| 'hasMkrApprove'
		| 'hasMaticApprove'
		| 'hasSushiApprove'
		| 'hasIdleApprove';
}[] = [
	{
		coin: Coin.RIC,
		tokenAddress: ZeroAddress,
		superTokenAddress: RICAddress,
		multi: 1e6,
		key: 'hasUsdcApprove',
	},
	{
		coin: Coin.USDC,
		tokenAddress: USDCAddress,
		superTokenAddress: USDCxAddress,
		multi: 1e6,
		key: 'hasUsdcApprove',
	},
	{
		coin: Coin.DAI,
		tokenAddress: DAIAddress,
		superTokenAddress: DAIxAddress,
		multi: 1e18,
		key: 'hasDaiApprove',
	},
	{
		coin: Coin.MKR,
		tokenAddress: MKRAddress,
		superTokenAddress: MKRxAddress,
		multi: 1e18,
		key: 'hasMkrApprove',
	},
	{
		coin: Coin.WETH,
		tokenAddress: WETHAddress,
		superTokenAddress: WETHxAddress,
		multi: 1e18,
		key: 'hasWethApprove',
	},
	{
		coin: Coin.WBTC,
		tokenAddress: WBTCAddress,
		superTokenAddress: WBTCxAddress,
		multi: 1e8,
		key: 'hasWbtcApprove',
	},
	{
		coin: Coin.MATIC,
		tokenAddress: WMATICAddress,
		superTokenAddress: MATICxAddress,
		multi: 1e18,
		key: 'hasMaticApprove',
	},
	{
		coin: Coin.SUSHI,
		tokenAddress: SUSHIAddress,
		superTokenAddress: SUSHIxAddress,
		multi: 1e18,
		key: 'hasSushiApprove',
	},
	{
		coin: Coin.IDLE,
		tokenAddress: IDLEAddress,
		superTokenAddress: IDLExAddress,
		multi: 1e18,
		key: 'hasIdleApprove',
	},
];

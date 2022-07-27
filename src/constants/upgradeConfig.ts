import { Coin } from './coins';
import {
	DAIAddress,
	DAIxAddress,
	USDCAddress,
	USDCxAddress,
	WETHAddress,
	WETHxAddress,
	MKRAddress,
	MKRxAddress,
	WBTCAddress,
	WBTCxAddress,
	WMATICAddress,
	MATICxAddress,
	SUSHIAddress,
	SUSHIxAddress,
	IDLEAddress,
	IDLExAddress,
	RICAddress,
	SDTxAddress,
	SDTAddress,
	SDAM3CRVAddress,
	SDAM3CRVRexAddress,
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
		| 'hasIdleApprove'
		| 'hasSdtApprove'
		| 'hasSdam3CRVApprove';
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
	{
		coin: Coin.SDT,
		tokenAddress: SDTAddress,
		superTokenAddress: SDTxAddress,
		multi: 1e18,
		key: 'hasSdtApprove',
	},
	{
		coin: Coin.sdam3CRV,
		tokenAddress: SDAM3CRVAddress,
		superTokenAddress: SDAM3CRVRexAddress,
		multi: 1e18,
		key: 'hasSdtApprove',
	},
];

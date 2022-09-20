import { Coin } from './coins';
import {
	DAIAddress,
	DAIxAddress,
	USDCAddress,
	USDCxAddress,
	WETHAddress,
	WETHxAddress,
	WBTCAddress,
	WBTCxAddress,
	WMATICAddress,
	MATICxAddress,
	RICAddress,
	StIbAlluoETHAddress,
	IbAlluoETHAddress,
	StIbAlluoBTCAddress,
	IbAlluoBTCAddress,
	StIbAlluoUSDAddress,
	IbAlluoUSDAddress,
	ZeroAddress,
} from './polygon_config';

export const upgradeTokensList: {
	coin: Coin;
	tokenAddress: string;
	superTokenAddress: string;
	multi: number;
	key:
		| 'hasIbAlluoETHApprove'
		| 'hasIbAlluoBTCApprove'
		| 'hasIbAlluoUSDApprove'
		| 'hasWethApprove'
		| 'hasUsdcApprove'
		| 'hasWbtcApprove'
		| 'hasDaiApprove'
		| 'hasMaticApprove';
}[] = [
	{
		coin: Coin.RIC,
		tokenAddress: ZeroAddress,
		superTokenAddress: RICAddress,
		multi: 1e6,
		key: 'hasUsdcApprove',
	},
	{
		coin: Coin.StIbAlluoETH,
		tokenAddress: IbAlluoETHAddress,
		superTokenAddress: StIbAlluoETHAddress,
		multi: 1e18,
		key: 'hasIbAlluoETHApprove',
	},
	{
		coin: Coin.StIbAlluoBTC,
		tokenAddress: IbAlluoBTCAddress,
		superTokenAddress: StIbAlluoBTCAddress,
		multi: 1e18,
		key: 'hasIbAlluoBTCApprove',
	},
	{
		coin: Coin.StIbAlluoUSD,
		tokenAddress: IbAlluoUSDAddress,
		superTokenAddress: StIbAlluoUSDAddress,
		multi: 1e18,
		key: 'hasIbAlluoUSDApprove',
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
];

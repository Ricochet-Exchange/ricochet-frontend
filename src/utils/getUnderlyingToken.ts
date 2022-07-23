import { Token } from '@uniswap/sdk-core';
import { ChainId } from '@uniswap/smart-order-router';
import {
	DAIxAddress,
	USDCxAddress,
	WETHxAddress,
	MKRxAddress,
	WBTCxAddress,
	MATICxAddress,
	SUSHIxAddress,
	IDLExAddress,
	DAIAddress,
	USDCAddress,
	MKRAddress,
	WETHAddress,
	WBTCAddress,
	SUSHIAddress,
	IDLEAddress,
} from 'constants/polygon_config';

export const tokenList: any = {
	'DAIx': new Token(ChainId.POLYGON, DAIxAddress, 18, 'DAIx', 'Super DAI'),
	'USDCx': new Token(ChainId.POLYGON, USDCxAddress, 18, 'USDCx', 'Super USDC'),
	'WETHx': new Token(ChainId.POLYGON, WETHxAddress, 18, 'WETHx', 'Super WETH'),
	'MKRx': new Token(ChainId.POLYGON, MKRxAddress, 18, 'MKRx', 'Super Maker'),
	'WBTCx': new Token(ChainId.POLYGON, WBTCxAddress, 18, 'WBTCx', 'Super WBTC'),
	'MATICx': new Token(ChainId.POLYGON, MATICxAddress, 18, 'MATICx', 'Super MATIC'),
	'SUSHIx': new Token(ChainId.POLYGON, SUSHIxAddress, 18, 'SUSHIx', 'Super SUSHI'),
	'IDLEx': new Token(ChainId.POLYGON, IDLExAddress, 18, 'IDLEx', 'Super IDLE'),
	'WMATIC': new Token(
		ChainId.POLYGON,
		'0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270', // 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270
		18, // decimals
		'WMATIC',
		'Wrapped Matic',
	),
	'USDC': new Token(ChainId.POLYGON, USDCAddress, 6, 'USDC', 'USD Coin'),
	'DAI': new Token(
		ChainId.POLYGON,
		DAIAddress,
		18, // decimals
		'DAI',
		'Dai Stablecoin',
	),
	'MKR': new Token(
		ChainId.POLYGON,
		MKRAddress,
		18, // decimals,
		'MKR',
		'Maker',
	),
	'WETH': new Token(
		ChainId.POLYGON,
		WETHAddress,
		18, // decimals
		'WETH',
		'Wrapped Ether',
	),
	'WBTC': new Token(
		ChainId.POLYGON,
		WBTCAddress,
		18, // decimals,
		'WBTC',
		'Wrapped BTC',
	),
	'SUSHI': new Token(
		ChainId.POLYGON,
		SUSHIAddress,
		18, // decimals,
		'SUSHI',
		'SushiToken',
	),
	'IDLE': new Token(
		ChainId.POLYGON,
		IDLEAddress,
		18, // decimals,
		'IDLE',
		'Idle',
	),
};

export const getUnderlyingSupertoken = async (SupertokenAddress: string) => {
	switch (SupertokenAddress) {
		case DAIxAddress:
			return new Token(ChainId.POLYGON, DAIxAddress, 18);
		case USDCxAddress:
			return new Token(ChainId.POLYGON, USDCxAddress, 18);
		case WETHxAddress:
			return new Token(ChainId.POLYGON, WETHxAddress, 18);
		case MKRxAddress:
			return new Token(ChainId.POLYGON, MKRxAddress, 18);
		case WBTCxAddress:
			return new Token(ChainId.POLYGON, WBTCxAddress, 18);
		case MATICxAddress:
			return new Token(ChainId.POLYGON, MATICxAddress, 18);
		case SUSHIxAddress:
			return new Token(ChainId.POLYGON, SUSHIxAddress, 18);
		case IDLExAddress:
			return new Token(ChainId.POLYGON, IDLExAddress, 18);
		default:
			return new Token(ChainId.POLYGON, SupertokenAddress, 18);
	}
};

export const getUnderlyingToken = async (Supertoken: string) => {
	const WMATIC = new Token(
		ChainId.POLYGON,
		'0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270', // 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270
		18, // decimals
		'WMATIC',
		'Wrapped Matic',
	);

	const USDC = new Token(ChainId.POLYGON, USDCAddress, 6, 'USDC', 'USD Coin');

	const DAI = new Token(
		ChainId.POLYGON,
		DAIAddress,
		18, // decimals
		'DAI',
		'Dai Stablecoin',
	);

	const MKR = new Token(
		ChainId.POLYGON,
		MKRAddress,
		18, // decimals,
		'MKR',
		'Maker',
	);

	const WETH = new Token(
		ChainId.POLYGON,
		WETHAddress,
		18, // decimals
		'WETH',
		'Wrapped Ether',
	);

	const WBTC = new Token(
		ChainId.POLYGON,
		WBTCAddress,
		18, // decimals,
		'WBTC',
		'Wrapped BTC',
	);

	const SUSHI = new Token(
		ChainId.POLYGON,
		SUSHIAddress,
		18, // decimals,
		'SUSHI',
		'SushiToken',
	);

	const IDLE = new Token(
		ChainId.POLYGON,
		IDLEAddress,
		18, // decimals,
		'IDLE',
		'Idle',
	);

	if (Supertoken === MATICxAddress) {
		return WMATIC;
	}
	if (Supertoken === USDCxAddress) {
		return USDC;
	}
	if (Supertoken === DAIxAddress) {
		return DAI;
	}
	if (Supertoken === MKRxAddress) {
		return MKR;
	}
	if (Supertoken === WETHxAddress) {
		return WETH;
	}
	if (Supertoken === WBTCxAddress) {
		return WBTC;
	}
	if (Supertoken === SUSHIxAddress) {
		return SUSHI;
	}
	if (Supertoken === IDLExAddress) {
		return IDLE;
	}
	console.log('Error in getUnderlyingToken()');
};

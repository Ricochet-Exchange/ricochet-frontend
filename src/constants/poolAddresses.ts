import { Coin } from './coins';

// SushiSwap Pools
export const sushiSwapPools = {
	[`${Coin.RIC}-${Coin.USDC}`]: '0xdbf5d66d77a83b96763c965d193d0fdd1f8a184b', // need {token1Price}
	[`${Coin.USDC}-${Coin.RIC}`]: '0xdbf5d66d77a83b96763c965d193d0fdd1f8a184b', // need {token0Price}
	[`${Coin.USDC}-${Coin.WBTC}`]: '0xD02b870c556480491c70AaF98C297fddd93F6f5C',
	[`${Coin.WBTC}-${Coin.USDC}`]: '0xD02b870c556480491c70AaF98C297fddd93F6f5C',
	[`${Coin.USDC}-${Coin.ETH}`]: '0x34965ba0ac2451A34a0471F04CCa3F990b8dea27',
	[`${Coin.ETH}-${Coin.USDC}`]: '0x34965ba0ac2451A34a0471F04CCa3F990b8dea27',
	[`${Coin.DAI}-${Coin.ETH}`]: '0x6FF62bfb8c12109E8000935A6De54daD83a4f39f',
	[`${Coin.ETH}-${Coin.DAI}`]: '0x6FF62bfb8c12109E8000935A6De54daD83a4f39f',
	[`${Coin.WBTC}-${Coin.DAI}`]: '0x7a1d5E67c3a273274766E241363E3E98e721E456',
	[`${Coin.DAI}-${Coin.WBTC}`]: '0x7a1d5E67c3a273274766E241363E3E98e721E456',
};

// QuickSwap Pools
export const quickSwapPools = {
	[`${Coin.MATIC}-${Coin.USDC}`]: '0x6e7a5FAFcec6BB1e78bAE2A1F0B612012BF14827',
	[`${Coin.USDC}-${Coin.MATIC}`]: '0x6e7a5FAFcec6BB1e78bAE2A1F0B612012BF14827',
	[`${Coin.MATIC}-${Coin.DAI}`]: '0xEEf611894CeaE652979C9D0DaE1dEb597790C6eE',
	[`${Coin.DAI}-${Coin.MATIC}`]: '0xEEf611894CeaE652979C9D0DaE1dEb597790C6eE',
};

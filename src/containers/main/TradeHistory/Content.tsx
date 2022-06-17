import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import type { ColumnName, Data } from './types';
import { queryQuickSwapPoolPriceByBlock, querySushiSwapPoolPriceByBlock } from 'api';

enum POOLS {
	'SUSHISWAP',
	'QUICKSWAP',
}

interface T {
	// from superfluid subgraph
	superToken: {
		tokenA: string;
		tokenB: string;
	};
	// from liquidity pool
	wrappedToken: {
		tokenA: string;
		tokenB: string;
	};
	pool: {
		type: POOLS;
		id: string;
	};
}

const map: T[] = [
	{
		superToken: {
			tokenA: 'USDCx',
			tokenB: 'RIC',
		},
		wrappedToken: {
			tokenA: 'USDC',
			tokenB: 'RIC',
		},
		pool: {
			type: POOLS.SUSHISWAP,
			id: '0xDBF5d66d77a83B96763c965D193D0fdD1f8A184B',
		},
	},
	{
		superToken: {
			tokenA: 'RIC',
			tokenB: 'USDCx',
		},
		wrappedToken: {
			tokenA: 'RIC',
			tokenB: 'USDC',
		},
		pool: {
			type: POOLS.SUSHISWAP,
			id: '0xDBF5d66d77a83B96763c965D193D0fdD1f8A184B',
		},
	},
	{
		superToken: {
			tokenA: 'USDCx',
			tokenB: 'ETHx',
		},
		wrappedToken: {
			tokenA: 'USDC',
			tokenB: 'WETH',
		},
		pool: {
			type: POOLS.SUSHISWAP,
			id: '0x34965ba0ac2451A34a0471F04CCa3F990b8dea27',
		},
	},
	{
		superToken: {
			tokenA: 'ETHx',
			tokenB: 'USDCx',
		},
		wrappedToken: {
			tokenA: 'WETH',
			tokenB: 'USDC',
		},
		pool: {
			type: POOLS.SUSHISWAP,
			id: '0x34965ba0ac2451A34a0471F04CCa3F990b8dea27',
		},
	},
	{
		superToken: {
			tokenA: 'USDCx',
			tokenB: 'WBTCx',
		},
		wrappedToken: {
			tokenA: 'USDC',
			tokenB: 'WBTC',
		},
		pool: {
			type: POOLS.QUICKSWAP,
			id: '0xf6a637525402643b0654a54bead2cb9a83c8b498',
		},
	},
	{
		superToken: {
			tokenA: 'WBTCx',
			tokenB: 'USDCx',
		},
		wrappedToken: {
			tokenA: 'WBTC',
			tokenB: 'USDC',
		},
		pool: {
			type: POOLS.QUICKSWAP,
			id: '0xf6a637525402643b0654a54bead2cb9a83c8b498',
		},
	},
	{
		superToken: {
			tokenA: 'ETHx',
			tokenB: 'DAIx',
		},
		wrappedToken: {
			tokenA: 'ETH',
			tokenB: 'DAI',
		},
		pool: {
			type: POOLS.SUSHISWAP,
			id: '0x6FF62bfb8c12109E8000935A6De54daD83a4f39f',
		},
	},
	{
		superToken: {
			tokenA: 'DAIx',
			tokenB: 'ETHx',
		},
		wrappedToken: {
			tokenA: 'DAI',
			tokenB: 'ETH',
		},
		pool: {
			type: POOLS.SUSHISWAP,
			id: '0x6FF62bfb8c12109E8000935A6De54daD83a4f39f',
		},
	},
	{
		superToken: {
			tokenA: 'WBTCx',
			tokenB: 'DAIx',
		},
		wrappedToken: {
			tokenA: 'WBTC',
			tokenB: 'DAI',
		},
		pool: {
			type: POOLS.SUSHISWAP,
			id: '0x7a1d5E67c3a273274766E241363E3E98e721E456',
		},
	},
	{
		superToken: {
			tokenA: 'DAIx',
			tokenB: 'WBTCx',
		},
		wrappedToken: {
			tokenA: 'DAI',
			tokenB: 'WBTC',
		},
		pool: {
			type: POOLS.SUSHISWAP,
			id: '0x7a1d5E67c3a273274766E241363E3E98e721E456',
		},
	},
	{
		superToken: {
			tokenA: 'MATICx',
			tokenB: 'USDCx',
		},
		wrappedToken: {
			tokenA: 'WMATIC',
			tokenB: 'USDC',
		},
		pool: {
			type: POOLS.QUICKSWAP,
			id: '0x6e7a5FAFcec6BB1e78bAE2A1F0B612012BF14827',
		},
	},
	{
		superToken: {
			tokenA: 'USDCx',
			tokenB: 'MATICx',
		},
		wrappedToken: {
			tokenA: 'USDC',
			tokenB: 'WMATIC',
		},
		pool: {
			type: POOLS.QUICKSWAP,
			id: '0x6e7a5FAFcec6BB1e78bAE2A1F0B612012BF14827',
		},
	},
	{
		superToken: {
			tokenA: 'MATICx',
			tokenB: 'DAIx',
		},
		wrappedToken: {
			tokenA: 'WMATIC',
			tokenB: 'DAI',
		},
		pool: {
			type: POOLS.QUICKSWAP,
			id: '0xEEf611894CeaE652979C9D0DaE1dEb597790C6eE',
		},
	},
	{
		superToken: {
			tokenA: 'DAIx',
			tokenB: 'MATICx',
		},
		wrappedToken: {
			tokenA: 'DAI',
			tokenB: 'WMATIC',
		},
		pool: {
			type: POOLS.QUICKSWAP,
			id: '0xEEf611894CeaE652979C9D0DaE1dEb597790C6eE',
		},
	},
];

type ContentProps = {
	id: ColumnName;
	row: Data;
};

export function Content({ id, row }: ContentProps) {
	const [inputUsdAmount, setInputUsdAmount] = useState(row.input.usdAmount);
	const [outputUsdAmount, setOutputUsdAmount] = useState(row.output.usdAmount);
	const [pnl, setPnl] = useState({ ...row.pnl });

	useEffect(() => {
		let isMounted = true;

		(async () => {
			const { input, output, updatedAtBlockNumber, pnl } = row;
			// find pool type.
			const pool = map.find((p) => p.superToken.tokenA === input.coin && p.superToken.tokenB === output.coin);
			if (!pool) {
				console.log('pool not found: ', input.coin, output.coin);
				return;
			}
			const { data } =
				pool.pool.type === POOLS.SUSHISWAP
					? await querySushiSwapPoolPriceByBlock(pool.pool.id, updatedAtBlockNumber)
					: await queryQuickSwapPoolPriceByBlock(pool.pool.id, updatedAtBlockNumber);
			if (data.error) {
				throw new Error('Error when querying ', data.error);
			}
			let token0Price;
			let token1Price;
			if (
				(input.coin === 'RIC' && output.coin === 'USDCx') ||
				(input.coin === 'USDCx' && output.coin === 'RIC')
			) {
				// special case for RIC-USDC and USDC-RIC pools
				token0Price = Number(data.data.pair.reserveUSD) / Number(data.data.pair.reserve0);
				token1Price = Number(data.data.pair.reserveUSD) / Number(data.data.pair.reserve1);
			} else {
				/**
				 * talked about this here: https://discord.com/channels/748031363935895552/748032044289753118/984745435266678824
				 * token0 price = reserveUSD / 2 / reserve0
				 * token1 price = reserveUSD / 2 / reserve1
				 */
				if (data.data.pair === null) {
					console.log(input.coin, output.coin, pool, updatedAtBlockNumber);
				}
				token0Price = Number(data.data.pair.reserveUSD) / 2 / Number(data.data.pair.reserve0);
				token1Price = Number(data.data.pair.reserveUSD) / 2 / Number(data.data.pair.reserve1);
			}
			input.usdAmount =
				input.tokenAmount *
				(data.data.pair.token0.symbol === pool.wrappedToken.tokenA ? token0Price : token1Price);
			output.usdAmount =
				output.tokenAmount *
				(data.data.pair.token1.symbol === pool.wrappedToken.tokenB ? token1Price : token0Price);
			pnl.amount = output.usdAmount - input.usdAmount;
			pnl.percent = row.input.usdAmount === 0 ? 0 : (row.pnl.amount / row.input.usdAmount) * 100;
			if (isMounted) {
				setInputUsdAmount(input.usdAmount);
				setOutputUsdAmount(output.usdAmount);
				setPnl({
					amount: pnl.amount,
					percent: pnl.percent,
				});
			}
		})();

		return () => {
			isMounted = false;
		};
	}, [row]);

	let content;

	switch (id) {
		case 'startDate':
			content = dayjs(Number(row.startDate)).format('DD/MM/YY');
			break;

		case 'endDate':
			content = dayjs(Number(row.endDate)).format('DD/MM/YY');
			break;

		case 'Input':
			content = `${row.input.tokenAmount.toFixed(6)} ${row.input.coin} ($${inputUsdAmount.toFixed(4)})`;
			break;

		case 'Output':
			content = `${row.output.tokenAmount.toFixed(6)} ${row.output.coin} ($${outputUsdAmount.toFixed(4)})`;
			break;

		case 'PnL':
			content = `${pnl.amount.toFixed(4)} (${pnl.percent.toFixed(2)}%)`;
			break;

		default:
			content = 'not found';
			break;
	}

	return <span>{content}</span>;
}

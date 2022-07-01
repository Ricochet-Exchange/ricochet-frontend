import React, { FC, useEffect, useState } from 'react';
import Web3 from 'web3';
import type { Row } from './types';
import { querySushiPoolPrices, queryQuickSwapPoolPrices } from 'api';
import { FlowTypes, POOLS } from 'constants/flowConfig';
import { getLauchpadPrice } from 'utils/getLauchpadPrice';
import { trimPad } from 'utils/balances';
import { LinkPlaceholder } from './LinkPlaceholder';

type PricePlaceholderProps = Pick<Row, 'tokenA' | 'tokenB' | 'pool' | 'type' | 'coinA'> & {
	web3: Web3;
};

export const PricePlaceholder: FC<PricePlaceholderProps> = ({ pool, tokenA, tokenB, type, web3, coinA }) => {
	const [price, setPrice] = useState<string | undefined>(undefined);

	useEffect(() => {
		if (!pool) return;
		let isMounted = true;

		(async () => {
			try {
				let _price: any;
				let data;
				let token0Price;
				let token1Price;

				if (type === FlowTypes.market) {
					if (pool.type === POOLS.SUSHISWAP) {
						data = await querySushiPoolPrices(pool.id);
					} else if (pool.type === POOLS.QUICKSWAP) {
						data = await queryQuickSwapPoolPrices(pool.id);
					}

					if (data?.data.error) {
						throw new Error('Error when querying pools subgraph ', data?.data.error);
					}

					if (data?.data) {
						if ((tokenA === 'RIC' && tokenB === 'USDCx') || (tokenA === 'USDCx' && tokenB === 'RIC')) {
							// special case for RIC-USDC and USDC-RIC pools
							token0Price = Number(data.data.data.pair.reserveUSD) / Number(data.data.data.pair.reserve0);
							token1Price = Number(data.data.data.pair.reserveUSD) / Number(data.data.data.pair.reserve1);
						} else {
							/**
							 * talked about this here: https://discord.com/channels/748031363935895552/748032044289753118/984745435266678824
							 * token0 price = reserveUSD / 2 / reserve0
							 * token1 price = reserveUSD / 2 / reserve1
							 */
							if (data.data.pair === null) {
								console.log(tokenA, tokenB, pool);
							}
							token0Price =
								Number(data.data.data.pair.reserveUSD) / 2 / Number(data.data.data.pair.reserve0);
							token1Price =
								Number(data.data.data.pair.reserveUSD) / 2 / Number(data.data.data.pair.reserve1);
						}
					}
					_price = data?.data.data.pair.token0.symbol === coinA ? token0Price : token1Price;
				} else if (type === FlowTypes.launchpad) {
					_price = await getLauchpadPrice(web3);
				}

				if (isMounted) {
					setPrice(_price);
				}
			} catch (error: any) {
				if (!!window.ethereum) return;
				console.error(error);
			}
		})();

		return () => {
			isMounted = false;
		};
	}, [coinA, pool, tokenA, tokenB, type, web3]);

	if (!price) return <span>-</span>;

	if (type === FlowTypes.launchpad) {
		return <span>{`${trimPad(price, 3)} ${tokenA}/${tokenB}`}</span>;
	}

	if (type === FlowTypes.market) {
		return (
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					width: '110px',
				}}
			>
				<div style={{ width: '100px' }}>
					<span>{(+price).toFixed(3)}</span>
				</div>
				<div>
					<LinkPlaceholder link={`https://dexscreener.com/polygon/${pool.id}`} />
				</div>
			</div>
		);
	}

	return <span>unknown flow type</span>;
};

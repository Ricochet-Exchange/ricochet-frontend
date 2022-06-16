import React from 'react';
import { launchpadABI } from 'constants/abis';
import { usdcxRicExchangeAddress } from 'constants/polygon_config';
import { fromWei, trimPad } from 'utils/balances';
import { getContract } from 'utils/getContract';
import Web3 from 'web3';
import styles from './styles.module.scss';
import { useShallowSelector } from '../../../hooks/useShallowSelector';
import { selectMain } from '../../../store/main/selectors';
import { FlowTypes } from 'constants/flowConfig';
import { Coin } from 'constants/coins';
import { queryQuickSwapPoolPrices, querySushiPoolPrices } from 'api';

// SushiSwap Pools
const poolAddresses = {
	[`${Coin.RIC}-${Coin.USDC}`]: '0xdbf5d66d77a83b96763c965d193d0fdd1f8a184b', // need {token1Price}
	[`${Coin.USDC}-${Coin.RIC}`]: '0xdbf5d66d77a83b96763c965d193d0fdd1f8a184b', // need {token0Price}
	[`${Coin.USDC}-${Coin.WBTC}`]: '0xD02b870c556480491c70AaF98C297fddd93F6f5C',
	[`${Coin.USDC}-${Coin.ETH}`]: '0x34965ba0ac2451A34a0471F04CCa3F990b8dea27',
	[`${Coin.ETH}-${Coin.USDC}`]: '0x34965ba0ac2451A34a0471F04CCa3F990b8dea27',
	[`${Coin.DAI}-${Coin.ETH}`]: '0x6FF62bfb8c12109E8000935A6De54daD83a4f39f',
	[`${Coin.ETH}-${Coin.DAI}`]: '0x6FF62bfb8c12109E8000935A6De54daD83a4f39f',
	[`${Coin.WBTC}-${Coin.DAI}`]: '0x7a1d5E67c3a273274766E241363E3E98e721E456',
	[`${Coin.DAI}-${Coin.WBTC}`]: '0x7a1d5E67c3a273274766E241363E3E98e721E456',
};

// QuickSwap Pools
const quickSwapPools = {
	[`${Coin.WBTC}-${Coin.USDC}`]: '0xf6a637525402643b0654a54bead2cb9a83c8b498',
	[`${Coin.MATIC}-${Coin.USDC}`]: '0x6e7a5FAFcec6BB1e78bAE2A1F0B612012BF14827',
	[`${Coin.USDC}-${Coin.MATIC}`]: '0x6e7a5FAFcec6BB1e78bAE2A1F0B612012BF14827',
	[`${Coin.MATIC}-${Coin.DAI}`]: '0xEEf611894CeaE652979C9D0DaE1dEb597790C6eE',
	[`${Coin.DAI}-${Coin.MATIC}`]: '0xEEf611894CeaE652979C9D0DaE1dEb597790C6eE',
};

type Props = {
	flowType: FlowTypes;
	coinA: Coin;
	coinB: Coin;
} & React.HTMLProps<HTMLSpanElement>;

// load abi, create contract instance, get price, normalize price, quicc maths, return
const getPrice = async (web3: Web3): Promise<string> => {
	const contract = getContract(usdcxRicExchangeAddress, launchpadABI, web3);
	const price = await contract.methods.getSharePrice().call();
	const normalizedPrice = typeof price === 'string' ? price : price.toString();
	return fromWei(normalizedPrice, 18);
};

// returns inline element, className or style can be directly applied to Price
// ie: <Price className='price' />
export default function Price({ flowType, coinA, coinB }: Props) {
	const [launchPadPrice, setLaunchPadPrice] = React.useState('');
	const [marketPairPrice, setMarketPairPrice] = React.useState({
		[`${coinA}-${coinB}`]: '',
	});
	const { web3 } = useShallowSelector(selectMain);
	React.useEffect(() => {
		let isMounted = true;
		if (web3?.currentProvider === null) return;

		getPrice(web3).then((p) => {
			if (isMounted) {
				setLaunchPadPrice(p);
			}
		});

		querySushiPoolPrices(poolAddresses[`${coinA}-${coinB}`]).then(({ data }) => {
			if (data?.error) {
				console.error('fetching Sushi Pools price error: ', data.error);
			} else {
				const { pair } = data.data;
				if (isMounted && pair) {
					const { symbol: _coinA } = pair.token0;
					const { symbol: _coinB } = pair.token1;

					let realPrice = '';
					if (_coinA.includes(coinA) && _coinB.includes(coinB)) {
						realPrice = pair.token0Price;
					} else if (_coinA.includes(coinB) && _coinB.includes(coinA)) {
						realPrice = pair.token1Price;
					}
					setMarketPairPrice((prev) => {
						return {
							...prev,
							[`${coinA}-${coinB}`]: realPrice,
						};
					});
				}
			}
		});

		queryQuickSwapPoolPrices(quickSwapPools[`${coinA}-${coinB}`]).then(({ data }) => {
			if (data?.error) {
				console.error('fetching Sushi Pools price error: ', data.error);
			} else {
				const { pair } = data.data;
				if (isMounted && pair) {
					const { symbol: _coinA } = pair.token0;
					const { symbol: _coinB } = pair.token1;

					let realPrice = '';
					if (_coinA.includes(coinA) && _coinB.includes(coinB)) {
						realPrice = pair.token0Price;
					} else if (_coinA.includes(coinB) && _coinB.includes(coinA)) {
						realPrice = pair.token1Price;
					}
					setMarketPairPrice((prev) => {
						return {
							...prev,
							[`${coinA}-${coinB}`]: realPrice,
						};
					});
				}
			}
		});

		return () => {
			isMounted = false;
		};
	}, [coinA, coinB, web3]);

	if (!launchPadPrice && !marketPairPrice[`${coinA}-${coinB}`]) return null;

	return (
		<div className={styles.balance_container}>
			<span className={styles.balance}>
				{flowType === FlowTypes.launchpad
					? `🚀 ${trimPad(launchPadPrice, 2)} ${coinA}/${coinB}`
					: trimPad(marketPairPrice[`${coinA}-${coinB}`], 3) === '0.000'
					? `< 0.001 ${coinA}/${coinB}`
					: `@ ${trimPad(marketPairPrice[`${coinA}-${coinB}`], 3)} ${coinA}/${coinB}`}
			</span>
		</div>
	);
}

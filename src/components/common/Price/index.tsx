import React from 'react';
import { launchpadABI } from 'constants/ABIs/launchpad';
import { ibAllouToken } from 'constants/ABIs/ibAllouToken';
import {
	usdcxRicExchangeAddress,
	ricRexShirtLaunchpadAddress,
	ricRexHatLaunchpadAddress,
	IbAlluoBTCAddress,
	IbAlluoETHAddress,
	IbAlluoUSDAddress,
} from 'constants/polygon_config';
import { fromWei, trimPad } from 'utils/balances';
import { getContract } from 'utils/getContract';
import Web3 from 'web3';
import styles from './styles.module.scss';
import { useShallowSelector } from '../../../hooks/useShallowSelector';
import { selectMain } from '../../../store/main/selectors';
import { FlowTypes } from 'constants/flowConfig';
import { Coin } from 'constants/coins';
import { queryQuickSwapPoolPrices, querySushiPoolPrices } from 'api';
import { sushiSwapPools, quickSwapPools } from 'constants/poolAddresses';
import { useLoading } from 'context';

type Props = {
	flowType: FlowTypes;
	coinA: Coin;
	coinB: Coin;
} & React.HTMLProps<HTMLSpanElement>;

// load abi, create contract instance, get price, normalize price, quicc maths, return
const getPrice = async (web3: Web3, coinB: any): Promise<string> => {
	let exchangeAddr = '';
	if (coinB === Coin.RIC) {
		exchangeAddr = usdcxRicExchangeAddress;
	} else if (coinB === Coin.REXSHIRT) {
		exchangeAddr = ricRexShirtLaunchpadAddress;
	} else if (coinB === Coin.REXHAT) {
		exchangeAddr = ricRexHatLaunchpadAddress;
	}

	const contract = getContract(exchangeAddr, launchpadABI, web3);

	let price: string = '';

	if (exchangeAddr !== '') {
		price = await contract.methods.getSharePrice().call();
	}

	const normalizedPrice = price && typeof price === 'string' ? price : price.toString();

	return fromWei(normalizedPrice, 18);
};

// returns inline element, className or style can be directly applied to Price
// ie: <Price className='price' />
export default function Price({ flowType, coinA, coinB }: Props) {
	const { setLoading } = useLoading();
	const [launchPadPrice, setLaunchPadPrice] = React.useState('');
	const [marketPairPrice, setMarketPairPrice] = React.useState({
		[`${coinA}-${coinB}`]: '',
	});
	const { web3 } = useShallowSelector(selectMain);

	const getTokenSymbol = (token: string) => {
		if (token === Coin.IbAlluoBTC) {
			return 'WBTC';
		}

		if (token === Coin.IbAlluoETH) {
			return 'ETH';
		}

		if (token === Coin.IbAlluoUSD) {
			return 'USDC';
		}

		return token;
	};

	const getIbAllouRatio = async (address: string, price: string) => {
		const contract = await getContract(address, ibAllouToken, web3);
		const ratio = await contract.methods.growingRatio().call();
		const ratioFloat = await fromWei(ratio, 18);
		const ratioPrice = parseFloat(ratioFloat) * parseFloat(price);
		return ratioPrice.toString();
	};

	React.useEffect(() => {
		let isMounted = true;
		if (web3?.currentProvider === null) return;

		setLoading(false);

		getPrice(web3, coinB).then((p) => {
			if (isMounted && p) {
				setLaunchPadPrice(p);
			}
		});

		querySushiPoolPrices(sushiSwapPools[`${getTokenSymbol(coinA)}-${getTokenSymbol(coinB)}`]).then(({ data }) => {
			if (data?.error) {
				console.error('fetching Sushi Pools price error: ', data.error);
				return;
			}

			const { pair } = data.data;

			if (!isMounted || !pair) {
				return;
			}

			const { token0, token1 } = pair;

			const _coinA = token0.symbol;
			const _coinB = token1.symbol;
			let realPrice = '';

			switch (`${_coinA}-${_coinB}`) {
				case `${getTokenSymbol(coinA)}-${getTokenSymbol(coinB)}`:
					realPrice = pair.token0Price;
					break;
				case `${getTokenSymbol(coinB)}-${getTokenSymbol(coinA)}`:
					realPrice = pair.token1Price;
					break;
			}

			const isIbAlluoPair =
				coinA.includes(Coin.IbAlluoBTC) ||
				coinA.includes(Coin.IbAlluoUSD) ||
				coinA.includes(Coin.IbAlluoETH) ||
				coinB.includes(Coin.IbAlluoBTC) ||
				coinB.includes(Coin.IbAlluoUSD) ||
				coinB.includes(Coin.IbAlluoETH);

			if (isIbAlluoPair) {
				let tokenAddress = null;
				let growthRatioPrice = '';

				switch (coinB) {
					case Coin.IbAlluoBTC:
						tokenAddress = IbAlluoBTCAddress;
						break;
					case Coin.IbAlluoETH:
						tokenAddress = IbAlluoETHAddress;
						break;
					case Coin.IbAlluoUSD:
						tokenAddress = IbAlluoUSDAddress;
						break;
				}

				if (tokenAddress) {
					getIbAllouRatio(tokenAddress, realPrice)
						.then((data) => {
							growthRatioPrice = data;
							setMarketPairPrice((prev) => {
								return {
									...prev,
									[`${coinA}-${coinB}`]: growthRatioPrice,
								};
							});
						})
						.catch(() => null); // instead of return null in the catch()
				}
			} else if (coinA === Coin.USDC && coinB === Coin.IbAlluoUSD) {
				getIbAllouRatio(IbAlluoUSDAddress, '1')
					.then((data) => {
						setMarketPairPrice((prev) => ({
							...prev,
							[`${coinA}-${coinB}`]: data,
						}));
					})
					.catch(() => null);
			} else {
				setMarketPairPrice((prev) => ({
					...prev,
					[`${coinA}-${coinB}`]: realPrice,
				}));
			}
		});

		queryQuickSwapPoolPrices(quickSwapPools[`${coinA}-${coinB}`]).then(({ data }) => {
			// added this data.data check as it's crashing the application due to RIC price returning as NaN
			if (data?.error || data.data === undefined) {
				console.error('fetching Quickswap Pools price error: ', data.error);
				return;
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
	}, [coinA, coinB, web3, getIbAllouRatio]);

	if (!launchPadPrice && !marketPairPrice[`${coinA}-${coinB}`]) return null;

	return (
		<div className={styles.balance_container}>
			<span className={styles.balance}>
				{flowType === FlowTypes.launchpad
					? `🚀 ${trimPad(launchPadPrice, 3)} ${coinA}/${coinB}`
					: trimPad(marketPairPrice[`${coinA}-${coinB}`], 3) === '0.000'
					? `< 0.001 ${coinA}/${coinB}`
					: `@ ${trimPad(marketPairPrice[`${coinA}-${coinB}`], 3)} ${coinA}/${coinB}`}
			</span>
		</div>
	);
}

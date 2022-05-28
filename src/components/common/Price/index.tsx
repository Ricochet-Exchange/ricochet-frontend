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
import { querySushiPlPirce } from 'api';

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
	const [marketPairPrice, setMarketPairPrice] = React.useState('');
	const { web3 } = useShallowSelector(selectMain);
	React.useEffect(() => {
		let isMounted = true;
		if (web3?.currentProvider === null) return;

		getPrice(web3).then((p) => {
			if (isMounted) {
				setLaunchPadPrice(p);
			}
		});

		querySushiPlPirce().then(({ data }) => {
			if (data?.data?.pair?.token1Price) {
				if (isMounted) {
					setMarketPairPrice(data?.data?.pair?.token1Price);
				}
			} else {
				console.error('fetching Sushi Pools price error: ', data);
			}
		});

		return () => {
			isMounted = false;
		};
	}, [web3]);

	if (!launchPadPrice && !marketPairPrice) return null;

	return (
		<div className={styles.balance_container}>
			<span className={styles.balance}>
				{flowType === FlowTypes.launchpad
					? `🚀  ${trimPad(launchPadPrice, 2)} ${coinA}/${coinB}`
					: `@ ${trimPad(marketPairPrice, 3)} ${coinA}/${coinB}`}
			</span>
		</div>
	);
}

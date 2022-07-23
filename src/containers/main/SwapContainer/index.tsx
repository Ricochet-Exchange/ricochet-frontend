import React, { useState, useEffect } from 'react';
// import { SwapWidget } from '@uniswap/widgets/dist/index.js';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { selectMain } from 'store/main/selectors';
import { ethers } from 'ethers';
import styles from './styles.module.scss';
import { SwapModal } from 'components/common/SwapModal';
// import '@uniswap/widgets/dist/fonts.css';

interface IProps {}

export const SwapContainer: React.FC<IProps> = () => {
	const { web3 } = useShallowSelector(selectMain);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
	const [inputSuperToken, setInputSuperToken] = useState('');
	const [outputSuperToken, setOutputSuperToken] = useState('');
	const [inputToken, setInputToken] = useState('');
	const [outputToken, setOutputToken] = useState('');
	const [inputAmount, setInputAmount] = useState('')
	const [outputAmount, setOutputAmount] = useState('')
	const jsonRpcEndpoint = 'https://polygon-rpc.com/';

	useEffect(() => {
		if (web3.currentProvider) {
			const web3Provider = new ethers.providers.Web3Provider(web3.currentProvider as any);
			setProvider(web3Provider);
		}
	}, [web3.currentProvider]);



	return (
		<div className={styles.outer_container}>
			{provider !== null ? (
				<SwapModal
					inputToken={inputToken}
					outputToken={outputToken}
					setInputToken={setInputSuperToken}
					setInputAmount={setInputAmount}
					setOutputToken={setOutputSuperToken}
					setOutputAmount={setOutputAmount}
				/>
			) : (
				'this is a failing test'
			)}
		</div>
	);
};

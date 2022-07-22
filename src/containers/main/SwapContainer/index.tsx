import React, { useState, useEffect } from 'react';
import { SwapWidget } from '@uniswap/widgets/dist/index.js';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { selectMain } from 'store/main/selectors';
import { ethers } from 'ethers';
import styles from './styles.module.scss';
import '@uniswap/widgets/dist/fonts.css';

interface IProps {}

export const SwapContainer: React.FC<IProps> = () => {
	const { web3 } = useShallowSelector(selectMain);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
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
				<SwapWidget provider={provider} jsonRpcEndpoint={jsonRpcEndpoint} />
			) : (
				'this is a failing test'
			)}
		</div>
	);
};

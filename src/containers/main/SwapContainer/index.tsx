import React from 'react';
import { SwapWidget } from '@uniswap/widgets';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { selectMain } from 'store/main/selectors';
import styles from './styles.module.scss';

export default function SwapContainer() {
	const { web3 } = useShallowSelector(selectMain);

	return <div className={styles.outer_container}></div>;
}

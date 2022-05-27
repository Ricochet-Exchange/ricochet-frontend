import React from 'react';
import { Coin, iconsCoin } from 'constants/coins';
import styles from './coinNode.styles.module.scss';

type CoinNodeProps = {
	balance: string;
	coin: Coin;
};

export const CoinNode = ({ balance, coin }: CoinNodeProps) => {
	const imgSrc = iconsCoin[coin];

	return (
		<div className={styles.coinNode}>
			<img src={imgSrc} alt={coin} width="16" height="16" />
			<span>{(+balance).toFixed(6)}</span>
			<span>{coin}</span>
		</div>
	);
};

import React from 'react';
import { Coin, iconsCoin } from 'constants/coins';
import ric from 'assets/images/coins/RicochetLogo.svg';
import styles from './coinNode.styles.module.scss';

type CoinNodeProps = {
	balance: string;
	coin: Coin;
};

export const CoinNode = ({ balance, coin }: CoinNodeProps) => {
	const imgSrc = coin === Coin.RIC ? ric : iconsCoin[coin];

	return (
		<div className={styles.coinNode}>
			<img src={imgSrc} alt={coin} width="16" height="16" style={{ borderRadius: '50%' }} />
			<span>{(+balance).toFixed(6)}</span>
			<span style={{ color: 'white' }}>{coin}</span>
		</div>
	);
};

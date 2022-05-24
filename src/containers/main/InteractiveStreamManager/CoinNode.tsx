import { Coin, iconsCoin } from 'constants/coins';
import React from 'react';

type CoinNodeProps = {
	balance: number;
	coin: Coin;
};

export const CoinNode = ({ balance, coin }: CoinNodeProps) => {
	const imgSrc = iconsCoin[coin];

	return (
		<div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
			<img src={imgSrc} alt={coin} width="16" height="16" />
			<span>{balance.toLocaleString()}</span>
			<span>{coin}</span>
		</div>
	);
};

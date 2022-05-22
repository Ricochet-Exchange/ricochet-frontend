import React, { FC } from 'react';
import { getAddressLink } from 'utils/getAddressLink';
import styles from './styles.module.scss';

type CoinPlaceholderProps = {
	token: string;
};

export const CoinPlaceholder: FC<CoinPlaceholderProps> = ({ token }) => {
	const link = getAddressLink(token);

	return (
		<a
			className={styles.coinPlaceholder}
			href={link}
			target="_blank"
			rel="noreferrer"
			onClick={(e) => e.stopPropagation()}
		>
			Coin
		</a>
	);
};

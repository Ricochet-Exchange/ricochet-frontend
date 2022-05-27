import React, { useEffect, useState } from 'react';
import { queryRicPirce } from 'api';
import styles from './styles.module.scss';

export const RicPrice = () => {
	const [ricPrice, setRicPrice] = useState<string | null>(null);
	useEffect(() => {
		let mounted = true;

		(async () => {
			const { data } = await queryRicPirce();
			if (data?.data?.pair?.token1Price) {
				if (mounted) {
					setRicPrice(data?.data?.pair?.token1Price);
				}
			} else {
				console.error('fetching RIC price error: ', data);
			}
		})();

		return () => {
			mounted = false;
		};
	}, []);

	if (!ricPrice) return null;

	return (
		<div className={styles.ric_price_container}>
			<span>{` @ ${ricPrice.slice(0, 5)} USDC/RIC `}</span>
		</div>
	);
};

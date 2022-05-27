import { queryRicPirce } from 'api';
import { FontIcon, FontIconName } from 'components/common/FontIcon';
import { Coin, iconsCoin } from 'constants/coins';
import React, { FC, useEffect, useState } from 'react';
import styles from './styles.module.scss';

const RicUsdxPoolPrice = () => {
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

	return <div className={styles.ric_price_container}>{ricPrice ? `$${ricPrice.slice(0, 5)}` : '-'}</div>;
};

interface IProps {
	nameCoinLeft: Coin;
	nameCoinRight: Coin;
}

export const CoinChange: FC<IProps> = ({ nameCoinLeft, nameCoinRight }) => (
	<div className={styles.currency}>
		<div className={styles.labels}>
			<div className={styles.img_usd}>
				<img src={iconsCoin[nameCoinLeft]} alt={nameCoinLeft} />
			</div>
			<div className={styles.img_bitcoin}>
				<img src={iconsCoin[nameCoinRight]} alt={nameCoinRight} />
			</div>
		</div>
		<div className={styles.currency_name_container}>
			<div className={styles.currency_name}>
				<div className={styles.currency_first}>{nameCoinLeft}</div>
				<div className={styles.arrow_circle_container}>
					<FontIcon name={FontIconName.ArrowRightCircled} className={styles.arrow_circle} size={20} />
				</div>
				<div className={styles.currency_second}>{nameCoinRight}</div>
			</div>
			{(nameCoinLeft === Coin.RIC || nameCoinRight === Coin.RIC) && <RicUsdxPoolPrice />}
		</div>
	</div>
);

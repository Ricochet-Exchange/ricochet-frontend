import cx from 'classnames';
import { AnimatedAmount } from 'components/common/AnimatedAmount';
import { FC } from 'react';
import { Coin } from '../../../constants/coins';
import styles from './styles.module.scss';

interface IProps {
	name: Coin;
	balance?: string;
	className?: string;

	stream?: string | number;
	timestamp?: number;
	direction?: -1 | 1;
	flowRatePerMonth?: string;
	conversionMultiplier?: number;
}

export const CoinBalancePanel: FC<IProps> = ({
	name,
	balance = '0',
	className,
	stream,
	timestamp,
	direction = 1,
	flowRatePerMonth,
	conversionMultiplier,
}) => {
	return (
		<div className={cx(styles.currency_balance, className)}>
			<div className={styles.currency_value}>
				{balance && timestamp && flowRatePerMonth && Number(flowRatePerMonth) > 0
					? stream && (
							<AnimatedAmount
								balance={balance}
								streamedSoFar={stream}
								streamedSoFarTimestamp={timestamp}
								direction={direction}
								flowRatePerMonth={flowRatePerMonth}
								conversionMultiplier={conversionMultiplier}
							/>
					  )
					: balance && (+balance).toFixed(6)}
			</div>

			{name === 'IbAlluoETH' || name === 'IbAlluoUSD' || name === 'IbAlluoBTC' ? (
				<div>{`st${name}`}</div>
			) : (
				<div>{`${name}x`}</div>
			)}
		</div>
	);
};

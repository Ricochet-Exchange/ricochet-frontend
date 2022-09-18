import ric from 'assets/images/coins/RicochetLogo.svg';
import { AnimatedAmount } from 'components/common/AnimatedAmount';
import { Coin, iconsCoin } from 'constants/coins';
import styles from './coinNode.styles.module.scss';

type CoinNodeProps = {
	balance: string;
	coin: Coin;
	flowRate?: string;
	direction: -1 | 1;
	streamedSoFar?: string | number;
	streamedSoFarTimestamp?: number;
	conversionMultiplier?: number;
};

export const CoinNode = ({
	balance,
	coin,
	flowRate = '0',
	direction,
	streamedSoFar,
	streamedSoFarTimestamp,
	conversionMultiplier = 1,
}: CoinNodeProps) => {
	const imgSrc = coin === Coin.RIC ? ric : iconsCoin[coin];
	return (
		<div className={styles.coinNode}>
			<img src={imgSrc} alt={coin} width="16" height="16" style={{ borderRadius: '50%' }} />
			{Boolean(flowRate) && streamedSoFar && streamedSoFarTimestamp ? (
				<span>
					<AnimatedAmount
						balance={+balance}
						streamedSoFar={+streamedSoFar}
						streamedSoFarTimestamp={streamedSoFarTimestamp}
						direction={direction}
						flowRatePerMonth={flowRate}
						conversionMultiplier={conversionMultiplier}
					/>
				</span>
			) : (
				<span>{(+balance).toFixed(6)}</span>
			)}
			<span style={{ color: 'white' }}>{coin}</span>
		</div>
	);
};

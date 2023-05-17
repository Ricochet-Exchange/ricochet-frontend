import React, { FC } from 'react';
import { FontIcon, FontIconName } from 'components/common/FontIcon';
import styles from './styles.module.scss';

export const Banner: FC = () => {
	return (
		<div className={styles.banner}>
			<FontIcon name={FontIconName.Warning} size={12} />
			<span>
				Version 3 REX Markets are live! Please visit{' '}
				<a color="blue" href="https://legacy.ricochet.exchange">
					legacy.ricochet.exchange
				</a>{' '}
				to close your streams and reopen them here.
			</span>
		</div>
	);
};

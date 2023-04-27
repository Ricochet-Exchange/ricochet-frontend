import React, { FC } from 'react';
import { FontIcon, FontIconName } from 'components/common/FontIcon';
import styles from './styles.module.scss';

export const Banner: FC = () => {
	return (
		<div className={styles.banner}>
			<FontIcon name={FontIconName.Warning} size={12} />
			<span>
				Version 3 REX Markets are live! Please close your streams and visit{' '}
				<a href="https://app.ricochet.exchange">app.ricochet.exchange</a> to start using the new version.
			</span>
		</div>
	);
};

import React from 'react';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { selectMain } from 'store/main/selectors';
import { HeaderContainer } from 'containers/main/HeaderContainer';
import { InvestNav } from 'components/layout/InvestNav';
import { Banner } from 'components/layout/Banner';
import { RICAddress } from 'constants/polygon_config';
import styles from './styles.module.scss';

interface IProps {}

export const MainLayout: React.FC<IProps> = ({ children }) => {
	const { address, balances } = useShallowSelector(selectMain);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<Banner />
				<HeaderContainer balance={balances && balances[RICAddress]} address={address || 'Connect Wallet'} />
			</div>

			<div className={styles.navbar}>
				<InvestNav />
			</div>
			<div className={styles.content}>{children}</div>
		</div>
	);
};

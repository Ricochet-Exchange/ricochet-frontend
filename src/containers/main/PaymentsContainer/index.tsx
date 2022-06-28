import React from 'react';
import { InvestNav } from 'components/layout/InvestNav';
import StreamManager from 'components/streaming/StreamManager';
import styles from './styles.module.scss';
import { StreamContainer } from '../StreamContainer';

interface IProps {}
export const PaymentsContainer: React.FC<IProps> = () => {
	return (
		<div className={styles.outer_container}>
			<InvestNav />

			<div className={styles.payment_page}>
				<StreamContainer />
				<StreamManager />
			</div>
		</div>
	);
};

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { selectMain } from 'store/main/selectors';
import StreamManager from 'components/streaming/StreamManager';
import styles from './styles.module.scss';
import { StreamContainer } from '../StreamContainer';

interface IProps {}
export const PaymentsContainer: React.FC<IProps> = () => {
	const { t } = useTranslation();
	const state = useShallowSelector(selectMain);
	const { address, balances } = state;

	return (
		<div className={styles.outer_container}>
			<div className={styles.payment_page}>
				<StreamContainer />
				<StreamManager />
			</div>
		</div>
	);
};

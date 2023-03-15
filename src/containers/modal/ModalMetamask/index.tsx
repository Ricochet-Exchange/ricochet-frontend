import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

export const ModalMetamask: React.FC = () => {
	const { t } = useTranslation();
	return (
		<div className={styles.wrap}>
			<p className={styles.title}>{t('Install Metamask')}</p>
			<a href="https://metamask.io/" rel="noopener noreferrer" className={styles.link}>
				https://metamask.io/
			</a>
		</div>
	);
};

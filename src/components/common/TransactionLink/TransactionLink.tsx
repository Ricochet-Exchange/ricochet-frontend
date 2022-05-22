import React, { FC } from 'react';
import { FontIcon, FontIconName } from 'components/common/FontIcon';
import { getTransactionLink } from 'utils/getTransactionLink';
import styles from './styles.module.scss';

type TransactionLinkProps = {
	transactionHash: string;
};

export const TransactionLink: FC<TransactionLinkProps> = ({ transactionHash }) => {
	const txLink = getTransactionLink(transactionHash);

	return (
		<a href={txLink} target="_blank" rel="noopener noreferrer" className={styles.transaction_link}>
			Tx:&nbsp;
			{transactionHash.slice(0, 8)}
			...
			{transactionHash.slice(-6)} <FontIcon name={FontIconName.External} size={16} />
		</a>
	);
};

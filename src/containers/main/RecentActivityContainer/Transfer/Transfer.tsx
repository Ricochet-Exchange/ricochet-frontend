import type { TransferEvent } from '@superfluid-finance/sdk-core';
import React, { FC } from 'react';
import { TransactionLink } from 'components/common/TransactionLink';
import { getTokenName } from 'utils/getTokenName';
import { TokenIcon } from 'components/common/TokenIcon';
import { CopiableAddress } from 'components/common/CopiableAddress';
import { CoinPlaceholder } from 'components/common/CoinPlaceholder';
import styles from '../styles.module.scss';

type TransferProps = {
	event: TransferEvent;
	/** wallet connected address */
	account: string;
};

export const Transfer: FC<TransferProps> = ({ event, account }) => {
	const { token, timestamp, from, to, transactionHash, value } = event;
	const tokenName = getTokenName(token);
	const time = new Date(timestamp * 1000).toString().split(' ')[4];

	const isUser = from === account.toLowerCase();

	/**
	 * stop propagation of event to prevent rendering mobile activity details page.
	 *
	 * @param e React.MouseEvent<HTMLDivElement>
	 */
	const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
	};

	return (
		<>
			<div className={styles.larger_streaming_wrapper}>
				<span>{time}</span>
				<div className={styles.larger_streaming_content}>
					<span>{isUser ? 'Sent' : 'Received'}</span>
					<TokenIcon tokenName={tokenName} />
					<span className={styles.amount}>
						{+value / 1e18} {tokenName ?? <CoinPlaceholder token={token} />}
					</span>
					<span>{isUser ? 'to' : 'from'}</span>
					<CopiableAddress address={isUser ? to : from} />
				</div>
				<div
					className={styles.transaction_link_wrapper}
					role="button"
					aria-hidden="true"
					onClick={stopPropagation}
				>
					<TransactionLink transactionHash={transactionHash} />
				</div>
			</div>
			<>
				<div className={styles.streaming_wrapper}>
					<div className={styles.streaming_content}>
						<span>{time}</span>
						<CopiableAddress address={isUser ? to : from} />
					</div>
					<div className={styles.recieved_wrapper}>
						<span>{isUser ? 'Sent' : 'Received'}</span>
						<TokenIcon tokenName={tokenName} />
						<span className={styles.amount}>
							{+value / 1e18} {tokenName ?? <CoinPlaceholder token={token} />}
						</span>
					</div>
				</div>
				<div className={styles.right_arrow}>
					<span>&gt;</span>
				</div>
			</>
		</>
	);
};

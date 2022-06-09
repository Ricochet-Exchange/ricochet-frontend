import type { FlowUpdatedEvent } from '@superfluid-finance/sdk-core';
import React, { FC, useState } from 'react';
import { getActivityCopying } from 'utils/getActivityCopying';
import deleteFlow from 'utils/superfluidStreams/deleteFlow';
import { calculateFlowRate } from 'utils/calculateFlowRate';
import { blockInvalidChar } from 'utils/blockInvalidChars';
import updateExistingFlow from 'utils/superfluidStreams/updateExistingFlow';
import { TransactionLink } from 'components/common/TransactionLink';
import { getTokenName } from 'utils/getTokenName';
import { TokenIcon } from 'components/common/TokenIcon';
import { CopiableAddress } from 'components/common/CopiableAddress';
import { CoinPlaceholder } from 'components/common/CoinPlaceholder';
import styles from './styles.module.scss';

type StreamFlowUpdatedProps = {
	event: FlowUpdatedEvent;
	/** wallet connected address */
	account: string;
	/**
	 * required when event is 'FlowUpdated'
	 * @see https://github.com/superfluid-finance/protocol-monorepo/blob/2fb0afd711479a3ca373de12d6643c0655f27b49/packages/sdk-core/src/types.ts#L7
	 */
	flowActionType: number;
};

export const StreamFlowUpdated: FC<StreamFlowUpdatedProps> = ({ event, account, flowActionType }) => {
	const { name, token, timestamp, sender, receiver, flowRate, transactionHash } = event;
	// streaming prefix
	let prefix = '';
	// streaming suffix
	let suffix = '';

	const SECONDS_PER_MONTH = 30 / 24 / 60 / 60;

	const tokenName = getTokenName(token);

	const time = new Date(timestamp * 1000).toString().split(' ')[4];

	const activityCopying = `${getActivityCopying(name)} in`;

	const isUser = sender === account.toLowerCase();

	const [updateOperation, toggleUpdate] = useState(false);
	const [updatedFlowRate, updateFlowRate] = useState('');

	if (isUser) {
		if (flowActionType === 2) {
			prefix = 'Canceled';
		} else {
			prefix = 'Started Outgoing';
			suffix = `of $${Math.trunc((+flowRate / 1e8) * SECONDS_PER_MONTH)} per month, $${(+flowRate / 1e18).toFixed(
				8,
			)} per second`;
		}
	} else if (flowActionType === 2) {
		prefix = 'Incoming';
		suffix = 'was canceled';
	} else {
		prefix = 'Received Incoming';
		suffix = `of $${Math.trunc((+flowRate / 1e8) * SECONDS_PER_MONTH)} per month, $${(+flowRate / 1e18).toFixed(
			8,
		)} per second`;
	}

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
				<div className={styles.larger_streaming_content}>
					<span className={styles.time_stamp}>{time}</span>
					<div className={styles.amount}>
						<span>
							{prefix} {activityCopying}
						</span>
						<div className={styles.token}>
							<TokenIcon tokenName={tokenName} />
							<span className={styles.token_name}>{tokenName ?? <CoinPlaceholder token={token} />}</span>
						</div>
					</div>
					to:
					<CopiableAddress address={isUser ? receiver : sender} />
					<span> {suffix}</span>
				</div>
				<div
					className={styles.transaction_link_wrapper}
					role="button"
					aria-hidden="true"
					onClick={stopPropagation}
				>
					<TransactionLink transactionHash={transactionHash} />
				</div>

				{isUser ? (
					<div className={styles.update_buttons}>
						<button
							className={styles.change_flow_update}
							onClick={() => {
								toggleUpdate(true);
							}}
						>
							Update Flow
						</button>

						<button
							className={styles.change_flow_cancel}
							onClick={() => {
								deleteFlow(sender, receiver, token);
							}}
						>
							Delete Flow
						</button>
					</div>
				) : (
					''
				)}

				{updateOperation ? (
					<div className={styles.updatePrompt}>
						<div className={styles.amount_container}>
							<h3 className={styles.amount_label}>What is the new payment amount?</h3>
							<input
								id="payment"
								className={styles.input_field}
								type="number"
								placeholder="Payment Amount Per month in"
								onKeyDown={blockInvalidChar}
								min={0}
								onChange={async (e) => {
									const newFlow = await calculateFlowRate(+e.target.value, 1);
									if (newFlow) {
										await updateFlowRate(newFlow.toString());
										console.log(newFlow.toString);
									}
								}}
							/>
							<span>Per month</span>
						</div>

						<button
							className={styles.amount_change}
							disabled={updatedFlowRate === ''}
							onClick={() => {
								updateExistingFlow(receiver, updatedFlowRate, token);
							}}
						>
							Confirm
						</button>
					</div>
				) : (
					''
				)}
			</div>
		</>
	);
};

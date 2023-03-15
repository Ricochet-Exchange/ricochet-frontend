import React, { FC } from 'react';
import type { ActivityEvents } from 'types/activity';
import { getActivityCopying } from 'utils/getActivityCopying';
import { TransactionLink } from 'components/common/TransactionLink';
import { FontIcon, FontIconName } from 'components/common/FontIcon';
import { getTokenName } from 'utils/getTokenName';
import { TokenIcon } from 'components/common/TokenIcon';
import { CopiableAddress } from 'components/common/CopiableAddress';
import { CoinPlaceholder } from 'components/common/CoinPlaceholder';
import styles from './styles.module.scss';

type DistributionProps = {
	token: string;
	tokenName?: string;
	oldUnits: string;
	units: string;
};

const Distribution: FC<DistributionProps> = ({ token, tokenName, oldUnits, units }) => {
	if (oldUnits === '0' || units === '0') {
		return null;
	}

	return (
		<>
			<div className={styles.amount_wrapper}>
				<span className={styles.amount}>
					{units} {tokenName ?? <CoinPlaceholder token={token} />}
				</span>
			</div>
			<p>Units</p>
		</>
	);
};

type ActivityDetailsProps = {
	event: ActivityEvents;
	/** wallet connected address */
	account: string;
	handleBack: () => void;
	/**
	 * required when event is 'FlowUpdated'
	 * @see https://github.com/superfluid-finance/protocol-monorepo/blob/2fb0afd711479a3ca373de12d6643c0655f27b49/packages/sdk-core/src/types.ts#L7
	 */
	flowActionType?: number;
};

export const ActivityDetails: FC<ActivityDetailsProps> = ({ event, account, handleBack, flowActionType = -1 }) => {
	const { name, timestamp, transactionHash, token } = event;
	const date = new Date(timestamp * 1000).toString();
	const day = date.split(' ').slice(1, 4).join(' ');
	const time = date.split(' ')[4];

	const tokenName = getTokenName(token);
	const activityCopying = getActivityCopying(name);

	let mobileSuffix = '';
	let streamUSD = '';
	let streamToken = '';

	const SECONDS_PER_MONTH = 30 / 24 / 60 / 60;

	if (name === 'FlowUpdated') {
		if (event.sender === account) {
			if (flowActionType === 2) {
				mobileSuffix = 'Canceled Stream';
				streamToken = `${(+event.flowRate / 1e18).toFixed(8)} per second`;
			} else {
				streamUSD = `$${Math.trunc((+event.flowRate / 1e8) * SECONDS_PER_MONTH)} per month`;
				streamToken = `${(+event.flowRate / 1e18).toFixed(8)} per second`;
				mobileSuffix = 'Outgoing stream';
			}
		} else if (flowActionType === 2) {
			mobileSuffix = 'Incoming Stream canceled';
			streamToken = `${(+event.flowRate / 1e18).toFixed(8)} per second`;
		} else {
			streamUSD = `$${Math.trunc((+event.flowRate / 1e8) * SECONDS_PER_MONTH)} per month`;
			streamToken = `${(+event.flowRate / 1e18).toFixed(8)} per second`;
			mobileSuffix = 'Incoming stream';
		}
	}

	let finnalCopying = '';

	switch (name) {
		case 'FlowUpdated':
			finnalCopying = mobileSuffix;
			break;

		case 'Transfer':
			if (event.from === account) {
				finnalCopying = `Outgoing ${activityCopying}`;
			} else {
				finnalCopying = `Incoming ${activityCopying}`;
			}
			break;

		case 'IndexUnitsUpdated':
			if (event.units === '0') {
				finnalCopying = 'Stopped distribution';
			} else if (event.oldUnits === '0') {
				finnalCopying = 'Started distribution';
			} else {
				finnalCopying = activityCopying;
			}
			break;

		default:
			finnalCopying = activityCopying;
			break;
	}

	return (
		<div>
			<button className={styles.back_button} onClick={handleBack}>
				<FontIcon name={FontIconName.ArrowLeft} size={16} />
				<span>Back</span>
			</button>
			<div className={styles.wrapper}>
				<div>
					<span>{finnalCopying}</span>
				</div>
				<p>Activity</p>
				<div className={styles.time}>
					<span>{day}</span>
					<span>{time}</span>
				</div>
				<p>Time</p>
				{(name === 'TokenUpgraded' || name === 'TokenDowngraded' || name === 'Transfer') && (
					<>
						<div className={styles.amount_wrapper}>
							<TokenIcon tokenName={tokenName} />
							{(name === 'TokenUpgraded' || name === 'TokenDowngraded') && (
								<span className={styles.amount}>
									{+event.amount / 1e18} {tokenName ?? <CoinPlaceholder token={token} />}
								</span>
							)}
							{name === 'Transfer' && (
								<span className={styles.amount}>
									{+event.value / 1e18} {tokenName ?? <CoinPlaceholder token={token} />}
								</span>
							)}
						</div>
						<p>Amount</p>
					</>
				)}
				{name === 'IndexUnitsUpdated' && (
					<Distribution token={token} tokenName={tokenName} units={event.units} oldUnits={event.oldUnits} />
				)}
				{name === 'FlowUpdated' && (
					<>
						<div className={styles.address_wrapper}>
							<CopiableAddress address={event.sender === account ? event.receiver : event.sender} />
						</div>
						<p>Merchant</p>
						{flowActionType === 2 ? null : (
							<>
								<p>{streamUSD}</p>
								<p>Stream in USD</p>
							</>
						)}
						<p>{streamToken}</p>
						<p>
							Stream in&nbsp;
							{tokenName ?? <CoinPlaceholder token={token} />}
						</p>
					</>
				)}
				{name === 'Transfer' && (
					<>
						<div className={styles.address_wrapper}>
							<CopiableAddress address={event.from === account ? event.to : event.from} />
						</div>
						<p>Merchant</p>
					</>
				)}
				<div className={styles.transaction_link_wrapper}>
					<TransactionLink transactionHash={transactionHash} />
				</div>
				<p>Transaction</p>
			</div>
		</div>
	);
};

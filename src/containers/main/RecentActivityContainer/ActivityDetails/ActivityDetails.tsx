import React, { FC } from 'react';
import { iconsCoin } from 'constants/coins';
import type { ActivityEvents } from 'types/activity';
import { getActivityCopying } from 'utils/getActivityCopying';
import { TransactionLink } from 'components/common/TransactionLink';
import { FontIcon, FontIconName } from 'components/common/FontIcon';
import { tokenCoinTransformer } from 'constants/tokenCoinMap';
import styles from './styles.module.scss';

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

export const ActivityDetails: FC<ActivityDetailsProps> = ({
  event,
  account,
  handleBack,
  flowActionType = -1,
}) => {
  const {
    name, timestamp, transactionHash, token,
  } = event;
  const date = new Date(timestamp * 1000).toString();
  const day = date.split(' ').slice(1, 4).join(' ');
  const time = date.split(' ')[4];

  const tokenName = tokenCoinTransformer.find(({ token: t }) => t === token)?.coin!;
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
        {(name === 'IndexSubscribed' || name === 'SubscriptionRevoked' || name === 'FlowUpdated') ? null : (
          <>
            <div className={styles.amount_wrapper}>
              <img
                src={iconsCoin[tokenName]}
                alt={tokenName}
                className={styles.token_icon}
              />
              {(name === 'TokenUpgraded' || name === 'TokenDowngraded') &&
                (
                <span className={styles.amount}>
                  {+event.amount / 1e18}
                  {' '}
                  {tokenName}
                </span>
                )}
              {name === 'IndexUnitsUpdated' && (
              <span className={styles.amount}>
                {event.units}
                {' '}
                {tokenName}
              </span>
              )}
              {name === 'Transfer' && (
                <span className={styles.amount}>
                  {+event.value / 1e18}
                  {' '}
                  {tokenName}
                </span>
              )}
            </div>
            <p>{(name === 'TokenUpgraded' || name === 'TokenDowngraded' || name === 'Transfer') ? 'Amount' : 'Unit'}</p>

          </>
        )}
        {(name === 'FlowUpdated') && (
          <>
            <div>
              <span>
                {event.sender === account ? `${event.receiver.slice(0, 7)}...${event.receiver.slice(-4)}` : `${event.sender.slice(0, 7)}...${event.sender.slice(-4)}`}
              </span>
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
              {tokenName}
            </p>
          </>
        )}
        {name === 'Transfer' && (
        <>
          <div>
            <span>
              {event.from === account ? `${event.to.slice(0, 7)}...${event.to.slice(-4)}` : `${event.from.slice(0, 7)}...${event.from.slice(-4)}`}
            </span>
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

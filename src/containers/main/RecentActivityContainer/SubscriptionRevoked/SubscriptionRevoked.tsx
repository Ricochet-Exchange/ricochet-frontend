import type { SubscriptionRevokedEvent } from '@superfluid-finance/sdk-core';
import React, { FC } from 'react';
import { iconsCoin } from 'constants/coins';
import { getActivityCopying } from 'utils/getActivityCopying';
import { TransactionLink } from 'components/common/TransactionLink';
import { tokenCoinTransformer } from 'constants/tokenCoinMap';
import styles from '../styles.module.scss';

type SubscriptionRevokedProps = {
  event: SubscriptionRevokedEvent;
};

export const SubscriptionRevoked: FC<SubscriptionRevokedProps> = ({ event }) => {
  const {
    name, timestamp, token, transactionHash, subscriber,
  } = event;

  const time = new Date(timestamp * 1000).toString().split(' ')[4];

  const activityCopying = `${getActivityCopying(name)} in`;

  const tokenName = tokenCoinTransformer.find(({ token: t }) => t === token)?.coin!;
  const subscriberCoying = `${subscriber.slice(0, 7)}...${subscriber.slice(-4)}`;

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
          <span>{time}</span>
          <span>{activityCopying}</span>
          <img src={iconsCoin[tokenName]} alt={tokenName} />
          <span className={styles.amount}>{tokenName}</span>
          <span>from</span>
          <span>{subscriberCoying}</span>
        </div>
        <div className={styles.transaction_link_wrapper} role="button" aria-hidden="true" onClick={stopPropagation}>
          <TransactionLink transactionHash={transactionHash} />
        </div>
      </div>
      <div className={styles.streaming_wrapper}>
        <div className={styles.streaming_content}>
          <span>{time}</span>
          <img src={iconsCoin[tokenName]} alt={tokenName} />
          <span className={styles.amount}>{tokenName}</span>
        </div>
        <div>
          <span>
            {`Unsubscribed to ${event.subscriber.slice(0, 7)}...${event.subscriber.slice(event.subscriber.length - 4)}`}
          </span>
        </div>
      </div>
      <div className={styles.right_arrow}>
        <span>
          &gt;
        </span>
      </div>
    </>
  );
};

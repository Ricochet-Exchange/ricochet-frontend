import type { SubscriptionRevokedEvent } from '@superfluid-finance/sdk-core';
import React, { FC } from 'react';
import { getActivityCopying } from 'utils/getActivityCopying';
import { TransactionLink } from 'components/common/TransactionLink';
import { getTokenName } from 'utils/getTokenName';
import { TokenIcon } from 'components/common/TokenIcon';
import { CopiableAddress } from 'components/common/CopiableAddress';
import { CoinPlaceholder } from 'components/common/CoinPlaceholder';
import styles from '../styles.module.scss';

type SubscriptionRevokedProps = {
  event: SubscriptionRevokedEvent;
};

export const SubscriptionRevoked: FC<SubscriptionRevokedProps> = ({ event }) => {
  const {
    name, timestamp, token, transactionHash, publisher,
  } = event;

  const time = new Date(timestamp * 1000).toString().split(' ')[4];

  const activityCopying = `${getActivityCopying(name)} in`;

  const tokenName = getTokenName(token);

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
          <TokenIcon tokenName={tokenName} />
          <span className={styles.amount}>{tokenName ?? <CoinPlaceholder token={token} />}</span>
          <span>from</span>
          <CopiableAddress address={publisher} />
        </div>
        <div className={styles.transaction_link_wrapper} role="button" aria-hidden="true" onClick={stopPropagation}>
          <TransactionLink transactionHash={transactionHash} />
        </div>
      </div>
      <div className={styles.streaming_wrapper}>
        <div className={styles.streaming_content}>
          <span>{time}</span>
          <TokenIcon tokenName={tokenName} />
          <span className={styles.amount}>{tokenName ?? <CoinPlaceholder token={token} />}</span>
        </div>
        <div>
          <span>
            Unsubscribed to&nbsp;
          </span>
          <CopiableAddress address={publisher} />
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

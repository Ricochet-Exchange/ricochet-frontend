import type { TokenDowngradedEvent, TokenUpgradedEvent } from '@superfluid-finance/sdk-core';
import React, { FC } from 'react';
import { getActivityCopying } from 'utils/getActivityCopying';
import { TransactionLink } from 'components/common/TransactionLink';
import { getTokenName } from 'utils/getTokenName';
import { TokenIcon } from 'components/common/TokenIcon';
import { CoinPlaceholder } from 'components/common/CoinPlaceholder';
import styles from '../styles.module.scss';

type TokenUpdatedProps = {
  event: TokenUpgradedEvent | TokenDowngradedEvent;
};

export const TokenUpdated: FC<TokenUpdatedProps> = ({ event }) => {
  const {
    name, timestamp, token, transactionHash,
  } = event;

  const time = new Date(timestamp * 1000).toString().split(' ')[4];
  const activityCopying = getActivityCopying(name);
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
        <div className={styles.streaming_content}>
          <span>{time}</span>
        </div>
        <div className={styles.larger_streaming_content}>
          <span>{activityCopying}</span>
          <TokenIcon tokenName={tokenName} />
          <span className={styles.amount}>
            {+event.amount / 1e18}
            {' '}
            {tokenName ?? <CoinPlaceholder token={token} />}
          </span>
        </div>
        <div className={styles.transaction_link_wrapper} role="button" aria-hidden="true" onClick={stopPropagation}>
          <TransactionLink transactionHash={transactionHash} />
        </div>
      </div>
      <div className={styles.streaming_wrapper}>
        <div className={styles.streaming_content}>
          <span>{time}</span>
          <TokenIcon tokenName={tokenName} />
          <span>{tokenName ?? <CoinPlaceholder token={token} />}</span>
        </div>
        <div>
          <span>
            {activityCopying}
            {' '}
            {+event.amount / 1e18}
            {' '}
            {tokenName ?? <CoinPlaceholder token={token} />}
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

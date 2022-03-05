import type { IndexUnitsUpdatedEvent } from '@superfluid-finance/sdk-core';
import React, { FC } from 'react';
import { getActivityCopying } from 'utils/getActivityCopying';
import { TransactionLink } from 'components/common/TransactionLink';
import { getTokenName } from 'utils/getTokenName';
import { TokenIcon } from 'components/common/TokenIcon';
import { CopiableAddress } from 'components/common/CopiableAddress';
import styles from '../styles.module.scss';

type IndexSubscribedProps = {
  event: IndexUnitsUpdatedEvent;
};

export const IndexUnitsUpdated: FC<IndexSubscribedProps> = ({ event }) => {
  const {
    name, token, timestamp, publisher, transactionHash, oldUnits, units,
  } = event;

  const tokenName = getTokenName(token);
  const time = new Date(timestamp * 1000).toString().split(' ')[4];

  let activityCopying = `${getActivityCopying(name)} in`;

  if (units === '0') {
    activityCopying = 'Stopped distribution in';
  } else if (oldUnits === '0') {
    activityCopying = 'Started distribution in';
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
          <span>{time}</span>
          <span>{activityCopying}</span>
          <TokenIcon tokenName={tokenName} />
          <span className={styles.amount}>{tokenName}</span>
          <span>from</span>
          <CopiableAddress address={publisher} />
          {(units !== '0' && oldUnits !== '0') && (
            <span>
              changed from 
              {' '}
              {oldUnits}
              {' '}
              to
              {' '}
              {units}
            </span>
          )}
        </div>
        <div className={styles.transaction_link_wrapper} role="button" aria-hidden="true" onClick={stopPropagation}>
          <TransactionLink transactionHash={transactionHash} />
        </div>
      </div>
      <div className={styles.streaming_wrapper}>
        <div className={styles.streaming_content}>
          <span>{time}</span>
          <TokenIcon tokenName={tokenName} />
          <span className={styles.amount}>{tokenName}</span>
        </div>
        <div>
          <span>
            Updated subscription from&nbsp;
          </span>
          <div className={styles.address_wrapper}>
            <CopiableAddress address={publisher} />
          </div>
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

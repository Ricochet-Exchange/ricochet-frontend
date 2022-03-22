import type { FlowUpdatedEvent } from '@superfluid-finance/sdk-core';
import React, { FC } from 'react';
import { getActivityCopying } from 'utils/getActivityCopying';
import { TransactionLink } from 'components/common/TransactionLink';
import { getTokenName } from 'utils/getTokenName';
import { TokenIcon } from 'components/common/TokenIcon';
import { CopiableAddress } from 'components/common/CopiableAddress';
import { CoinPlaceholder } from 'components/common/CoinPlaceholder';
import styles from '../styles.module.scss';

type FlowUpdatedProps = {
  event: FlowUpdatedEvent;
  /** wallet connected address */
  account: string;
  /**
   * required when event is 'FlowUpdated'
   * @see https://github.com/superfluid-finance/protocol-monorepo/blob/2fb0afd711479a3ca373de12d6643c0655f27b49/packages/sdk-core/src/types.ts#L7
  */
  flowActionType: number;
};
export const FlowUpdated: FC<FlowUpdatedProps> = ({
  event,
  account,
  flowActionType,
}) => {
  const {
    name, token, timestamp, sender, receiver, flowRate, transactionHash,
  } = event;
  // streaming prefix
  let prefix = '';
  // streaming suffix
  let suffix = '';

  const SECONDS_PER_MONTH = 30 / 24 / 60 / 60;

  const tokenName = getTokenName(token);
  let mobileSuffix = '';
  const time = new Date(timestamp * 1000).toString().split(' ')[4];

  const activityCopying = `${getActivityCopying(name)} in`;

  const isUser = sender === account.toLowerCase();

  if (isUser) {
    if (flowActionType === 2) {
      prefix = 'Canceled';
      mobileSuffix = 'Canceled Stream';
    } else {
      prefix = 'Started Outgoing';
      suffix = `of $${Math.trunc((+flowRate / 1e8) * SECONDS_PER_MONTH)} per month, $${(+flowRate / 1e18).toFixed(8)} per second`;
      mobileSuffix = `Outgoing stream of $${Math.trunc((+flowRate / 1e8) * SECONDS_PER_MONTH)} per month`;
    }
  } else if (flowActionType === 2) {
    prefix = 'Incoming';
    suffix = 'was canceled';
    mobileSuffix = 'Incoming Stream canceled';
  } else {
    prefix = 'Received Incoming';
    suffix = `of $${Math.trunc((+flowRate / 1e8) * SECONDS_PER_MONTH)} per month, $${(+flowRate / 1e18).toFixed(8)} per second`;
    mobileSuffix = `Incoming stream of $${Math.trunc((+flowRate / 1e8) * SECONDS_PER_MONTH)} per month`;
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
        <span>{time}</span>
        <div className={styles.larger_streaming_content}>
          <span>
            {prefix}
            {' '}
            {activityCopying}
          </span>
          <TokenIcon tokenName={tokenName} />
          <span className={styles.amount}>{tokenName ?? <CoinPlaceholder token={token} />}</span>
          <CopiableAddress address={isUser ? receiver : sender} />
          <span>
            {' '}
            {suffix}
          </span>
        </div>
        <div className={styles.transaction_link_wrapper} role="button" aria-hidden="true" onClick={stopPropagation}>
          <TransactionLink transactionHash={transactionHash} />
        </div>
      </div>
      <>
        <div className={styles.streaming_wrapper}>
          <div className={styles.streaming_content}>
            <span>{time}</span>
            <CopiableAddress address={isUser ? receiver : sender} />
          </div>
          <div>
            <span>
              {mobileSuffix}
            </span>
          </div>
        </div>
        <div className={styles.right_arrow}>
          <span>
            &gt;
          </span>
        </div>
      </>
    </>
  );
};

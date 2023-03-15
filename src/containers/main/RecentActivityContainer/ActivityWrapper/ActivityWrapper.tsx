import React, { FC } from 'react';
import type { ActivityEvents } from 'types/activity';
import { EmptyPage } from 'components/common/EmptyPage';
import { FlowUpdated } from '../FlowUpdated';
import { TokenUpdated } from '../TokenUpdated';
import { SubscriptionRevoked } from '../SubscriptionRevoked';
import { IndexSubscribed } from '../IndexSubscribed';
import { IndexUnitsUpdated } from '../IndexUnitsUpdated';
import { Transfer } from '../Transfer';

type ActivityWrapperProps = {
  event: ActivityEvents;
  /** wallet connected address */
  account: string;
  /**
   * required when event is 'FlowUpdated'
   * @see https://github.com/superfluid-finance/protocol-monorepo/blob/2fb0afd711479a3ca373de12d6643c0655f27b49/packages/sdk-core/src/types.ts#L7
  */
  flowActionType?: number
};

export const ActivityWrapper: FC<ActivityWrapperProps> = ({
  event, account, flowActionType = -1,
}) => {
  switch (event.name) {
    case 'Transfer':
      return <Transfer event={event} account={account} />;

    case 'TokenUpgraded':
    case 'TokenDowngraded':
      return <TokenUpdated event={event} />;

    case 'FlowUpdated':
      return <FlowUpdated event={event} account={account} flowActionType={flowActionType} />;

    case 'IndexUnitsUpdated':
      return <IndexUnitsUpdated event={event} />;

    case 'IndexSubscribed':
      return <IndexSubscribed event={event} />;

    case 'SubscriptionRevoked':
      return <SubscriptionRevoked event={event} />;

    default:
      return <EmptyPage />;
  }
};

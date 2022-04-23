import React, { FC } from 'react';
import type { ActivityEvents } from 'types/activity';
import { EmptyPage } from 'components/common/EmptyPage';
import { StreamFlowUpdated } from '../StreamFlowUpdated';

type StreamActivityWrapperProps = {
  event: ActivityEvents;
  /** wallet connected address */
  account: string;
  /**
   * required when event is 'FlowUpdated'
   * @see https://github.com/superfluid-finance/protocol-monorepo/blob/2fb0afd711479a3ca373de12d6643c0655f27b49/packages/sdk-core/src/types.ts#L7
  */
  flowActionType?: number
};

export const StreamActivityWrapper: FC<StreamActivityWrapperProps> = ({
  event, account, flowActionType = -1,
}) => {
  switch (event.name) {
    case 'FlowUpdated':
      return <StreamFlowUpdated event={event} account={account} flowActionType={flowActionType} />;

    default:
      return <EmptyPage />;
  }
};

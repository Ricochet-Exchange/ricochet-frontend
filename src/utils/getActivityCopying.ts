import type { ActivityNames } from 'types/activity';

const activityCopyingTransformer: Record<ActivityNames, string> = {
  TokenUpgraded: 'Wrapped',
  TokenDowngraded: 'Unwrapped',
  SubscriptionRevoked: 'Unsubscribed from distribution',
  IndexSubscribed: 'Subscribed to distribution',
  IndexUnitsUpdated: 'Distribution units',
  FlowUpdated: 'Stream',
  Transfer: 'Transfer',
};

export const getActivityCopying =
 (activityName: ActivityNames): string => activityCopyingTransformer[activityName];

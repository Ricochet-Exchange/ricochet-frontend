import {
	FlowUpdatedEvent,
	IndexSubscribedEvent,
	IndexUnitsUpdatedEvent,
	SubscriptionRevokedEvent,
	TokenDowngradedEvent,
	TokenUpgradedEvent,
	TransferEvent,
} from '@superfluid-finance/sdk-core';

export type ActivityNames =
	| 'TokenUpgraded'
	| 'TokenDowngraded'
	| 'SubscriptionRevoked'
	| 'IndexSubscribed'
	| 'IndexUnitsUpdated'
	| 'FlowUpdated'
	| 'Transfer';

export type ActivityEvents =
	| TransferEvent
	| FlowUpdatedEvent
	| TokenUpgradedEvent
	| TokenDowngradedEvent
	| IndexSubscribedEvent
	| SubscriptionRevokedEvent
	| IndexUnitsUpdatedEvent;

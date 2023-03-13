import {
	FlowUpdatedEvent,
	TokenUpgradedEvent,
	IndexUnitsUpdatedEvent,
	TokenDowngradedEvent,
	IndexSubscribedEvent,
	SubscriptionRevokedEvent,
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

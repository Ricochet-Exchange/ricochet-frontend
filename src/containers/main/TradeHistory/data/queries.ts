import { gql } from '@apollo/client';

/**
 * @see https://github.com/Ricochet-Exchange/ricochet-frontend/pull/694#issuecomment-1141946668
 *
 * type `0` or `2` means the stream has been `created` or `terminated`, not including `updated`:
 * @see https://github.com/superfluid-finance/protocol-monorepo/blob/6a151bcd9e4fc6b2b01a838b807320f003900809/packages/sdk-core/src/types.ts#L4-L7
 */
export const GET_STREAMS_CREATED = gql`
	query GetStreamsCreated($sender: String!, $receivers: [String!]!, $createdAtTimestamps: [String!]!) {
		streams: streams(
			where: { sender: $sender, receiver_in: $receivers, createdAtTimestamp_in: $createdAtTimestamps }
		) {
			flowUpdatedEvents(where: { type: 0 }) {
				transactionHash
				stream {
					createdAtTimestamp
					updatedAtTimestamp
				}
			}
		}
	}
`;

export const GET_CLAIM_AMOUNT_ALLUO = gql`
	query GetClaimAmmount {
		account(id: "0x114e5eabd33b34f3b7f481df4fc2617de6cd2b66") {
			outflows {
				flowUpdatedEvents {
					totalAmountStreamedUntilTimestamp
					stream {
						currentFlowRate
						createdAtTimestamp
						updatedAtTimestamp
					}
				}
				receiver {
					id
				}
			}
		}
	}
`;

export const GET_CLAIM_AMOUNT_REXSHIRT = gql`
	query GetClaimAmmount {
		account(id: "0x4965DD6Cc99e20B33B744374F132f7b5F8333a06") {
			outflows {
				flowUpdatedEvents {
					totalAmountStreamedUntilTimestamp
					stream {
						currentFlowRate
						createdAtTimestamp
						updatedAtTimestamp
					}
				}
				receiver {
					id
				}
			}
		}
	}
`;

export const GET_STREAMS_TERMINATED = gql`
	query GetStreamsTerminated($sender: String!, $receivers: [String!]!) {
		streams: flowUpdatedEvents(
			where: { sender: $sender, receiver_in: $receivers, type: 2 }
			orderBy: timestamp
			orderDirection: desc
			first: 100
		) {
			type
			stream {
				createdAtTimestamp
				streamedUntilUpdatedAt
				updatedAtTimestamp
				token {
					symbol
					id
				}
			}
			receiver
			timestamp
			totalAmountStreamedUntilTimestamp
			transactionHash
			id
		}
	}
`;

export const GET_DISTRIBUTIONS = gql`
	query GetUserDistributionSubscriptions($subscriber: String!, $updatedAtTimestamps: [String!]!) {
		distributions: indexSubscriptions(
			first: 1000
			where: { subscriber: $subscriber, updatedAtTimestamp_in: $updatedAtTimestamps }
			orderBy: createdAtTimestamp
			orderDirection: desc
		) {
			id
			totalAmountReceivedUntilUpdatedAt
			updatedAtBlockNumber
			updatedAtTimestamp
			createdAtTimestamp
			approved
			indexValueUntilUpdatedAt
			units
			index {
				publisher {
					id
				}
				indexValue
				indexId
				totalUnitsPending
				totalUnits
				updatedAtTimestamp
				createdAtTimestamp
				token {
					id
					name
					symbol
				}
			}
		}
	}
`;

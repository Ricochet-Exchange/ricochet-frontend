import { gql } from '@apollo/client';

/**
 * @see https://github.com/Ricochet-Exchange/ricochet-frontend/pull/694#issuecomment-1141946668
 * type 0 or 2 means the stream has been created or terminated, not including updated:
 * @see https://github.com/superfluid-finance/protocol-monorepo/blob/6a151bcd9e4fc6b2b01a838b807320f003900809/packages/sdk-core/src/types.ts#L4-L7
 */
export const GET_STREAMS = gql`
	query GetStreams($sender: String!, $receivers: [String!]!) {
		streams: flowUpdatedEvents(
			where: { sender: $sender, receiver_in: $receivers, type_in: [0, 2] }
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

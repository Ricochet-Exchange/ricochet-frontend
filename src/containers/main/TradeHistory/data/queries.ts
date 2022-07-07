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

export const GET_STREAMS_WITH_FLOW_UPDATED_EVENTS = gql`
	query GetStreamsWithFlowUpdatedEvents($sender: String!, $receivers: [String!]!) {
		streams: flowUpdatedEvents(
			where: { receiver_in: $receivers, sender: $sender }
			orderBy: timestamp
			orderDirection: desc
		) {
			type
			stream {
				id
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

export const GET_STREAM_PERIODS = gql`
	query Get_Stream_Periods($id_in: [ID!] = "") {
		streamPeriods(
			where: { stream_: { id_in: $id_in }, stoppedAtTimestamp_not: null }
			orderBy: startedAtTimestamp
			orderDirection: desc
		) {
			receiver {
				id
			}
			startedAtTimestamp
			stoppedAtTimestamp
			totalAmountStreamed
			token {
				symbol
			}
		}
	}
`;

export const GET_DISTRIBUTIONS = gql`
	query GetUserDistributionSubscriptions($subscriber: String!) {
		distributions: indexSubscriptions(
			first: 1000
			where: { subscriber: $subscriber }
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
				id
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

export const GET_INDEX_VALUES = gql`
	query GetIndexValues($index: String!, $timestamp_gte: BigInt, $timestamp_lte: BigInt) {
		indexUpdatedEvents(
			where: { index: $index, timestamp_gte: $timestamp_gte, timestamp_lte: $timestamp_lte }
			first: 1000
		) {
			newIndexValue
			oldIndexValue
		}
	}
`;

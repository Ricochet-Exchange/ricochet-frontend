import { gql } from '@apollo/client';

export const GET_STREAMS = gql`
	query getStreams($sender: String!, $receivers: [String!]!) {
		streams(
			first: 100
			orderBy: createdAtTimestamp
			orderDirection: desc
			where: { currentFlowRate_gt: "0", receiver_in: $receivers, sender: $sender }
		) {
			currentFlowRate
			receiver {
				id
			}
			streamedUntilUpdatedAt
			token {
				id
				symbol
			}
			updatedAtTimestamp
		}
	}
`;

export const GET_DISTRIBUTIONS = gql`
	query getDistributions($subscriber: String!, $updatedAtTimestamps: [String!]!) {
		indexSubscriptions(where: { subscriber: $subscriber, updatedAtTimestamp_in: $updatedAtTimestamps }) {
			totalAmountReceivedUntilUpdatedAt
			index {
				publisher {
					id
				}
				totalAmountDistributedUntilUpdatedAt
				token {
					id
					symbol
				}
				indexId
				indexValue
			}
			units
			indexValueUntilUpdatedAt
		}
	}
`;

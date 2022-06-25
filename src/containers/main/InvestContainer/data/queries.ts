import { gql } from '@apollo/client';

export const GET_STREAMS = gql`
	query getStreams($sender: String!, $receiver_in: [String!]!) {
		streams(
			first: 100
			orderBy: createdAtTimestamp
			orderDirection: desc
			where: { currentFlowRate_gt: "0", receiver_in: $receiver_in, sender: $sender }
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

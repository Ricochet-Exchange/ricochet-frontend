export const getQueryStreams = (sender: string) => `{
    streams(
      where: { sender: "${sender?.toLowerCase()}" }
    ) {
       id
        createdAtTimestamp
        createdAtBlockNumber
        updatedAtTimestamp
        updatedAtBlockNumber
        currentFlowRate
        streamedUntilUpdatedAt
        token {
            id
            symbol
         }
        receiver {
            id
        }
    }
  }`;

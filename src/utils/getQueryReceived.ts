export const getQueryReceived = (receiver: string) => `{
    streams(
      where: { receiver: "${receiver.toLowerCase()}" }
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
        sender {
            id
        }
    }
  }`;

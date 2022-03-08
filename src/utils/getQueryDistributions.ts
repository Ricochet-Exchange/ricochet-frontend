export const getQueryDistributions = (subscriber: string) => `{
    indexSubscriptions(
      where: { subscriber: "${subscriber.toLowerCase()}" }
    ) {
      id
       subscriber {
            id
        }
      totalAmountReceivedUntilUpdatedAt
      updatedAtTimestamp
      createdAtTimestamp
      approved
      indexValueUntilUpdatedAt
      units
      subscriptionUnitsUpdatedEvents(where: { units: 0 }) {
        timestamp
      }
      index {
        id
        indexUpdatedEvents(orderBy: timestamp, orderDirection: desc, first: 1) {
          timestamp
        }
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
  }`;

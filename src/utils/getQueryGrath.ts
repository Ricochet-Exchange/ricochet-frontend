export const getQueryGrath = (queryAddress: string) => `{
    account(id: "${queryAddress.toLowerCase()}") {
        flowsOwned(first: 1000) {
            lastUpdate
            flowRate
            sum
            recipient {
              id
            }
            token {
                id
                symbol
            }
            events {
              flowRate
              sum
              transaction {
                timestamp
              }
            }
        }
        flowsReceived(first: 1000, where:{flowRate_gt:0}) {
          lastUpdate
          flowRate
          sum
          owner {
            id
          }
          token {
              id 
              symbol
          }
          events {
            flowRate
            sum
            transaction {
              timestamp
            }
          }
        }

    }
  }`;

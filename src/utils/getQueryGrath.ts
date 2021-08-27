export const getQueryGrath = (queryAddress: string) => `{
    account(id: "${queryAddress.toLowerCase()}") {
        flowsOwned {
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
        flowsReceived(where:{flowRate_gt:0}) {
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

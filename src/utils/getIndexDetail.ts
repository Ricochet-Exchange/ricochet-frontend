import Web3 from 'web3';
import { Distribution } from '../store/distributions/types';

export const mapFromSubgraphResponse =
    async (web3: Web3, response:any):
    Promise<Distribution[]> => {
      const promises = (response?.data?.data?.indexSubscriptions || []).map(async (x: any) => {
        const updatedAtTimestamp =
            Number(x.subscriptionUnitsUpdatedEvents[0]?.timestamp || x.index.updatedAtTimestamp);
        const tokenId = web3.utils.toChecksumAddress(x.index.token.id);
        const publisher = web3.utils.toChecksumAddress(x.index.publisher.id);
        const subscriber = web3.utils.toChecksumAddress(x.subscriber.id);
        return {
          ...x,
          subscriber,
          publisher,
          index: x.index.id,
          token: tokenId,
          indexId: Number(x.index.indexId),
          symbol: x.index.token.symbol,
          name: x.index.token.name,
          indexTotalUnits: x.index.totalUnits,
          createdAtTimestamp: Number(x.createdAtTimestamp),
          updatedAtTimestamp: Number(updatedAtTimestamp),
          indexValueCurrent: x.index.indexValue,
        };
      });
      return Promise.all(promises);
    };

import Web3 from 'web3';
import { Distribution } from '../store/distributions/types';

export const mapFromSubgraphResponse = async (framework: any, response: any): Promise<Distribution[]> => {
	const promises = (response?.data?.data?.indexSubscriptions || []).map(async (x: any) => {
		const tokenId = Web3.utils.toChecksumAddress(x.index.token.id);
		const publisher = Web3.utils.toChecksumAddress(x.index.publisher.id);
		const subscriber = Web3.utils.toChecksumAddress(x.subscriber.id);
		const indexId = Number(x.index.indexId);
		const subscriptionDegtail = await framework.idaV1
			.getSubscription({
				providerOrSigner: framework.settings.provider,
				superToken: tokenId,
				publisher,
				indexId,
				subscriber,
			})
			.catch(console.error);
		const updatedAtTimestamp = Number(x.subscriptionUnitsUpdatedEvents[0]?.timestamp || x.index.updatedAtTimestamp);
		return {
			...x,
			approved: subscriptionDegtail?.approved || x.approved,
			units: subscriptionDegtail?.units || x.units,
			subscriber,
			publisher,
			index: x.index.id,
			token: tokenId,
			indexId: Number(indexId),
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

import { streamExchangeABI } from 'constants/ABIs/streamExchange';
import { getContract } from 'utils/getContract';
import Web3 from 'web3';
import { ExchangeKeys, getExchangeAddressFromKey } from './getExchangeAddress';

export const getLastDistributionOnPair = async (web3: Web3, exchangeKey: ExchangeKeys): Promise<Date> => {
	const contract = getContract(getExchangeAddressFromKey(exchangeKey), streamExchangeABI, web3);

	return await contract.methods
		.getLastDistributionAt()
		.call()
		.then((lastDist: any) => {
			return new Date(lastDist * 1000);
		})
		// If it fails, use the `lastDistributedAt` method available to REXUniswapV3Market contracts
		.catch((err: any) => {
			console.error("Handle when the contract doesn't have the `getLastDistributionAt` method");
			contract.methods
				.lastDistributedAt()
				.call()
				.then((lastDist: any) => {
					console.log('lastDist', lastDist);
					return new Date(lastDist * 1000);
				})
				.catch((err: any) => {
					console.log("Handle when the contract doesn't have the `lastDistributedAt` method");
					console.error(err);
				});
		});
};

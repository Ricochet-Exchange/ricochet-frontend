import Web3 from 'web3';
import { ExchangeKeys, getExchangeAddressFromKey } from './getExchangeAddress';
import { getContract } from './getContract';
import { streamExchangeABI } from '../constants/ABIs/streamExchange';
import { indexIDA } from '../constants/flowConfig';

export const getShareScaler = async (
	web3: Web3,
	exchangeKey: ExchangeKeys,
	tokenA: string,
	tokenB: string,
): Promise<number> => {
	const contract = getContract(getExchangeAddressFromKey(exchangeKey), streamExchangeABI, web3);

	const { outputIndex } = indexIDA.filter((data) => data.input === tokenA && data.output === tokenB)[0];
	return await contract.methods
		.outputPool(outputIndex)
		.call()
		.then((outputPool: any) => {
			return outputPool.shareScaler;
		})
		// If it fails, use the `shareScaler` method available to REXUniswapV3Market contracts
		.catch((err: any) => {
			contract.methods
				.shareScaler()
				.call()
				.then((shareScaler: any) => {
					return shareScaler;
				})
				.catch((err: any) => {
					console.error(err);
					return 1;
				});
		});
};

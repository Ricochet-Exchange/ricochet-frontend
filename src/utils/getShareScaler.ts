import Web3 from 'web3';
import { ExchangeKeys, getExchangeAddressFromKey } from './getExchangeAddress';
import { getContract } from './getContract';
import { streamExchangeABI } from '../constants/ABIs/streamExchange';

export const getShareScaler = async (
	web3: Web3,
	exchangeKey: ExchangeKeys,
	tokenA: string,
	tokenB: string,
): Promise<number> => {
	const contract = getContract(getExchangeAddressFromKey(exchangeKey), streamExchangeABI, web3);
	return await contract.methods
		.shareScaler()
		.call()
		.then((shareScaler: any) => {
			return shareScaler;
		})
		.catch((err: any) => {
			return 1;
		});
};

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
	const outputPool = await contract.methods.getOutputPool(outputIndex).call();
	return outputPool.shareScaler * 1e3;
};

import { streamExchangeABI } from 'constants/abis';
import { getContract } from 'utils/getContract';
import Web3 from 'web3';
import { ExchangeKeys, getExchangeAddressFromKey } from './getExchangeAddress';

export const getLastDistributionOnPair = async (
  web3: Web3,
  exchangeKey: ExchangeKeys,
): Promise<Date> => {
  const contract = getContract(
    getExchangeAddressFromKey(exchangeKey),
    streamExchangeABI,
    web3,
  );
  const lastDate = await contract.methods.getLastDistributionAt().call();
  const date = new Date(lastDate * 1000);
  return date;
};

import Web3 from 'web3';
// @ts-ignore
import { aggregate } from '@makerdao/multicall';

export const makeBatchRequest = async (calls: any[], web3: Web3) => {
  const config = { web3, multicallAddress: process.env.REACT_APP_MULTICALL_CONTRACT_ADDRESS };
  const response = await aggregate(calls, config);
  return response?.results?.transformed || [];
};

import Web3 from 'web3';
// @ts-ignore
import { aggregate } from '@makerdao/multicall';

export const makeBatchRequest = async (calls: any[], web3: Web3) => {
  const config = { web3, multicallAddress: '0x11ce4B23bD875D7F5C6a31084f55fDe1e9A87507' };
  const response = await aggregate(calls, config);
  return response?.results?.transformed || [];
};

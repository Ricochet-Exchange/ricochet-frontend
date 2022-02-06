import { launchpadABI, streamExchangeABI } from 'constants/abis';
import { getContract } from 'utils/getContract';
import { usdcxRicExchangeAddress } from 'constants/polygon_config';
import Web3 from 'web3';

export const getLastDistributionAtRexMarket = async (web3:Web3): Promise<Date> => {
  const contract = getContract(usdcxRicExchangeAddress, streamExchangeABI, web3);
  const lastDate = await contract.methods.getLastDistributionAt().call();
  const date = new Date(lastDate * 1000);
  return date;
};

export const getLastDistributionAtRexLaunchPad = async (web3:Web3): Promise<Date> => {
  const contract = getContract(usdcxRicExchangeAddress, launchpadABI, web3);
  const lastDate = await contract.methods.getLastDistributionAt().call();
  const date = new Date(lastDate * 1000);
  return date;
};

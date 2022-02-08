import { launchpadABI, streamExchangeABI } from 'constants/abis';
import { getContract } from 'utils/getContract';
import {
  daixEthxExchangeAddress,
  daixMaticxExchangeAddress,
  daixMkrxExchangeAddress,
  ethxDaixExchangeAddress,
  maticxDaixExchangeAddress,
  maticxUsdcxExchangeAddress,
  mkrxDaixExchangeAddress,
  mkrxUsdcxExchangeAddress,
  usdcxEthSlpxExchangeAddress,
  usdcxIdleExchangeAddress,
  usdcxMaticxExchangeAddress,
  usdcxMkrxExchangeAddress,
  usdcxRicExchangeAddress,
  usdcxWbtcxExchangeAddress,
  usdcxWethxExchangeAddress,
  wbtcxUsdcxExchangeAddress,
  wethxUsdcxExchangeAddress,
} from 'constants/polygon_config';
import Web3 from 'web3';

const getExchangeAddressFromKey = (exchangeKey: string) => {
  let address;
  switch (exchangeKey) {
    case 'wethxUsdcxExchangeAddress':
      address = wethxUsdcxExchangeAddress;
      break;
    case 'wbtcxUsdcxExchangeAddress':
      address = wbtcxUsdcxExchangeAddress;
      break;
    case 'usdcxWethxExchangeAddress':
      address = usdcxWethxExchangeAddress;
      break;
    case 'usdcxWbtcxExchangeAddress':
      address = usdcxWbtcxExchangeAddress;
      break;
    case 'daixEthxExchangeAddress':
      address = daixEthxExchangeAddress;
      break;
    case 'ethxDaixExchangeAddress':
      address = ethxDaixExchangeAddress;
      break;
    case 'daixMkrxExchangeAddress':
      address = daixMkrxExchangeAddress;
      break;
    case 'mkrxDaixExchangeAddress':
      address = mkrxDaixExchangeAddress;
      break;
    case 'usdcxMkrxExchangeAddress':
      address = usdcxMkrxExchangeAddress;
      break;
    case 'mkrxUsdcxExchangeAddress':
      address = mkrxUsdcxExchangeAddress;
      break;
    case 'usdcxMaticxExchangeAddress':
      address = usdcxMaticxExchangeAddress;
      break;
    case 'maticxUsdcxExchangeAddress':
      address = maticxUsdcxExchangeAddress;
      break;
    case 'daixMaticxExchangeAddress':
      address = daixMaticxExchangeAddress;
      break;
    case 'maticxDaixExchangeAddress':
      address = maticxDaixExchangeAddress;
      break;
    case 'usdcxRicExchangeAddress':
      address = usdcxRicExchangeAddress;
      break;
    case 'usdcxEthSlpxExchangeAddress':
      address = usdcxEthSlpxExchangeAddress;
      break;
    case 'usdcxIdleExchangeAddress':
      address = usdcxIdleExchangeAddress;
      break;
    default:
      address = usdcxRicExchangeAddress;
  }

  return address;
};

export const getLastDistributionAtRexMarket = async (
  web3: Web3,
): Promise<Date> => {
  const contract = getContract(
    usdcxRicExchangeAddress,
    streamExchangeABI,
    web3,
  );
  const lastDate = await contract.methods.getLastDistributionAt().call();
  const date = new Date(lastDate * 1000);
  return date;
};

export const getLastDistributionAtRexLaunchPad = async (
  web3: Web3,
): Promise<Date> => {
  const contract = getContract(usdcxRicExchangeAddress, launchpadABI, web3);
  const lastDate = await contract.methods.getLastDistributionAt().call();
  const date = new Date(lastDate * 1000);
  return date;
};

export const getLastDistributionOnPair = async (
  web3: Web3,
  exchangeKey: string,
): Promise<Date> => {
  const contract = getContract(
    getExchangeAddressFromKey(exchangeKey),
    launchpadABI,
    web3,
  );
  const lastDate = await contract.methods.getLastDistributionAt().call();
  const date = new Date(lastDate * 1000);
  return date;
};

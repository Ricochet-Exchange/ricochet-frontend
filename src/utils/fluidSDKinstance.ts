// @ts-ignore
import SuperfluidSDK from '@superfluid-finance/js-sdk';
import Web3 from 'web3';

export const getSuperFluid = async (web3:Web3, tokens:string[] = ['USDC', 'WBTC', 'ETH']) => {
  const superFluid = new SuperfluidSDK.Framework({
    web3,
    tokens,
    version: 'v1',
  });
  await superFluid.initialize();
  return superFluid;
};

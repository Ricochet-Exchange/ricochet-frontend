// @ts-ignore
import SuperfluidSDK from '@superfluid-finance/js-sdk';
import Web3 from 'web3';

export const getSuperFluid = async (web3:Web3) => {
  const superFluid = new SuperfluidSDK.Framework({
    web3,
    tokens: ['USDC', 'WBTC', 'ETH'],
    version: 'v1',
  });
  await superFluid.initialize();
  return superFluid;
};

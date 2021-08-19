// @ts-ignore 
import SuperfluidSDK from '@superfluid-finance/js-sdk';
import { Web3Provider } from '@ethersproject/providers';

export const getSuperFluid = async () => {
  const superFluid = new SuperfluidSDK.Framework({
    ethers: new Web3Provider((window as any).ethereum),
    tokens: ['DAI', 'ETH'],
    version: 'v1',
  });
  await superFluid.initialize();
  return superFluid;
};

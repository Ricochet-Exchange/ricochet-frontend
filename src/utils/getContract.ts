import web3 from './web3instance';

export const getContract = (address: string, abi: any) => {
  const contract = new web3.eth.Contract(abi, address);
  return contract;
};

import Web3 from 'web3';

export const getContract = (address: string, abi: any, web3:Web3) => {
  const contract = new web3.eth.Contract(abi, address);
  return contract;
};

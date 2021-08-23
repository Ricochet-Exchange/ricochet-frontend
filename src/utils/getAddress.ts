import web3 from './web3instance';

export const getAddress = async (): Promise<string> => {
  const accounts = await web3.eth.getAccounts();
  return accounts[0];
};

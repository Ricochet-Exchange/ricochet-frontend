import Web3 from 'web3';

export const getAddress = async (web3: Web3): Promise<string> => {
	const accounts = await web3.eth.getAccounts();
	console.log('getAddress', accounts);
	return accounts[0];
};

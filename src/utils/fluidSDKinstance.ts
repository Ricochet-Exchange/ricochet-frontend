// @ts-ignore
import Web3 from 'web3';
import { Framework } from '@superfluid-finance/sdk-core';
import { ethers } from 'ethers';

export const getSFFramework = async (web3: Web3) => {
	const provider = new ethers.providers.Web3Provider(web3.currentProvider as any);
	const framework = await Framework.create({
		provider,
		chainId: Number(process.env.REACT_APP_CHAIN_ID),
	});
	return framework;
};

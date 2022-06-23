import axios from 'axios';
import { getQueryGrath } from 'utils/getQueryGrath';
import { getQueryReceived } from 'utils/getQueryReceived';
import { getQueryDistributions } from 'utils/getQueryDistributions';
import { getQueryStreams } from 'utils/getQueryStreams';
import { getSushiPoolPrices } from 'utils/getSushiPoolPrice';
import { getQuickSwapPoolPrices } from 'utils/getQuickSwapPoolPrices';
import { getSushiSwapPoolPriceByBlock } from 'utils/getSushiSwapPoolPriceByBlock';
import { getQuickSwapPoolPriceByBlock } from 'utils/getQuickSwapPoolPriceByBlock';

export const queryFlows = async (queryAddress: string) => {
	const QUERY_URL = process.env.REACT_APP_API_GRATH || '';
	const query = getQueryGrath(queryAddress);

	return axios.post(QUERY_URL, { query });
};

export const queryDistributions = async (subscriber: string) => {
	// Dirty work beacuse somewhere it is hardccoded, not picking from .evn file.
	const QUERY_URL = `${(process.env.REACT_APP_API_GRATH || '').replace('/superfluid-matic', '')}/protocol-v1-matic`;
	const query = getQueryDistributions(subscriber);
	return axios.post(QUERY_URL, { query, variables: null });
};

export const queryStreams = async (address: string) => {
	const QUERY_URL = `${(process.env.REACT_APP_API_GRATH || '').replace('/superfluid-matic', '')}/protocol-v1-matic`;
	const query = getQueryStreams(address);

	return axios.post(QUERY_URL, { query });
};

export const queryReceived = async (receiver: string) => {
	const QUERY_URL = `${(process.env.REACT_APP_API_GRATH || '').replace('/superfluid-matic', '')}/protocol-v1-matic`;
	const query = getQueryReceived(receiver);

	return axios.post(QUERY_URL, { query });
};

export const querySushiPoolPrices = async (poolAddress: string) => {
	const QUERY_URL = `https://api.thegraph.com/subgraphs/name/sushiswap/matic-exchange`;
	const query = getSushiPoolPrices(poolAddress ?? '');

	return axios.post(QUERY_URL, { query });
};

export const queryQuickSwapPoolPrices = async (poolAddress: string) => {
	const QUERY_URL = 'https://api.thegraph.com/subgraphs/name/sameepsi/quickswap06';
	const query = getQuickSwapPoolPrices(poolAddress ?? '');

	return axios.post(QUERY_URL, { query });
};

export const querySushiSwapPoolPriceByBlock = async (poolAddress: string, blockNumber: number) => {
	const QUERY_URL = 'https://api.thegraph.com/subgraphs/name/sushiswap/matic-exchange';
	const query = getSushiSwapPoolPriceByBlock(poolAddress, blockNumber);

	return axios.post(QUERY_URL, { query });
};

export const queryQuickSwapPoolPriceByBlock = async (poolAddress: string, blockNumber: number) => {
	const QUERY_URL = 'https://api.thegraph.com/subgraphs/name/sameepsi/quickswap06';
	const query = getQuickSwapPoolPriceByBlock(poolAddress, blockNumber);

	return axios.post(QUERY_URL, { query });
};

import axios from 'axios';
import { getQueryGrath } from 'utils/getQueryGrath';
import { getQueryReceived } from 'utils/getQueryReceived';
import { getQueryDistributions } from 'utils/getQueryDistributions';
import { getQueryStreams } from 'utils/getQueryStreams';

export const queryFlows = async (
  queryAddress: string,
) => {
  const QUERY_URL = process.env.REACT_APP_API_GRATH || '';
  const query = getQueryGrath(queryAddress);

  return axios.post(QUERY_URL, { query });
};

export const queryDistributions = async (
  subscriber: string,
) => {
  // Dirty work beacuse somewhere it is hardccoded, not picking from .evn file.
  const QUERY_URL = `${(process.env.REACT_APP_API_GRATH || '').replace('/superfluid-matic', '')}/protocol-v1-matic`;
  const query = getQueryDistributions(subscriber);
  return axios.post(QUERY_URL, { query, variables: null });
};

export const queryStreams = async (
  address: string,
) => {
  const QUERY_URL = `${(process.env.REACT_APP_API_GRATH || '').replace('/superfluid-matic', '')}/protocol-v1-matic`;
  const query = getQueryStreams(address);
  
  return axios.post(QUERY_URL, { query });
};

export const queryReceived = async (
  receiver: string,
) => {
  const QUERY_URL = `${(process.env.REACT_APP_API_GRATH || '').replace('/superfluid-matic', '')}/protocol-v1-matic`;
  const query = getQueryReceived(receiver);
  
  return axios.post(QUERY_URL, { query });
};

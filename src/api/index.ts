import axios from 'axios';
import { getQueryGrath } from 'utils/getQueryGrath';
import { getQueryDistributions } from '../utils/getQueryDistributions';

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

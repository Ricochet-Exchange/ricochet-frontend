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
  console.log('v1 url', process.env.REACT_APP_SUPERFLUID_GRAPH_V1);
  const QUERY_URL = process.env.REACT_APP_SUPERFLUID_GRAPH_V1 || '';
  const query = getQueryDistributions(subscriber);
  return axios.post(QUERY_URL, { query, variables: null }).catch(console.error);
};

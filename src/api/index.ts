import axios from 'axios';
import { getQueryGrath } from 'utils/getQueryGrath';

export const queryFlows = async (
  queryAddress: string,
) => {
  const QUERY_URL = process.env.REACT_APP_API_GRATH || '';
  const query = getQueryGrath(queryAddress);

  return axios.post(QUERY_URL, { query });
};

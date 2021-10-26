import { stopFlow } from 'api/ethereum';
import { call } from 'redux-saga/effects';
import { transformError } from 'utils/transformError';
import { stopFlowAction } from '../actionCreators';
import { sweepQueryFlow } from './sweepQueryFlow';

export function* stopFlowSaga({ payload }: ReturnType<typeof stopFlowAction>) {
  try {
    const { config } = payload;
    yield call(stopFlow, config.superToken, config.tokenA);
    yield call(sweepQueryFlow);
    payload.callback();
  } catch (e) {
    const error = transformError(e);
    payload.callback(error);
  } 
}

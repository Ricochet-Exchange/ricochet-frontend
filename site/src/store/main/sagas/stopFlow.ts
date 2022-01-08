import { stopFlow } from 'api/ethereum';
import { call, select } from 'redux-saga/effects';
import { transformError } from 'utils/transformError';
import { stopFlowAction } from '../actionCreators';
import { sweepQueryFlow } from './sweepQueryFlow';
import { selectMain } from '../selectors';

export function* stopFlowSaga({ payload }: ReturnType<typeof stopFlowAction>) {
  try {
    const { config } = payload;
    const main: ReturnType<typeof selectMain> = yield select(selectMain);
    const { web3 } = main;
    yield call(stopFlow, config.superToken, config.tokenA, web3);
    yield call(sweepQueryFlow);
    payload.callback();
  } catch (e) {
    const error = transformError(e);
    payload.callback(error);
  } 
}

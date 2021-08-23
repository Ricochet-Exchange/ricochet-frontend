import { stopFlow } from 'api/ethereum';
import {
  DAIxAddress, daixWethxExchangeAddress, WETHxAddress, wethxDaixExchangeAddress,
} from 'constants/polygon_config';
import { call } from 'redux-saga/effects';
import { handleError } from 'utils/handleError';
import { daiWethStopFlow, wethDaiStopFlow } from '../actionCreators';
import { sweepQueryFlow } from './sweepQueryFlow';

export function* daiWethStopFlowSaga({ payload }: ReturnType<typeof daiWethStopFlow>) {
  try {
    yield call(stopFlow, daixWethxExchangeAddress, DAIxAddress);
    yield call(sweepQueryFlow);
  } catch (e) {
    yield call(handleError, e);
    if (e.code === -32603) {
      payload.callback("You don't have active streeming");
    }
  }
}

export function* wethDaiStopFlowSaga({ payload }: ReturnType<typeof wethDaiStopFlow>) {
  try {
    yield call(stopFlow, wethxDaixExchangeAddress, WETHxAddress);
    yield call(sweepQueryFlow);
  } catch (e) {
    yield call(handleError, e);
    if (e.code === -32603) {
      payload.callback("You don't have active streeming");
    }
  }
}

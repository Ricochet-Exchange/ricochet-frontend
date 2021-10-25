import { startFlow } from 'api/ethereum';
import { idaABI } from 'constants/abis';
import {
  idaAddress,
} from 'constants/polygon_config';
import { call } from 'redux-saga/effects';
import { Unwrap } from 'types/unwrap';
import { getContract } from 'utils/getContract';
import { transformError } from 'utils/transformError';
import { sweepQueryFlow } from './sweepQueryFlow';
import {

  startFlowAction,
} from '../actionCreators';

export function* startFlowSaga({ payload }: ReturnType<typeof startFlowAction >) {
  try {
    const idaContract: Unwrap<typeof getContract> = yield call(
      getContract,
      idaAddress,
      idaABI,
    );
    const { config } = payload;
    const normalizedAmount = Math.round((Number(payload.amount) * 1e18) / 2592000);
    yield call(startFlow,
      idaContract,
      config.superToken,
      config.tokenA,
      config.tokenB,
      normalizedAmount);
    payload.callback();
    yield call(sweepQueryFlow);
  } catch (e) {
    const error = transformError(e);
    payload.callback(error);
  } 
}

import { startFlow } from 'api/ethereum';
import { idaABI } from 'constants/abis';
import {
  idaAddress,
} from 'constants/polygon_config';
import { call, select } from 'redux-saga/effects';
import { Unwrap } from 'types/unwrap';
import { getContract } from 'utils/getContract';
import { transformError } from 'utils/transformError';
import { sweepQueryFlow } from './sweepQueryFlow';
import {

  startFlowAction,
} from '../actionCreators';
import { selectMain } from '../selectors';

export function* startFlowSaga({ payload }: ReturnType<typeof startFlowAction >) {
  try {
    const main: ReturnType<typeof selectMain> = yield select(selectMain);
    const { web3 } = main;
    const idaContract: Unwrap<typeof getContract> = yield call(
      getContract,
      idaAddress,
      idaABI, web3,
    );
    const { config } = payload;
    const normalizedAmount = Math.round((Number(payload.amount) * 1e18) / 2592000);
    yield call(startFlow,
      idaContract,
      config.superToken,
      config.tokenA,
      config.tokenB,
      normalizedAmount, web3);
    payload.callback();
    yield call(sweepQueryFlow);
  } catch (e) {
    const error = transformError(e);
    payload.callback(error);
  } 
}

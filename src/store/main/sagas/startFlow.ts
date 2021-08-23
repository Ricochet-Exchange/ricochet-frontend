import { startFlow } from 'api/ethereum';
import { idaABI } from 'constants/abis';
import {
  DAIxAddress, daixWethxExchangeAddress, idaAddress, WETHxAddress, wethxDaixExchangeAddress,
} from 'constants/polygon_config';
import { call } from 'redux-saga/effects';
import { Unwrap } from 'types/unwrap';
import { getContract } from 'utils/getContract';
import { handleError } from 'utils/handleError';
import { sweepQueryFlow } from './sweepQueryFlow';
import { daiWethStartFlow, wethDaiStartFlow } from '../actionCreators';

export function* daiWethStartFlowSaga({ payload }: ReturnType<typeof daiWethStartFlow>) {
  try {
    const idaContract: Unwrap<typeof getContract> = yield call(
      getContract,
      idaAddress,
      idaABI,
    );
    const normalizedAmount = Math.round((Number(payload.amount) * 1e18) / 2592000);
    yield call(startFlow,
      idaContract,
      daixWethxExchangeAddress,
      DAIxAddress,
      WETHxAddress,
      normalizedAmount);
    payload.callback();
    yield call(sweepQueryFlow);
  } catch (e) {
    // yield put(mainSetState({ disabled: true }));
    // TODO: handle errors properly
    // eslint-disable-next-line no-console
    console.log(e);
    yield call(handleError, e);
    if (e.code === -32603) {
      payload.callback(e.data.message);
    }
  }
}

export function* wethDaiStartFlowSaga({ payload }: ReturnType<typeof wethDaiStartFlow>) {
  try {
    const idaContract: Unwrap<typeof getContract> = yield call(
      getContract,
      idaAddress,
      idaABI,
    );
    const normalizedAmount = Math.round((Number(payload.amount) * 1e18) / 2592000);
    yield call(startFlow,
      idaContract,
      wethxDaixExchangeAddress,
      WETHxAddress,
      DAIxAddress,
      normalizedAmount);
    payload.callback();
    yield call(sweepQueryFlow);
  } catch (e) {
    // yield put(mainSetState({ disabled: true }));
    // TODO: handle errors properly
    if (e.code === -32603) {
      payload.callback(e.data.message);
    }
    yield call(handleError, e);
  }
}

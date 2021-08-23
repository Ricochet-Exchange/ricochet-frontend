import { startFlow } from 'api/ethereum';
import { idaABI } from 'constants/abis';
import {
  idaAddress,
  USDCxAddress, usdcxWethxExchangeAddress,
  WETHxAddress, wethxUsdcxExchangeAddress,
  WBTCxAddress, usdcxWbtcxExchangeAddress, wbtcxUsdcxExchangeAddress,
} from 'constants/polygon_config';
import { call } from 'redux-saga/effects';
import { Unwrap } from 'types/unwrap';
import { getContract } from 'utils/getContract';
import { handleError } from 'utils/handleError';
import { sweepQueryFlow } from './sweepQueryFlow';
import {
  usdcWethStartFlow,
  wethUsdcStartFlow,
  wbtcUsdcStartFlow,
  usdcWbtcStartFlow,
} from '../actionCreators';

export function* usdcWethStartFlowSaga({ payload }: ReturnType<typeof usdcWethStartFlow>) {
  try {
    const idaContract: Unwrap<typeof getContract> = yield call(
      getContract,
      idaAddress,
      idaABI,
    );
    const normalizedAmount = Math.round((Number(payload.amount) * 1e18) / 2592000);
    yield call(startFlow,
      idaContract,
      usdcxWethxExchangeAddress,
      USDCxAddress,
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

export function* usdcWbtcStartFlowSaga({ payload }: ReturnType<typeof usdcWbtcStartFlow>) {
  try {
    const idaContract: Unwrap<typeof getContract> = yield call(
      getContract,
      idaAddress,
      idaABI,
    );
    const normalizedAmount = Math.round((Number(payload.amount) * 1e18) / 2592000);
    yield call(startFlow,
      idaContract,
      usdcxWbtcxExchangeAddress,
      USDCxAddress,
      WBTCxAddress,
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

export function* wethUsdcStartFlowSaga({ payload }: ReturnType<typeof wethUsdcStartFlow>) {
  try {
    const idaContract: Unwrap<typeof getContract> = yield call(
      getContract,
      idaAddress,
      idaABI,
    );
    const normalizedAmount = Math.round((Number(payload.amount) * 1e18) / 2592000);
    yield call(startFlow,
      idaContract,
      wethxUsdcxExchangeAddress,
      WETHxAddress,
      USDCxAddress,
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

export function* wbtcUsdcStartFlowSaga({ payload }: ReturnType<typeof wbtcUsdcStartFlow>) {
  try {
    const idaContract: Unwrap<typeof getContract> = yield call(
      getContract,
      idaAddress,
      idaABI,
    );
    const normalizedAmount = Math.round((Number(payload.amount) * 1e18) / 2592000);
    yield call(startFlow,
      idaContract,
      wbtcxUsdcxExchangeAddress,
      WBTCxAddress,
      USDCxAddress,
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

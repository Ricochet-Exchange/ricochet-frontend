import { startFlow } from 'api/ethereum';
import { idaABI } from 'constants/abis';
import {
  idaAddress,
  MKRxAddress, mkrxDaixExchangeAddress,
  DAIxAddress, daixMkrxExchangeAddress,
  USDCxAddress, usdcxWethxExchangeAddress,
  WETHxAddress, wethxUsdcxExchangeAddress,
  WBTCxAddress, usdcxWbtcxExchangeAddress, wbtcxUsdcxExchangeAddress,
} from 'constants/polygon_config';
import { call, put } from 'redux-saga/effects';
import { Unwrap } from 'types/unwrap';
import { getContract } from 'utils/getContract';
import { transformError } from 'utils/transformError';
import { sweepQueryFlow } from './sweepQueryFlow';
import {
  daiMkrStartFlow,
  mkrDaiStartFlow,
  usdcWethStartFlow,
  wethUsdcStartFlow,
  wbtcUsdcStartFlow,
  usdcWbtcStartFlow,
  mainSetState,
} from '../actionCreators';

export function* usdcWethStartFlowSaga({ payload }: ReturnType<typeof usdcWethStartFlow>) {
  try {
    yield put(mainSetState({ isLoadingUsdcWethFlow: true }));
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
    const error = transformError(e);
    payload.callback(error);
  } finally {
    yield put(mainSetState({ isLoadingUsdcWethFlow: false }));
  }
}

export function* usdcWbtcStartFlowSaga({ payload }: ReturnType<typeof usdcWbtcStartFlow>) {
  try {
    yield put(mainSetState({ isLoadingUsdcWbtcFlow: true }));
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
    const error = transformError(e);
    payload.callback(error);
  } finally {
    yield put(mainSetState({ isLoadingUsdcWbtcFlow: false }));
  }
}

export function* wethUsdcStartFlowSaga({ payload }: ReturnType<typeof wethUsdcStartFlow>) {
  try {
    yield put(mainSetState({ isLoadingWethFlow: true }));
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
    const error = transformError(e);
    payload.callback(error);
  } finally {
    yield put(mainSetState({ isLoadingWethFlow: false }));
  }
}

export function* wbtcUsdcStartFlowSaga({ payload }: ReturnType<typeof wbtcUsdcStartFlow>) {
  try {
    yield put(mainSetState({ isLoadingWbtcFlow: true }));
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
    const error = transformError(e);
    payload.callback(error);
  } finally {
    yield put(mainSetState({ isLoadingWbtcFlow: false }));
  }
}

export function* daiMkrStartFlowSaga({ payload }: ReturnType<typeof daiMkrStartFlow>) {
  try {
    yield put(mainSetState({ isLoadingDaiMkrFlow: true }));
    const idaContract: Unwrap<typeof getContract> = yield call(
      getContract,
      idaAddress,
      idaABI,
    );
    const normalizedAmount = Math.round((Number(payload.amount) * 1e18) / 2592000);
    yield call(startFlow,
      idaContract,
      daixMkrxExchangeAddress,
      DAIxAddress,
      MKRxAddress,
      normalizedAmount);
    payload.callback();
    yield call(sweepQueryFlow);
  } catch (e) {
    const error = transformError(e);
    payload.callback(error);
  } finally {
    yield put(mainSetState({ isLoadingDaiMkrFlow: false }));
  }
}

export function* mkrDaiStartFlowSaga({ payload }: ReturnType<typeof mkrDaiStartFlow>) {
  try {
    yield put(mainSetState({ isLoadingMkrDaiFlow: true }));
    const idaContract: Unwrap<typeof getContract> = yield call(
      getContract,
      idaAddress,
      idaABI,
    );
    const normalizedAmount = Math.round((Number(payload.amount) * 1e18) / 2592000);
    yield call(startFlow,
      idaContract,
      mkrxDaixExchangeAddress,
      MKRxAddress,
      DAIxAddress,
      normalizedAmount);
    payload.callback();
    yield call(sweepQueryFlow);
  } catch (e) {
    const error = transformError(e);
    payload.callback(error);
  } finally {
    yield put(mainSetState({ isLoadingMkrDaiFlow: false }));
  }
}

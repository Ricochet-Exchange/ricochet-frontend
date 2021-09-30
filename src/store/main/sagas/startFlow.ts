import { startFlow } from 'api/ethereum';
import { idaABI } from 'constants/abis';
import {
  idaAddress,
  MKRxAddress, mkrxDaixExchangeAddress,
  DAIxAddress, daixMkrxExchangeAddress,
  USDCxAddress, usdcxWethxExchangeAddress, usdcxMkrxExchangeAddress, mkrxUsdcxExchangeAddress,
  MATICxAddress, maticxDaixExchangeAddress, maticxUsdcxExchangeAddress,
  usdcxMaticxExchangeAddress, daixMaticxExchangeAddress,
  WETHxAddress, wethxUsdcxExchangeAddress, daixEthxExchangeAddress, ethxDaixExchangeAddress,
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
  usdcMkrStartFlow,
  mkrUsdcStartFlow,
  daiMaticStartFlow,
  maticDaiStartFlow,
  usdcMaticStartFlow,
  maticUsdcStartFlow,
  daiEthStartFlow,
  ethDaiStartFlow,
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

export function* usdcMkrStartFlowSaga({ payload }: ReturnType<typeof usdcMkrStartFlow>) {
  try {
    yield put(mainSetState({ isLoadingUsdcMkrFlow: true }));
    const idaContract: Unwrap<typeof getContract> = yield call(
      getContract,
      idaAddress,
      idaABI,
    );
    const normalizedAmount = Math.round((Number(payload.amount) * 1e18) / 2592000);
    yield call(startFlow,
      idaContract,
      usdcxMkrxExchangeAddress,
      USDCxAddress,
      MKRxAddress,
      normalizedAmount);
    payload.callback();
    yield call(sweepQueryFlow);
  } catch (e) {
    const error = transformError(e);
    payload.callback(error);
  } finally {
    yield put(mainSetState({ isLoadingUsdcMkrFlow: false }));
  }
}

export function* mkrUsdcStartFlowSaga({ payload }: ReturnType<typeof mkrUsdcStartFlow>) {
  try {
    yield put(mainSetState({ isLoadingMkrUsdcFlow: true }));
    const idaContract: Unwrap<typeof getContract> = yield call(
      getContract,
      idaAddress,
      idaABI,
    );
    const normalizedAmount = Math.round((Number(payload.amount) * 1e18) / 2592000);
    yield call(startFlow,
      idaContract,
      mkrxUsdcxExchangeAddress,
      MKRxAddress,
      USDCxAddress,
      normalizedAmount);
    payload.callback();
    yield call(sweepQueryFlow);
  } catch (e) {
    const error = transformError(e);
    payload.callback(error);
  } finally {
    yield put(mainSetState({ isLoadingMkrUsdcFlow: false }));
  }
}

export function* daiEthStartFlowSaga({ payload }: ReturnType<typeof daiEthStartFlow>) {
  try {
    yield put(mainSetState({ isLoadingDaiEthFlow: true }));
    const idaContract: Unwrap<typeof getContract> = yield call(
      getContract,
      idaAddress,
      idaABI,
    );
    const normalizedAmount = Math.round((Number(payload.amount) * 1e18) / 2592000);
    yield call(startFlow,
      idaContract,
      daixEthxExchangeAddress,
      DAIxAddress,
      WETHxAddress,
      normalizedAmount);
    payload.callback();
    yield call(sweepQueryFlow);
  } catch (e) {
    const error = transformError(e);
    payload.callback(error);
  } finally {
    yield put(mainSetState({ isLoadingDaiEthFlow: false }));
  }
}

export function* ethDaiStartFlowSaga({ payload }: ReturnType<typeof ethDaiStartFlow>) {
  try {
    yield put(mainSetState({ isLoadingEthDaiFlow: true }));
    const idaContract: Unwrap<typeof getContract> = yield call(
      getContract,
      idaAddress,
      idaABI,
    );
    const normalizedAmount = Math.round((Number(payload.amount) * 1e18) / 2592000);
    yield call(startFlow,
      idaContract,
      ethxDaixExchangeAddress,
      WETHxAddress,
      DAIxAddress,
      normalizedAmount);
    payload.callback();
    yield call(sweepQueryFlow);
  } catch (e) {
    const error = transformError(e);
    payload.callback(error);
  } finally {
    yield put(mainSetState({ isLoadingEthDaiFlow: false }));
  }
}

export function* daiMaticStartFlowSaga({ payload }: ReturnType<typeof daiMaticStartFlow>) {
  try {
    yield put(mainSetState({ isLoadingDaiMaticFlow: true }));
    const idaContract: Unwrap<typeof getContract> = yield call(
      getContract,
      idaAddress,
      idaABI,
    );
    const normalizedAmount = Math.round((Number(payload.amount) * 1e18) / 2592000);
    yield call(startFlow,
      idaContract,
      daixMaticxExchangeAddress,
      DAIxAddress,
      MATICxAddress,
      normalizedAmount);
    payload.callback();
    yield call(sweepQueryFlow);
  } catch (e) {
    const error = transformError(e);
    payload.callback(error);
  } finally {
    yield put(mainSetState({ isLoadingDaiMaticFlow: false }));
  }
}

export function* maticDaiStartFlowSaga({ payload }: ReturnType<typeof maticDaiStartFlow>) {
  try {
    yield put(mainSetState({ isLoadingMaticDaiFlow: true }));
    const idaContract: Unwrap<typeof getContract> = yield call(
      getContract,
      idaAddress,
      idaABI,
    );
    const normalizedAmount = Math.round((Number(payload.amount) * 1e18) / 2592000);
    yield call(startFlow,
      idaContract,
      maticxDaixExchangeAddress,
      MATICxAddress,
      DAIxAddress,
      normalizedAmount);
    payload.callback();
    yield call(sweepQueryFlow);
  } catch (e) {
    const error = transformError(e);
    payload.callback(error);
  } finally {
    yield put(mainSetState({ isLoadingMaticDaiFlow: false }));
  }
}

export function* usdcMaticStartFlowSaga({ payload }: ReturnType<typeof usdcMaticStartFlow>) {
  try {
    yield put(mainSetState({ isLoadingUsdcMaticFlow: true }));
    const idaContract: Unwrap<typeof getContract> = yield call(
      getContract,
      idaAddress,
      idaABI,
    );
    const normalizedAmount = Math.round((Number(payload.amount) * 1e18) / 2592000);
    yield call(startFlow,
      idaContract,
      usdcxMaticxExchangeAddress,
      USDCxAddress,
      MATICxAddress,
      normalizedAmount);
    payload.callback();
    yield call(sweepQueryFlow);
  } catch (e) {
    const error = transformError(e);
    payload.callback(error);
  } finally {
    yield put(mainSetState({ isLoadingUsdcMaticFlow: false }));
  }
}

export function* maticUsdcStartFlowSaga({ payload }: ReturnType<typeof maticUsdcStartFlow>) {
  try {
    yield put(mainSetState({ isLoadingMaticUsdcFlow: true }));
    const idaContract: Unwrap<typeof getContract> = yield call(
      getContract,
      idaAddress,
      idaABI,
    );
    const normalizedAmount = Math.round((Number(payload.amount) * 1e18) / 2592000);
    yield call(startFlow,
      idaContract,
      maticxUsdcxExchangeAddress,
      MATICxAddress,
      USDCxAddress,
      normalizedAmount);
    payload.callback();
    yield call(sweepQueryFlow);
  } catch (e) {
    const error = transformError(e);
    payload.callback(error);
  } finally {
    yield put(mainSetState({ isLoadingMaticUsdcFlow: false }));
  }
}

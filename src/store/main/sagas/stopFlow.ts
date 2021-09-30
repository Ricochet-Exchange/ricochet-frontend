import { stopFlow } from 'api/ethereum';
import {
  MKRxAddress, mkrxDaixExchangeAddress,
  DAIxAddress, daixMkrxExchangeAddress,
  USDCxAddress, usdcxWethxExchangeAddress, usdcxMkrxExchangeAddress, mkrxUsdcxExchangeAddress,
  MATICxAddress, maticxDaixExchangeAddress, maticxUsdcxExchangeAddress,
  usdcxMaticxExchangeAddress, daixMaticxExchangeAddress,
  WETHxAddress, wethxUsdcxExchangeAddress, daixEthxExchangeAddress, ethxDaixExchangeAddress,
  WBTCxAddress, usdcxWbtcxExchangeAddress, wbtcxUsdcxExchangeAddress,
} from 'constants/polygon_config';
import { call, put } from 'redux-saga/effects';
import { transformError } from 'utils/transformError';
import {
  daiMkrStopFlow,
  mkrDaiStopFlow,
  usdcMkrStopFlow,
  mkrUsdcStopFlow,
  daiMaticStopFlow,
  maticDaiStopFlow,
  usdcMaticStopFlow,
  maticUsdcStopFlow,
  daiEthStopFlow,
  ethDaiStopFlow,
  usdcWethStopFlow,
  usdcWbtcStopFlow,
  wethUsdcStopFlow,
  wbtcUsdcStopFlow,
  mainSetState,
} from '../actionCreators';
import { sweepQueryFlow } from './sweepQueryFlow';

export function* usdcWethStopFlowSaga({ payload }: ReturnType<typeof usdcWethStopFlow>) {
  try {
    yield put(mainSetState({ isLoadingUsdcWethFlow: true }));
    yield call(stopFlow, usdcxWethxExchangeAddress, USDCxAddress);
    yield call(sweepQueryFlow);
    payload.callback();
  } catch (e) {
    const error = transformError(e);
    payload.callback(error);
  } finally {
    yield put(mainSetState({ isLoadingUsdcWethFlow: false }));
  }
}

export function* usdcWbtcStopFlowSaga({ payload }: ReturnType<typeof usdcWbtcStopFlow>) {
  try {
    yield put(mainSetState({ isLoadingUsdcWbtcFlow: true }));
    yield call(stopFlow, usdcxWbtcxExchangeAddress, USDCxAddress);
    yield call(sweepQueryFlow);
    payload.callback();
  } catch (e) {
    const error = transformError(e);
    payload.callback(error);
  } finally {
    yield put(mainSetState({ isLoadingUsdcWbtcFlow: false }));
  }
}

export function* wethUsdcStopFlowSaga({ payload }: ReturnType<typeof wethUsdcStopFlow>) {
  try {
    yield put(mainSetState({ isLoadingWethFlow: true }));
    yield call(stopFlow, wethxUsdcxExchangeAddress, WETHxAddress);
    yield call(sweepQueryFlow);
    payload.callback();
  } catch (e) {
    const error = transformError(e);
    payload.callback(error);
  } finally {
    yield put(mainSetState({ isLoadingWethFlow: false }));
  }
}

export function* wbtcUsdcStopFlowSaga({ payload }: ReturnType<typeof wbtcUsdcStopFlow>) {
  try {
    yield put(mainSetState({ isLoadingWbtcFlow: true }));
    yield call(stopFlow, wbtcxUsdcxExchangeAddress, WBTCxAddress);
    yield call(sweepQueryFlow);
    payload.callback();
  } catch (e) {
    const error = transformError(e);
    payload.callback(error);
  } finally {
    yield put(mainSetState({ isLoadingWbtcFlow: false }));
  }
}

export function* daiMkrStopFlowSaga({ payload }: ReturnType<typeof daiMkrStopFlow>) {
  try {
    yield put(mainSetState({ isLoadingDaiMkrFlow: true }));
    yield call(stopFlow, daixMkrxExchangeAddress, DAIxAddress);
    yield call(sweepQueryFlow);
    payload.callback();
  } catch (e) {
    const error = transformError(e);
    payload.callback(error);
  } finally {
    yield put(mainSetState({ isLoadingDaiMkrFlow: false }));
  }
}

export function* mkrDaiStopFlowSaga({ payload }: ReturnType<typeof mkrDaiStopFlow>) {
  try {
    yield put(mainSetState({ isLoadingMkrDaiFlow: true }));
    yield call(stopFlow, mkrxDaixExchangeAddress, MKRxAddress);
    yield call(sweepQueryFlow);
    payload.callback();
  } catch (e) {
    const error = transformError(e);
    payload.callback(error);
  } finally {
    yield put(mainSetState({ isLoadingMkrDaiFlow: false }));
  }
}

export function* usdcMkrStopFlowSaga({ payload }: ReturnType<typeof usdcMkrStopFlow>) {
  try {
    yield put(mainSetState({ isLoadingUsdcMkrFlow: true }));
    yield call(stopFlow, usdcxMkrxExchangeAddress, USDCxAddress);
    yield call(sweepQueryFlow);
    payload.callback();
  } catch (e) {
    const error = transformError(e);
    payload.callback(error);
  } finally {
    yield put(mainSetState({ isLoadingUsdcMkrFlow: false }));
  }
}

export function* mkrUsdcStopFlowSaga({ payload }: ReturnType<typeof mkrUsdcStopFlow>) {
  try {
    yield put(mainSetState({ isLoadingMkrUsdcFlow: true }));
    yield call(stopFlow, mkrxUsdcxExchangeAddress, MKRxAddress);
    yield call(sweepQueryFlow);
    payload.callback();
  } catch (e) {
    const error = transformError(e);
    payload.callback(error);
  } finally {
    yield put(mainSetState({ isLoadingMkrUsdcFlow: false }));
  }
}

export function* daiEthStopFlowSaga({ payload }: ReturnType<typeof daiEthStopFlow>) {
  try {
    yield put(mainSetState({ isLoadingDaiEthFlow: true }));
    yield call(stopFlow, daixEthxExchangeAddress, DAIxAddress);
    yield call(sweepQueryFlow);
    payload.callback();
  } catch (e) {
    const error = transformError(e);
    payload.callback(error);
  } finally {
    yield put(mainSetState({ isLoadingDaiEthFlow: false }));
  }
}

export function* ethDaiStopFlowSaga({ payload }: ReturnType<typeof ethDaiStopFlow>) {
  try {
    yield put(mainSetState({ isLoadingEthDaiFlow: true }));
    yield call(stopFlow, ethxDaixExchangeAddress, WETHxAddress);
    yield call(sweepQueryFlow);
    payload.callback();
  } catch (e) {
    const error = transformError(e);
    payload.callback(error);
  } finally {
    yield put(mainSetState({ isLoadingEthDaiFlow: false }));
  }
}

export function* daiMaticStopFlowSaga({ payload }: ReturnType<typeof daiMaticStopFlow>) {
  try {
    yield put(mainSetState({ isLoadingDaiMaticFlow: true }));
    yield call(stopFlow, daixMaticxExchangeAddress, DAIxAddress);
    yield call(sweepQueryFlow);
    payload.callback();
  } catch (e) {
    const error = transformError(e);
    payload.callback(error);
  } finally {
    yield put(mainSetState({ isLoadingDaiMaticFlow: false }));
  }
}

export function* maticDaiStopFlowSaga({ payload }: ReturnType<typeof maticDaiStopFlow>) {
  try {
    yield put(mainSetState({ isLoadingMaticDaiFlow: true }));
    yield call(stopFlow, maticxDaixExchangeAddress, MATICxAddress);
    yield call(sweepQueryFlow);
    payload.callback();
  } catch (e) {
    const error = transformError(e);
    payload.callback(error);
  } finally {
    yield put(mainSetState({ isLoadingMaticDaiFlow: false }));
  }
}

export function* usdcMaticStopFlowSaga({ payload }: ReturnType<typeof usdcMaticStopFlow>) {
  try {
    yield put(mainSetState({ isLoadingUsdcMaticFlow: true }));
    yield call(stopFlow, usdcxMaticxExchangeAddress, USDCxAddress);
    yield call(sweepQueryFlow);
    payload.callback();
  } catch (e) {
    const error = transformError(e);
    payload.callback(error);
  } finally {
    yield put(mainSetState({ isLoadingUsdcMaticFlow: false }));
  }
}

export function* maticUsdcStopFlowSaga({ payload }: ReturnType<typeof maticUsdcStopFlow>) {
  try {
    yield put(mainSetState({ isLoadingMaticUsdcFlow: true }));
    yield call(stopFlow, maticxUsdcxExchangeAddress, MATICxAddress);
    yield call(sweepQueryFlow);
    payload.callback();
  } catch (e) {
    const error = transformError(e);
    payload.callback(error);
  } finally {
    yield put(mainSetState({ isLoadingMaticUsdcFlow: false }));
  }
}

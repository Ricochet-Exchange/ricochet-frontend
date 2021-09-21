import { downgrade } from 'api/ethereum';
import { superTokenABI } from 'constants/abis';
import {
  DAIxAddress,
  MKRxAddress,
  USDCxAddress,
  WETHxAddress,
  WBTCxAddress,
} from 'constants/polygon_config';
import { call, put } from 'redux-saga/effects';
import { Unwrap } from 'types/unwrap';
import { getAddress } from 'utils/getAddress';
import { getContract } from 'utils/getContract';
import web3 from 'utils/web3instance';
import { transformError } from 'utils/transformError';
import {
  mkrDownGrade,
  daiDownGrade,
  wethDownGrade,
  usdcDownGrade,
  wbtcDownGrade,
  mainSetState,
} from '../actionCreators';
import { getBalances } from './getBalances';

function* downgradeSaga(tokenAddress: string, value: string) {
  const amount = web3.utils.toWei(value, 'ether');
  const address: Unwrap<typeof getAddress> = yield call(getAddress);
  const contract: Unwrap<typeof getContract> = yield call(
    getContract,
    tokenAddress,
    superTokenABI,
  );
  yield call(downgrade, contract, amount, address);
  yield call(getBalances, address);
}

export function* usdcDowngradeSaga({ payload }: ReturnType<typeof usdcDownGrade>) {
  try {
    yield put(mainSetState({ isLoadingUsdcDowngrade: true }));
    yield call(downgradeSaga, USDCxAddress, payload.value);
    payload.callback();
  } catch (e) {
    const error = transformError(e);
    payload.callback(error);
  } finally {
    yield put(mainSetState({ isLoadingUsdcDowngrade: false }));
  }
}

export function* mkrDowngradeSaga({ payload }: ReturnType<typeof mkrDownGrade>) {
  try {
    yield put(mainSetState({ isLoadingMkrDowngrade: true }));
    yield call(downgradeSaga, MKRxAddress, payload.value);
    payload.callback();
  } catch (e) {
    const error = transformError(e);
    payload.callback(error);
  } finally {
    yield put(mainSetState({ isLoadingMkrDowngrade: false }));
  }
}

export function* daiDowngradeSaga({ payload }: ReturnType<typeof daiDownGrade>) {
  try {
    yield put(mainSetState({ isLoadingDaiDowngrade: true }));
    yield call(downgradeSaga, DAIxAddress, payload.value);
    payload.callback();
  } catch (e) {
    const error = transformError(e);
    payload.callback(error);
  } finally {
    yield put(mainSetState({ isLoadingDaiDowngrade: false }));
  }
}

export function* wethDowngradeSaga({ payload }: ReturnType<typeof wethDownGrade>) {
  try {
    yield put(mainSetState({ isLoadingWethDownGrade: true }));
    yield call(downgradeSaga, WETHxAddress, payload.value);
    payload.callback();
  } catch (e) {
    const error = transformError(e);
    payload.callback(error);
  } finally {
    yield put(mainSetState({ isLoadingWethDownGrade: false }));
  }
}

export function* wbtcDowngradeSaga({ payload }: ReturnType<typeof wbtcDownGrade>) {
  try {
    yield put(mainSetState({ isLoadingWbtcDowngrade: true }));
    yield call(downgradeSaga, WBTCxAddress, payload.value);
    payload.callback();
  } catch (e) {
    const error = transformError(e);
    payload.callback(error);
  } finally {
    yield put(mainSetState({ isLoadingWbtcDowngrade: false }));
  }
}

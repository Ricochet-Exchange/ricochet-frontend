import { upgrade } from 'api/ethereum';
import { superTokenABI } from 'constants/abis';
import { USDCxAddress, WETHxAddress, WBTCxAddress } from 'constants/polygon_config';
import { call, put } from 'redux-saga/effects';
import { Unwrap } from 'types/unwrap';
import { getAddress } from 'utils/getAddress';
import { getContract } from 'utils/getContract';
import web3 from 'utils/web3instance';
import { transformError } from 'utils/transformError';
import {
  usdcUpgrade, wethUpgrade, wbtcUpgrade, mainSetState, 
} from '../actionCreators';
import {
  checkIfApproveUsdc,
  checkIfApproveWeth,
  checkIfApproveWbtc,
} from './checkIfApprove';
import { getBalances } from './getBalances';

export function* upgradeSaga(
  tokenAddress: string,
  value: string,
) {
  const address: Unwrap<typeof getAddress> = yield call(getAddress);
  const contract: Unwrap<typeof getContract> = yield call(
    getContract,
    tokenAddress,
    superTokenABI,
  );
  yield call(upgrade, contract, value, address);
  yield call(getBalances, address);
}

export function* upgradeUsdcSaga({ payload }: ReturnType<typeof usdcUpgrade>) {
  try {
    yield put(mainSetState({ isLoadingUsdcUpgrade: true }));
    const amount = web3.utils.toWei(payload.value);
    yield call(upgradeSaga, USDCxAddress, amount);
    payload.callback();
    yield call(checkIfApproveUsdc);
  } catch (e) {
    const error = transformError(e);
    payload.callback(error);
  } finally {
    yield put(mainSetState({ isLoadingUsdcUpgrade: false }));
  }
}

export function* upgradeWethSaga({ payload }: ReturnType<typeof wethUpgrade>) {
  try {
    yield put(mainSetState({ isLoadingWethUpgrade: true }));
    const amount = web3.utils.toWei(payload.value);
    yield call(upgradeSaga, WETHxAddress, amount);
    payload.callback();
    yield call(checkIfApproveWeth);
  } catch (e) {
    const error = transformError(e);
    payload.callback(error);
  } finally {
    yield put(mainSetState({ isLoadingWethUpgrade: false }));
  }
}

export function* upgradeWbtcSaga({ payload }: ReturnType<typeof wbtcUpgrade>) {
  try {
    yield put(mainSetState({ isLoadingWbtcUpgrade: true }));
    const amount = web3.utils.toWei(payload.value);
    yield call(upgradeSaga, WBTCxAddress, amount);
    payload.callback();
    yield call(checkIfApproveWbtc);
  } catch (e) {
    const error = transformError(e);
    payload.callback(error);
  } finally {
    yield put(mainSetState({ isLoadingWbtcUpgrade: false }));
  }
}

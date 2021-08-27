import { approve } from 'api/ethereum';
import { erc20ABI } from 'constants/abis';
import {
  USDCAddress, USDCxAddress,
  WETHAddress, WETHxAddress,
  WBTCAddress, WBTCxAddress,
} from 'constants/polygon_config';
import { call, put } from 'redux-saga/effects';
import { Unwrap } from 'types/unwrap';
import { getAddress } from 'utils/getAddress';
import { getContract } from 'utils/getContract';
import web3 from 'utils/web3instance';
import { transformError } from 'utils/transformError';
import {
  usdcApprove, wethApprove, wbtcApprove, mainSetState, 
} from '../actionCreators';
import {
  checkIfApproveUsdc,
  checkIfApproveWeth,
  checkIfApproveWbtc,
} from './checkIfApprove';
import { getBalances } from './getBalances';

export function* approveSaga(
  tokenAddress: string,
  superTokenAddress: string,
  amount: string,
) {
  const address: Unwrap<typeof getAddress> = yield call(getAddress);
  const contract: Unwrap<typeof getContract> = yield call(
    getContract,
    tokenAddress,
    erc20ABI,
  );
  yield call(approve, contract, address, superTokenAddress, amount);
  yield call(getBalances, address);
}

export function* approveUsdcSaga({ payload }: ReturnType<typeof usdcApprove>) {
  try {
    yield put(mainSetState({ isLoadingUsdcUpgrade: true }));
    const amount = web3.utils.toWei((Number(payload.value) * 1e6).toString(), 'wei');
    yield call(approveSaga, USDCAddress, USDCxAddress, amount);
    payload.callback();
    yield call(checkIfApproveUsdc);
  } catch (e) {
    const error = transformError(e);
    payload.callback(error);
  } finally {
    yield put(mainSetState({ isLoadingUsdcUpgrade: false }));
  }
}

export function* approveWethSaga({ payload }: ReturnType<typeof wethApprove>) {
  try {
    yield put(mainSetState({ isLoadingWethUpgrade: true }));
    const amount = web3.utils.toWei(payload.value);
    yield call(approveSaga, WETHAddress, WETHxAddress, amount);
    payload.callback();
    yield call(checkIfApproveWeth);
  } catch (e) {
    const error = transformError(e);
    payload.callback(error);
  } finally {
    yield put(mainSetState({ isLoadingWethUpgrade: false }));
  }
}

export function* approveWbtcSaga({ payload }: ReturnType<typeof wbtcApprove>) {
  try {
    yield put(mainSetState({ isLoadingWbtcUpgrade: true }));
    const amount = web3.utils.toWei((Number(payload.value) * 1e8).toString(), 'wei');
    yield call(approveSaga, WBTCAddress, WBTCxAddress, amount);
    payload.callback();
    yield call(checkIfApproveWbtc);
  } catch (e) {
    const error = transformError(e);
    payload.callback(error);
  } finally {
    yield put(mainSetState({ isLoadingWbtcUpgrade: false }));
  }
}

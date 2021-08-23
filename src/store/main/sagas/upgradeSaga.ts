import { upgrade } from 'api/ethereum';
import { superTokenABI } from 'constants/abis';
import { USDCxAddress, WETHxAddress, WBTCxAddress } from 'constants/polygon_config';
import { call } from 'redux-saga/effects';
import { Unwrap } from 'types/unwrap';
import { getAddress } from 'utils/getAddress';
import { getContract } from 'utils/getContract';
import web3 from 'utils/web3instance';
import { handleError } from 'utils/handleError';
import { usdcUpgrade, wethUpgrade, wbtcUpgrade } from '../actionCreators';
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
    const amount = web3.utils.toWei(payload.value);
    yield call(upgradeSaga, USDCxAddress, amount);
    payload.callback();
    yield call(checkIfApproveUsdc);
  } catch (e) {
    // TODO: handle errors properly
    yield call(handleError, e);
  }
}

export function* upgradeWethSaga({ payload }: ReturnType<typeof wethUpgrade>) {
  try {
    const amount = web3.utils.toWei(payload.value);
    yield call(upgradeSaga, WETHxAddress, amount);
    payload.callback();
    yield call(checkIfApproveWeth);
  } catch (e) {
    // TODO: handle errors properly
    yield call(handleError, e);
  }
}

export function* upgradeWbtcSaga({ payload }: ReturnType<typeof wbtcUpgrade>) {
  try {
    const amount = web3.utils.toWei(payload.value);
    console.log('Amount', amount);
    yield call(upgradeSaga, WBTCxAddress, amount);
    payload.callback();
    yield call(checkIfApproveWbtc);
  } catch (e) {
    // TODO: handle errors properly
    yield call(handleError, e);
  }
}

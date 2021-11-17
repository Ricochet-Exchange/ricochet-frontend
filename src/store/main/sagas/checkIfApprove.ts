import { call, put, select } from 'redux-saga/effects';
import { getContract } from 'utils/getContract';
import { erc20ABI } from 'constants/abis';
import { Unwrap } from 'types/unwrap';
import { allowance } from 'api/ethereum';
import { getAddress } from 'utils/getAddress';
import {
  USDCAddress, USDCxAddress,
  DAIAddress, DAIxAddress,
  MKRAddress, MKRxAddress,
  WETHAddress, WETHxAddress,
  WBTCAddress, WBTCxAddress,
  WMATICAddress, WMATICxAddress,
  SUSHIAddress, SUSHIxAddress,
} from 'constants/polygon_config';
import { mainSetState } from '../actionCreators';
import { selectBalances } from '../selectors';

export function* checkIfApprove(
  tokenAddress: string,
  superTokenAddress: string,
  param: 'hasWethApprove' | 'hasUsdcApprove' | 'hasWbtcApprove' | 'hasDaiApprove' | 'hasMkrApprove' | 'hasWMaticApprove' | 'hasSushiApprove',
) {
  const address: Unwrap<typeof getAddress> = yield call(getAddress);
  const contract: Unwrap<typeof getContract> = yield call(
    getContract,
    tokenAddress,
    erc20ABI,
  );
  const amount: Unwrap<typeof allowance> = yield call(allowance,
    contract, address, superTokenAddress);
  const balances: ReturnType<typeof selectBalances> = yield select(selectBalances);
  const hasApprove = Number(amount) > Number(balances && balances[tokenAddress]);
  yield put(mainSetState({ [param]: hasApprove }));
}

export function* checkIfApproveWeth() {
  yield call(checkIfApprove, WETHAddress, WETHxAddress, 'hasWethApprove');
}

export function* checkIfApproveMkr() {
  yield call(checkIfApprove, MKRAddress, MKRxAddress, 'hasMkrApprove');
}

export function* checkIfApproveUsdc() {
  yield call(checkIfApprove, USDCAddress, USDCxAddress, 'hasUsdcApprove');
}

export function* checkIfApproveDai() {
  yield call(checkIfApprove, DAIAddress, DAIxAddress, 'hasDaiApprove');
}

export function* checkIfApproveWbtc() {
  yield call(checkIfApprove, WBTCAddress, WBTCxAddress, 'hasWbtcApprove');
}

export function* checkIfApproveWMatic() {
  yield call(checkIfApprove, WMATICAddress, WMATICxAddress, 'hasWMaticApprove');
}

export function* checkIfApproveSushi() {
  yield call(checkIfApprove, SUSHIAddress, SUSHIxAddress, 'hasSushiApprove');
}

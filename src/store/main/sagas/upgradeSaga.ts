import { upgrade } from 'api/ethereum';
import { superTokenABI } from 'constants/abis';
import { call, put, all } from 'redux-saga/effects';
import { Unwrap } from 'types/unwrap';
import { getAddress } from 'utils/getAddress';
import { getContract } from 'utils/getContract';
import web3 from 'utils/web3instance';
import { transformError } from 'utils/transformError';
import {
  mainSetState,
  upgradeAction,
} from '../actionCreators';
import {
  checkIfApproveUsdc,
  checkIfApproveMkr,
  checkIfApproveDai,
  checkIfApproveWeth,
  checkIfApproveWbtc,
  checkIfApproveSushi,
  checkIfApproveWMatic,
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

export function* upgradeMainSaga({ payload }: ReturnType<typeof upgradeAction>) {
  try {
    yield put(mainSetState({ isLoadingUpgrade: true }));
    const {
      superTokenAddress, value,
    } = payload;
    // Superfluid upgrade contract requires the upgrade value to be scaled by 1e18 and not decimals
    const amount = web3.utils.toWei((Number(value) * 1e18).toString(), 'wei'); 
    yield call(upgradeSaga, superTokenAddress, amount);
    payload.callback();
    yield all([
      call(checkIfApproveUsdc),
      call(checkIfApproveMkr),
      call(checkIfApproveDai),
      call(checkIfApproveWeth),
      call(checkIfApproveWbtc),
      call(checkIfApproveSushi),
      call(checkIfApproveWMatic),
    ]);
  } catch (e) {
    const error = transformError(e);
    payload.callback(error);
  } finally {
    yield put(mainSetState({ isLoadingUpgrade: false }));
  }
}

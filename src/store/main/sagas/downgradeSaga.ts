import { downgrade } from 'api/ethereum';
import { superTokenABI } from 'constants/abis';
import { call, put } from 'redux-saga/effects';
import { Unwrap } from 'types/unwrap';
import { getAddress } from 'utils/getAddress';
import { getContract } from 'utils/getContract';
import web3 from 'utils/web3instance';
import { transformError } from 'utils/transformError';
import {
  mainSetState,
  downgradeAction,
} from '../actionCreators';
import { getBalances } from './getBalances';

export function* downgradeMainSaga({ payload }: ReturnType<typeof downgradeAction>) {
  try {
    yield put(mainSetState({ isLoadingDowngrade: true }));

    const { tokenAddress, value } = payload;
    const amount = web3.utils.toWei(value, 'ether');

    const address: Unwrap<typeof getAddress> = yield call(getAddress);
    const contract: Unwrap<typeof getContract> = yield call(
      getContract,
      tokenAddress,
      superTokenABI,
    );
    yield call(downgrade, contract, amount, address);
    yield call(getBalances, address);
  } catch (e) {
    const error = transformError(e);
    payload.callback(error);
  } finally {
    yield put(mainSetState({ isLoadingDowngrade: false }));
  }
}

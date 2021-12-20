import { downgrade, downgradeMatic } from 'api/ethereum';
import { superTokenABI } from 'constants/abis';
import { call, put, select } from 'redux-saga/effects';
import { Unwrap } from 'types/unwrap';
import { getAddress } from 'utils/getAddress';
import { getContract } from 'utils/getContract';
import { transformError } from 'utils/transformError';
import { MATICxAddress } from 'constants/polygon_config';

import Web3 from 'web3';
import {
  mainSetState,
  downgradeAction,
} from '../actionCreators';
import { getBalances } from './getBalances';
import { selectMain } from '../selectors';

export function* downgradeMainSaga({ payload }: ReturnType<typeof downgradeAction>) {
  try {
    yield put(mainSetState({ isLoadingDowngrade: true }));

    const { tokenAddress, value } = payload;
    const amount = Web3.utils.toWei(value, 'ether');
    const main: ReturnType<typeof selectMain> = yield select(selectMain);
    const { web3 } = main;
    const address: Unwrap<typeof getAddress> = yield call(getAddress, web3);
    const contract: Unwrap<typeof getContract> = yield call(
      getContract,
      tokenAddress,
      superTokenABI, web3,
    );

    if (tokenAddress === MATICxAddress) {
      yield call(downgradeMatic, contract, amount, address);
    } else {
      yield call(downgrade, contract, amount, address);
    }

    yield call(getBalances, address);
  } catch (e) {
    const error = transformError(e);
    payload.callback(error);
  } finally {
    yield put(mainSetState({ isLoadingDowngrade: false }));
  }
}

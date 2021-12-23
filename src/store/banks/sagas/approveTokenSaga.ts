import { put, call, select } from 'redux-saga/effects';
import { getContract } from 'utils/getContract';
import Erc20Abi from 'constants/Erc20.json';
import { getAddress } from 'utils/getAddress';
import { Unwrap } from 'types/unwrap';
import { approveToken } from 'api/ethereum';
import { banksApproveToken, banksSetState } from '../actionCreators';
import { selectBanks } from '../selectors';

export function* approveTokenSaga({ payload }: ReturnType<typeof banksApproveToken>) {
  try {
    yield put(banksSetState({ isLoadingApprove: true }));
    const accountAddress: Unwrap<typeof getAddress> = yield call(getAddress);
    const tokenContract = getContract(
      payload.tokenAddress,
      Erc20Abi,
    );
    yield call(approveToken, accountAddress, payload.bankAddress, tokenContract);
    payload.callback();
  } catch (e) {
    const { isLoadingApprove }: ReturnType<typeof selectBanks> = yield select(selectBanks);
    if (isLoadingApprove) {
      payload.callback('Error approving token allowance');
    }
  } finally {
    yield put(banksSetState({ isLoadingApprove: false }));
  }
}

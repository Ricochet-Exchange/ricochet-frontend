import { put, call, select } from 'redux-saga/effects';
import { getContract } from 'utils/getContract';
import Erc20Abi from 'constants/Erc20.json';
import { getAddress } from 'utils/getAddress';
import { Unwrap } from 'types/unwrap';
import { allowance, approveToken } from 'api/ethereum';
import { selectMain } from 'store/main/selectors';
import { banksApproveToken, banksSetState } from '../actionCreators';
import { selectBanks } from '../selectors';

export function* approveTokenSaga({ payload }: ReturnType<typeof banksApproveToken>) {
  try {
    yield put(banksSetState({ isLoadingApprove: true }));

    const { web3 }: ReturnType<typeof selectMain> = yield select(selectMain);

    const accountAddress: Unwrap<typeof getAddress> = yield call(getAddress, web3);
    const tokenContract = getContract(
      payload.tokenAddress,
      Erc20Abi,
      web3,
    );
    const allowanceAmount: Unwrap<typeof allowance> = yield call(allowance,
      tokenContract, accountAddress, payload.bankAddress);
    if (Number(allowanceAmount) === 0 || Number(allowanceAmount) < Number(payload.amount)) {
      yield call(approveToken, accountAddress, payload.bankAddress, tokenContract, web3);
    }
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

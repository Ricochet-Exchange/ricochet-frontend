import { approve } from 'api/ethereum';
import { erc20ABI } from 'constants/abis';
import {
  call, put, all, select, 
} from 'redux-saga/effects';
import { Unwrap } from 'types/unwrap';
import { getAddress } from 'utils/getAddress';
import { getContract } from 'utils/getContract';
import { transformError } from 'utils/transformError';
import Web3 from 'web3';
import {
  mainSetState,
  approveAction,
} from '../actionCreators';
import {
  checkIfApproveUsdc,
  checkIfApproveDai,
  checkIfApproveMkr,
  checkIfApproveWeth,
  checkIfApproveWbtc,
  checkIfApproveSushi,
  checkIfApproveMatic,
  checkIfApproveIdle,
} from './checkIfApprove';
import { getBalances } from './getBalances';
import { selectMain } from '../selectors';

export function* approveSaga(
  tokenAddress: string,
  superTokenAddress: string,
  amount: string,
) {
  const main: ReturnType<typeof selectMain> = yield select(selectMain);
  const { web3 } = main;
  const address: Unwrap<typeof getAddress> = yield call(getAddress, web3);
  const contract: Unwrap<typeof getContract> = yield call(
    getContract,
    tokenAddress,
    erc20ABI, web3,
  );
  // max uint256 is (2 ** 256 - 1)
  let uint256Max = Web3.utils.toBN(amount).toString();
  uint256Max = Web3.utils.toBN('2').pow(Web3.utils.toBN('256')).sub(Web3.utils.toBN('1')).toString();
  // Allow max instead of amount
  yield call(approve, contract, address, superTokenAddress, uint256Max);
  yield call(getBalances, address);
}

export function* approveMainSaga({ payload }: ReturnType<typeof approveAction>) {
  try {
    yield put(mainSetState({ isLoadingUpgrade: true }));
    const {
      tokenAddress, superTokenAddress, value, multi,
    } = payload;
    const amount = Web3.utils.toWei((Number(value) * (multi)).toString(), 'wei');
    yield call(approveSaga, tokenAddress, superTokenAddress, amount);
    payload.callback();
    yield all([
      call(checkIfApproveUsdc),
      call(checkIfApproveMkr),
      call(checkIfApproveDai),
      call(checkIfApproveWeth),
      call(checkIfApproveWbtc),
      call(checkIfApproveSushi),
      call(checkIfApproveMatic),
      call(checkIfApproveIdle),
    ]);
  } catch (e) {
    const error = transformError(e);
    payload.callback(error);
  } finally {
    yield put(mainSetState({ isLoadingUpgrade: false }));
  }
}

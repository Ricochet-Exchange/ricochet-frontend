import { approve } from 'api/ethereum';
import { erc20ABI } from 'constants/abis';
import { call, put, all } from 'redux-saga/effects';
import { Unwrap } from 'types/unwrap';
import { getAddress } from 'utils/getAddress';
import { getContract } from 'utils/getContract';
import web3 from 'utils/web3instance';
import { transformError } from 'utils/transformError';
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
  checkIfApproveWMatic,
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
  // max uint256 is (2 ** 256 - 1)
  let uint256Max = web3.utils.toBN(amount).toString();
  uint256Max = web3.utils.toBN('2').pow(web3.utils.toBN('256')).sub(web3.utils.toBN('1')).toString(); 
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
    const amount = web3.utils.toWei((Number(value) * (multi)).toString(), 'wei');
    
    yield call(approveSaga, tokenAddress, superTokenAddress, amount);
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

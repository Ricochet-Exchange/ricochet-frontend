import { downgrade } from 'api/ethereum';
import { superTokenABI } from 'constants/abis';
import { DAIxAddress, WETHxAddress } from 'constants/polygon_config';
import { all, call } from 'redux-saga/effects';
import { Unwrap } from 'types/unwrap';
import { getAddress } from 'utils/getAddress';
import { getContract } from 'utils/getContract';
import web3 from 'utils/web3instance';
import {
  wethDownGrade, daiDownGrade,  
} from '../actionCreators';
import { getBalances } from './getBalances';

function* downgradeSaga(tokenAddress: string, value: string) {
  const amount = web3.utils.toWei(value, 'ether');
  const address: Unwrap<typeof getAddress> = yield call(getAddress);
  const contract: Unwrap<typeof getContract> = yield call(
    getContract, 
    tokenAddress,
    superTokenABI,
  );
  yield all([
    call(downgrade, contract, amount, address),
    call(getBalances, address),
  ]);
} 

export function* daiDowngradeSaga({ payload }: ReturnType<typeof daiDownGrade>) {
  try {
    yield call(downgradeSaga, DAIxAddress, payload.value);
    payload.callback();
  } catch (e) {
    // yield put(mainSetState({ disabled: true }));
    // TODO: handle errors properly
    // eslint-disable-next-line no-console
    console.log(e);
  } 
} 

export function* wethDowngradeSaga({ payload }: ReturnType<typeof wethDownGrade>) {
  try {
    yield call(downgradeSaga, WETHxAddress, payload.value);
    payload.callback();
  } catch (e) {
    // TODO: handle errors properly
    // eslint-disable-next-line no-console
    console.log(e);
  } 
} 

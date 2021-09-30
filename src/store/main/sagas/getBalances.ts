import { put, call } from 'redux-saga/effects';
import { fromWei } from 'utils/balances';
import {
  USDCxAddress,
  USDCAddress,
  DAIxAddress,
  DAIAddress,
  MATICxAddress,
  MATICAddress,
  MKRxAddress,
  MKRAddress,
  WETHxAddress,
  WETHAddress,
  WBTCxAddress,
  WBTCAddress,
  RICAddress,
} from 'constants/polygon_config';
import { getContract } from 'utils/getContract';
import { erc20ABI } from 'constants/abis';
import { makeBatchRequest } from 'utils/makeBatchRequest';
import { mainSetState } from '../actionCreators';

export function* getBalances(address: string) {
  const contractsAddress = [
    DAIxAddress, DAIAddress,
    MKRxAddress, MKRAddress,
    MATICxAddress, MATICAddress,
    USDCxAddress, USDCAddress,
    WETHxAddress, WETHAddress,
    WBTCxAddress, WBTCAddress,
    RICAddress];
  const contracts = contractsAddress.map((el) => getContract(el, erc20ABI));
  const requests = contracts.map((el) => el.methods.balanceOf(address).call);
  const results: string[] = yield call(makeBatchRequest, requests);
  const balances: { [key:string]: string } = {};
  contractsAddress.map((el:string, i:number) => {
    // TODO: Use decimals() method instead of hardcoded
    if (el === WBTCAddress) {
      balances[el] = fromWei(results[i], 8);
    } else if (el === USDCAddress) {
      balances[el] = fromWei(results[i], 6);
    } else {
      balances[el] = fromWei(results[i], 18);
    }
    return null;
  });
  yield put(mainSetState({ balances }));
}

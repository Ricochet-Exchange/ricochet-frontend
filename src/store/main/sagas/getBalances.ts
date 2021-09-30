import { put, call } from 'redux-saga/effects';
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
      balances[el] = (Number(results[i]) / 1e8).toFixed(6);
    } else if (el === USDCAddress) {
      balances[el] = (Number(results[i]) / 1e6).toFixed(6);
    } else {
      balances[el] = (Number(results[i]) / 1e18).toFixed(6);
    }
    return null;
  });
  yield put(mainSetState({ balances }));
}

import { put, call } from 'redux-saga/effects';
import {
  DAIxAddress,
  DAIAddress,
  WETHxAddress,
  WETHAddress,
  RICAddress,
} from 'constants/polygon_config';
import { getContract } from 'utils/getContract';
import { erc20ABI } from 'constants/abis';
import { makeBatchRequest } from 'utils/makeBatchRequest';
import { mainSetState } from '../actionCreators';

export function* getBalances(address: string) {
  const contractsAddress = [DAIxAddress, WETHxAddress, WETHAddress, DAIAddress, RICAddress];
  const contracts = contractsAddress.map((el) => getContract(el, erc20ABI));
  const requests = contracts.map((el) => el.methods.balanceOf(address).call);    
  const results: string[] = yield call(makeBatchRequest, requests);
  const balances: { [key:string]: string } = {};
  contractsAddress.map((el:string, i:number) => {
    balances[el] = (Number(results[i]) / 1e18).toFixed(6);
    return null;
  });
  yield put(mainSetState({ balances }));
} 

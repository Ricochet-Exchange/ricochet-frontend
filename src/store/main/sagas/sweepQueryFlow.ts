import { call, all, put } from 'redux-saga/effects';
import {
  wethxDaixExchangeAddress,
  daixWethxExchangeAddress,
  DAIxAddress,
  WETHxAddress,
} from 'constants/polygon_config';
import { Unwrap } from 'types/unwrap';
import { getAddress } from 'utils/getAddress';
import { queryFlows } from 'api';
import { getReceviedFlows } from 'utils/getReceviedFlows';
import { getOwnedFlows } from 'utils/getOwnedFlows';
import { Flow } from 'types/flow';
import { mainSetState } from '../actionCreators';

export function* sweepQueryFlow() {
  const address: Unwrap<typeof getAddress> = yield call(getAddress);
  const results: any[] = yield all([
    call(queryFlows, daixWethxExchangeAddress),
    call(queryFlows, wethxDaixExchangeAddress),
  ]);
  const flows: { [key:string]: { flowsOwned: Flow[], flowsReceived: Flow[] } } = {};

  [daixWethxExchangeAddress, wethxDaixExchangeAddress].forEach((el, i) => {
    if (results[i].data.data.account != null) {
      flows[el] = results[i].data.data.account;
    } else {
      flows[el] = { flowsOwned: [], flowsReceived: [] };
    }
  });

  const daiFlows = flows[daixWethxExchangeAddress];
  const wethFlows = flows[wethxDaixExchangeAddress];

  const daiFlowsReceived = getReceviedFlows(daiFlows.flowsReceived, DAIxAddress, address);
  const daiPlaceholder = ((daiFlowsReceived / 10 ** 18) * (30 * 24 * 60 * 60)).toFixed(6);

  const wethflowsReceived = getReceviedFlows(wethFlows.flowsReceived, WETHxAddress, address);
  const wethPlaceholder = ((wethflowsReceived / 10 ** 18) * (30 * 24 * 60 * 60)).toFixed(6);

  const daiFlowQuery = {
    flowsReceived: daiFlowsReceived,
    flowsOwned: getOwnedFlows(daiFlows.flowsReceived, DAIxAddress),
    totalFlows: daiFlows.flowsReceived.length,
    placeholder: daiPlaceholder,
  };

  const wethFlowQuery = {
    flowsReceived: wethflowsReceived,
    flowsOwned: getOwnedFlows(wethFlows.flowsReceived, WETHxAddress),
    totalFlows: wethFlows.flowsReceived.length,
    placeholder: wethPlaceholder,
  };
  
  yield put(mainSetState({ daiFlowQuery, wethFlowQuery }));
} 

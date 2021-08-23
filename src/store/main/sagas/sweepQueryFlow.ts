import { call, all, put } from 'redux-saga/effects';
import {
  wethxUsdcxExchangeAddress,
  usdcxWethxExchangeAddress,
  USDCxAddress,
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
    call(queryFlows, usdcxWethxExchangeAddress),
    call(queryFlows, wethxUsdcxExchangeAddress),
  ]);
  const flows: { [key:string]: { flowsOwned: Flow[], flowsReceived: Flow[] } } = {};

  [usdcxWethxExchangeAddress, wethxUsdcxExchangeAddress].forEach((el, i) => {
    if (results[i].data.data.account != null) {
      flows[el] = results[i].data.data.account;
    } else {
      flows[el] = { flowsOwned: [], flowsReceived: [] };
    }
  });

  const usdcFlows = flows[usdcxWethxExchangeAddress];
  const wethFlows = flows[wethxUsdcxExchangeAddress];

  const usdcFlowsReceived = getReceviedFlows(usdcFlows.flowsReceived, USDCxAddress, address);
  const usdcPlaceholder = ((usdcFlowsReceived / 10 ** 18) * (30 * 24 * 60 * 60)).toFixed(6);

  const wethflowsReceived = getReceviedFlows(wethFlows.flowsReceived, WETHxAddress, address);
  const wethPlaceholder = ((wethflowsReceived / 10 ** 18) * (30 * 24 * 60 * 60)).toFixed(6);

  const usdcFlowQuery = {
    flowsReceived: usdcFlowsReceived,
    flowsOwned: getOwnedFlows(usdcFlows.flowsReceived, USDCxAddress),
    totalFlows: usdcFlows.flowsReceived.length,
    placeholder: usdcPlaceholder,
  };

  const wethFlowQuery = {
    flowsReceived: wethflowsReceived,
    flowsOwned: getOwnedFlows(wethFlows.flowsReceived, WETHxAddress),
    totalFlows: wethFlows.flowsReceived.length,
    placeholder: wethPlaceholder,
  };

  yield put(mainSetState({ usdcFlowQuery, wethFlowQuery }));
}

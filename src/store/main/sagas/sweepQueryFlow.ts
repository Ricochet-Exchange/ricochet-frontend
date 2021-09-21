import { call, all, put } from 'redux-saga/effects';
import {
  wethxUsdcxExchangeAddress,
  wbtcxUsdcxExchangeAddress,
  usdcxWethxExchangeAddress,
  usdcxWbtcxExchangeAddress,
  daixMkrxExchangeAddress,
  mkrxDaixExchangeAddress,
  MKRxAddress,
  DAIxAddress,
  USDCxAddress,
  WETHxAddress,
  WBTCxAddress,
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
    call(queryFlows, usdcxWbtcxExchangeAddress),
    call(queryFlows, wethxUsdcxExchangeAddress),
    call(queryFlows, wbtcxUsdcxExchangeAddress),
    call(queryFlows, daixMkrxExchangeAddress),
    call(queryFlows, mkrxDaixExchangeAddress),
  ]);
  const flows: { [key:string]: { flowsOwned: Flow[], flowsReceived: Flow[] } } = {};

  [usdcxWethxExchangeAddress,
    usdcxWbtcxExchangeAddress,
    wethxUsdcxExchangeAddress,
    wbtcxUsdcxExchangeAddress,
    daixMkrxExchangeAddress,
    mkrxDaixExchangeAddress].forEach((el, i) => {
    if (results[i].data.data.account != null) {
      flows[el] = results[i].data.data.account;
    } else {
      flows[el] = { flowsOwned: [], flowsReceived: [] };
    }
  });

  const usdcWethFlows = flows[usdcxWethxExchangeAddress];
  const usdcWbtcFlows = flows[usdcxWbtcxExchangeAddress];
  const wethUsdcFlows = flows[wethxUsdcxExchangeAddress];
  const wbtcUsdcFlows = flows[wbtcxUsdcxExchangeAddress];
  const daiMkrFlows = flows[daixMkrxExchangeAddress];
  const mkrDaiFlows = flows[mkrxDaixExchangeAddress];

  const usdcWethFlowsReceived = getReceviedFlows(usdcWethFlows.flowsReceived,
    USDCxAddress, address);
  const usdcWethPlaceholder = ((usdcWethFlowsReceived / 10 ** 18) * (30 * 24 * 60 * 60)).toFixed(6);

  const usdcWbtcFlowsReceived = getReceviedFlows(usdcWbtcFlows.flowsReceived,
    USDCxAddress, address);
  const usdcWbtcPlaceholder = ((usdcWbtcFlowsReceived / 10 ** 18) * (30 * 24 * 60 * 60)).toFixed(6);

  const wethUsdcflowsReceived = getReceviedFlows(wethUsdcFlows.flowsReceived,
    WETHxAddress, address);
  const wethUsdcPlaceholder = ((wethUsdcflowsReceived / 10 ** 18) * (30 * 24 * 60 * 60)).toFixed(6);

  const wbtcUsdcflowsReceived = getReceviedFlows(wbtcUsdcFlows.flowsReceived,
    WBTCxAddress, address);
  const wbtcUsdcPlaceholder = ((wbtcUsdcflowsReceived / 10 ** 18) * (30 * 24 * 60 * 60)).toFixed(6);

  const daiMkrflowsReceived = getReceviedFlows(daiMkrFlows.flowsReceived,
    DAIxAddress, address);
  const daiMkrPlaceholder = ((daiMkrflowsReceived / 10 ** 18) * (30 * 24 * 60 * 60)).toFixed(6);

  const mkrDaiflowsReceived = getReceviedFlows(mkrDaiFlows.flowsReceived,
    MKRxAddress, address);
  const mkrDaiPlaceholder = ((mkrDaiflowsReceived / 10 ** 18) * (30 * 24 * 60 * 60)).toFixed(6);

  const usdcWethFlowQuery = {
    flowsReceived: usdcWethFlowsReceived,
    flowsOwned: getOwnedFlows(usdcWethFlows.flowsReceived, USDCxAddress),
    totalFlows: usdcWethFlows.flowsReceived.length,
    placeholder: usdcWethPlaceholder,
  };

  const usdcWbtcFlowQuery = {
    flowsReceived: usdcWbtcFlowsReceived,
    flowsOwned: getOwnedFlows(usdcWbtcFlows.flowsReceived, USDCxAddress),
    totalFlows: usdcWbtcFlows.flowsReceived.length,
    placeholder: usdcWbtcPlaceholder,
  };

  const wethUsdcFlowQuery = {
    flowsReceived: wethUsdcflowsReceived,
    flowsOwned: getOwnedFlows(wethUsdcFlows.flowsReceived, WETHxAddress),
    totalFlows: wethUsdcFlows.flowsReceived.length,
    placeholder: wethUsdcPlaceholder,
  };

  const wbtcUsdcFlowQuery = {
    flowsReceived: wbtcUsdcflowsReceived,
    flowsOwned: getOwnedFlows(wbtcUsdcFlows.flowsReceived, WBTCxAddress),
    totalFlows: wbtcUsdcFlows.flowsReceived.length,
    placeholder: wbtcUsdcPlaceholder,
  };

  const daiMkrFlowQuery = {
    flowsReceived: daiMkrflowsReceived,
    flowsOwned: getOwnedFlows(daiMkrFlows.flowsReceived, DAIxAddress),
    totalFlows: daiMkrFlows.flowsReceived.length,
    placeholder: daiMkrPlaceholder,
  };

  const mkrDaiFlowQuery = {
    flowsReceived: mkrDaiflowsReceived,
    flowsOwned: getOwnedFlows(mkrDaiFlows.flowsReceived, DAIxAddress),
    totalFlows: mkrDaiFlows.flowsReceived.length,
    placeholder: mkrDaiPlaceholder,
  };

  yield put(mainSetState({
    daiMkrFlowQuery,
    mkrDaiFlowQuery,
    usdcWethFlowQuery,
    usdcWbtcFlowQuery,
    wethUsdcFlowQuery,
    wbtcUsdcFlowQuery,
  }));
}

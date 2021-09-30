import { call, all, put } from 'redux-saga/effects';
import {
  wethxUsdcxExchangeAddress,
  wbtcxUsdcxExchangeAddress,
  usdcxWethxExchangeAddress,
  usdcxWbtcxExchangeAddress,
  daixMkrxExchangeAddress,
  mkrxDaixExchangeAddress,
  usdcxMkrxExchangeAddress,
  mkrxUsdcxExchangeAddress,
  daixMaticxExchangeAddress,
  maticxDaixExchangeAddress,
  usdcxMaticxExchangeAddress,
  maticxUsdcxExchangeAddress,
  daixEthxExchangeAddress,
  ethxDaixExchangeAddress,
  MATICxAddress,
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
    call(queryFlows, daixEthxExchangeAddress),
    call(queryFlows, ethxDaixExchangeAddress),
    call(queryFlows, usdcxMkrxExchangeAddress),
    call(queryFlows, mkrxUsdcxExchangeAddress),
    call(queryFlows, daixMaticxExchangeAddress),
    call(queryFlows, maticxDaixExchangeAddress),
    call(queryFlows, usdcxMaticxExchangeAddress),
    call(queryFlows, maticxUsdcxExchangeAddress),
  ]);
  const flows: { [key:string]: { flowsOwned: Flow[], flowsReceived: Flow[] } } = {};

  [usdcxWethxExchangeAddress,
    usdcxWbtcxExchangeAddress,
    wethxUsdcxExchangeAddress,
    wbtcxUsdcxExchangeAddress,
    daixMkrxExchangeAddress,
    mkrxDaixExchangeAddress,
    daixEthxExchangeAddress,
    ethxDaixExchangeAddress,
    usdcxMkrxExchangeAddress,
    mkrxUsdcxExchangeAddress,
    daixMaticxExchangeAddress,
    maticxDaixExchangeAddress,
    usdcxMaticxExchangeAddress,
    maticxUsdcxExchangeAddress].forEach((el, i) => {
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
  const usdcMkrFlows = flows[usdcxMkrxExchangeAddress];
  const mkrUsdcFlows = flows[mkrxUsdcxExchangeAddress];
  const daiMaticFlows = flows[daixMaticxExchangeAddress];
  const maticDaiFlows = flows[maticxDaixExchangeAddress];
  const usdcMaticFlows = flows[usdcxMaticxExchangeAddress];
  const maticUsdcFlows = flows[maticxUsdcxExchangeAddress];
  const daiEthFlows = flows[daixEthxExchangeAddress];
  const ethDaiFlows = flows[ethxDaixExchangeAddress];

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

  const usdcMkrflowsReceived = getReceviedFlows(usdcMkrFlows.flowsReceived,
    USDCxAddress, address);
  const usdcMkrPlaceholder = ((usdcMkrflowsReceived / 10 ** 18) * (30 * 24 * 60 * 60)).toFixed(6);

  const mkrUsdcflowsReceived = getReceviedFlows(mkrUsdcFlows.flowsReceived,
    MKRxAddress, address);
  const mkrUsdcPlaceholder = ((mkrUsdcflowsReceived / 10 ** 18) * (30 * 24 * 60 * 60)).toFixed(6);

  const daiMaticflowsReceived = getReceviedFlows(daiMaticFlows.flowsReceived,
    DAIxAddress, address);
  const daiMaticPlaceholder = ((daiMaticflowsReceived / 10 ** 18) * (30 * 24 * 60 * 60)).toFixed(6);

  const maticDaiflowsReceived = getReceviedFlows(maticDaiFlows.flowsReceived,
    MATICxAddress, address);
  const maticDaiPlaceholder = ((maticDaiflowsReceived / 10 ** 18) * (30 * 24 * 60 * 60)).toFixed(6);

  const usdcMaticflowsReceived = getReceviedFlows(usdcMaticFlows.flowsReceived,
    USDCxAddress, address);
  const usdcMaticPlaceholder = ((usdcMaticflowsReceived / 10 ** 18) *
    (30 * 24 * 60 * 60)).toFixed(6);

  const maticUsdcflowsReceived = getReceviedFlows(maticUsdcFlows.flowsReceived,
    MATICxAddress, address);
  const maticUsdcPlaceholder = ((maticUsdcflowsReceived / 10 ** 18) *
    (30 * 24 * 60 * 60)).toFixed(6);

  const daiEthflowsReceived = getReceviedFlows(daiEthFlows.flowsReceived,
    DAIxAddress, address);
  const daiEthPlaceholder = ((daiEthflowsReceived / 10 ** 18) * (30 * 24 * 60 * 60)).toFixed(6);

  const ethDaiflowsReceived = getReceviedFlows(ethDaiFlows.flowsReceived,
    WETHxAddress, address);
  const ethDaiPlaceholder = ((ethDaiflowsReceived / 10 ** 18) * (30 * 24 * 60 * 60)).toFixed(6);

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
    flowsOwned: getOwnedFlows(mkrDaiFlows.flowsReceived, MKRxAddress),
    totalFlows: mkrDaiFlows.flowsReceived.length,
    placeholder: mkrDaiPlaceholder,
  };

  const usdcMkrFlowQuery = {
    flowsReceived: usdcMkrflowsReceived,
    flowsOwned: getOwnedFlows(usdcMkrFlows.flowsReceived, USDCxAddress),
    totalFlows: usdcMkrFlows.flowsReceived.length,
    placeholder: usdcMkrPlaceholder,
  };

  const mkrUsdcFlowQuery = {
    flowsReceived: mkrUsdcflowsReceived,
    flowsOwned: getOwnedFlows(mkrUsdcFlows.flowsReceived, MKRxAddress),
    totalFlows: mkrUsdcFlows.flowsReceived.length,
    placeholder: mkrUsdcPlaceholder,
  };

  const daiMaticFlowQuery = {
    flowsReceived: daiMaticflowsReceived,
    flowsOwned: getOwnedFlows(daiMaticFlows.flowsReceived, DAIxAddress),
    totalFlows: daiMaticFlows.flowsReceived.length,
    placeholder: daiMaticPlaceholder,
  };

  const maticDaiFlowQuery = {
    flowsReceived: maticDaiflowsReceived,
    flowsOwned: getOwnedFlows(maticDaiFlows.flowsReceived, MATICxAddress),
    totalFlows: maticDaiFlows.flowsReceived.length,
    placeholder: maticDaiPlaceholder,
  };

  const usdcMaticFlowQuery = {
    flowsReceived: usdcMaticflowsReceived,
    flowsOwned: getOwnedFlows(usdcMaticFlows.flowsReceived, USDCxAddress),
    totalFlows: usdcMaticFlows.flowsReceived.length,
    placeholder: usdcMaticPlaceholder,
  };

  const maticUsdcFlowQuery = {
    flowsReceived: maticUsdcflowsReceived,
    flowsOwned: getOwnedFlows(maticUsdcFlows.flowsReceived, MATICxAddress),
    totalFlows: maticUsdcFlows.flowsReceived.length,
    placeholder: maticUsdcPlaceholder,
  };

  const daiEthFlowQuery = {
    flowsReceived: daiEthflowsReceived,
    flowsOwned: getOwnedFlows(daiEthFlows.flowsReceived, DAIxAddress),
    totalFlows: daiEthFlows.flowsReceived.length,
    placeholder: daiEthPlaceholder,
  };

  const ethDaiFlowQuery = {
    flowsReceived: ethDaiflowsReceived,
    flowsOwned: getOwnedFlows(ethDaiFlows.flowsReceived, WETHxAddress),
    totalFlows: ethDaiFlows.flowsReceived.length,
    placeholder: ethDaiPlaceholder,
  };

  yield put(mainSetState({
    daiEthFlowQuery,
    ethDaiFlowQuery,
    daiMkrFlowQuery,
    mkrDaiFlowQuery,
    usdcMkrFlowQuery,
    mkrUsdcFlowQuery,
    daiMaticFlowQuery,
    maticDaiFlowQuery,
    usdcMaticFlowQuery,
    maticUsdcFlowQuery,
    usdcWethFlowQuery,
    usdcWbtcFlowQuery,
    wethUsdcFlowQuery,
    wbtcUsdcFlowQuery,
  }));
}

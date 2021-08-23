import { stopFlow } from 'api/ethereum';
import {
  USDCxAddress, usdcxWethxExchangeAddress,
  WETHxAddress, wethxUsdcxExchangeAddress,
  WBTCxAddress, usdcxWbtcxExchangeAddress, wbtcxUsdcxExchangeAddress,
} from 'constants/polygon_config';
import { call } from 'redux-saga/effects';
import { handleError } from 'utils/handleError';
import {
  usdcWethStopFlow,
  usdcWbtcStopFlow,
  wethUsdcStopFlow,
  wbtcUsdcStopFlow,
} from '../actionCreators';
import { sweepQueryFlow } from './sweepQueryFlow';

export function* usdcWethStopFlowSaga({ payload }: ReturnType<typeof usdcWethStopFlow>) {
  try {
    yield call(stopFlow, usdcxWethxExchangeAddress, USDCxAddress);
    yield call(sweepQueryFlow);
  } catch (e) {
    yield call(handleError, e);
    if (e.code === -32603) {
      payload.callback("You don't have active streeming");
    }
  }
}

export function* usdcWbtcStopFlowSaga({ payload }: ReturnType<typeof usdcWbtcStopFlow>) {
  try {
    yield call(stopFlow, usdcxWbtcxExchangeAddress, USDCxAddress);
    yield call(sweepQueryFlow);
  } catch (e) {
    yield call(handleError, e);
    if (e.code === -32603) {
      payload.callback("You don't have active streeming");
    }
  }
}

export function* wethUsdcStopFlowSaga({ payload }: ReturnType<typeof wethUsdcStopFlow>) {
  try {
    yield call(stopFlow, wethxUsdcxExchangeAddress, WETHxAddress);
    yield call(sweepQueryFlow);
  } catch (e) {
    yield call(handleError, e);
    if (e.code === -32603) {
      payload.callback("You don't have active streeming");
    }
  }
}

export function* wbtcUsdcStopFlowSaga({ payload }: ReturnType<typeof wbtcUsdcStopFlow>) {
  try {
    yield call(stopFlow, wbtcxUsdcxExchangeAddress, WBTCxAddress);
    yield call(sweepQueryFlow);
  } catch (e) {
    yield call(handleError, e);
    if (e.code === -32603) {
      payload.callback("You don't have active streeming");
    }
  }
}

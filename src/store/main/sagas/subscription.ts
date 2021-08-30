import { approveSubscription } from 'api/ethereum';
import {
  USDCxAddress,
  RICAddress,
  WETHxAddress,
  wbtcxUsdcxExchangeAddress,
  wethxUsdcxExchangeAddress,
  usdcxWbtcxExchangeAddress,
  usdcxWethxExchangeAddress,
} from 'constants/polygon_config';
import { call } from 'redux-saga/effects';
import { transformError } from 'utils/transformError';
import { 
  subscriptionRicUsdcWbtc,
  subscriptionRicUsdcWeth,
  subscriptionRicWbtcUsdc,
  subscriptionRicWethUsdc,
} from '../actionCreators';

export function* subscriptionUsdcSaga() {
  try {
    yield call(approveSubscription, USDCxAddress, usdcxWethxExchangeAddress);
  } catch (e) {
    // TODO: handle errors properly
    // eslint-disable-next-line no-alert
    alert("You've already approved Usdc for this exchange.");
  }
}

export function* subscriptionWethSaga() {
  try {
    yield call(approveSubscription, WETHxAddress, wethxUsdcxExchangeAddress);
  } catch (e) {
    // TODO: handle errors properly
    // eslint-disable-next-line no-alert
    alert("You've already approved ETH for this exchange.");
  }
}

export function* subscriptionRicWbtcUsdcSaga(
  { callback }: ReturnType<typeof subscriptionRicWbtcUsdc>,
) {
  try {
    yield call(approveSubscription, RICAddress, wbtcxUsdcxExchangeAddress);
  } catch (e) {
    callback(transformError(e));
  }
}

export function* subscriptionRicWethUsdcSaga(
  { callback }: ReturnType<typeof subscriptionRicWethUsdc>,
) {
  try {
    yield call(approveSubscription, RICAddress, wethxUsdcxExchangeAddress);
  } catch (e) {
    callback(transformError(e));
  }
}

export function* subscriptionRicUsdcWbtcSaga(
  { callback }: ReturnType<typeof subscriptionRicUsdcWbtc>,
) {
  try {
    yield call(approveSubscription, RICAddress, usdcxWbtcxExchangeAddress);
  } catch (e) {
    callback(transformError(e));
  }
}

export function* subscriptionRicUsdcWethSaga(
  { callback }: ReturnType<typeof subscriptionRicUsdcWeth>,
) {
  try {
    yield call(approveSubscription, RICAddress, usdcxWethxExchangeAddress);
  } catch (e) {
    callback(transformError(e));
  }
}

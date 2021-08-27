import { approveSubscription } from 'api/ethereum';
import {
  USDCxAddress,
  usdcxWethxExchangeAddress,
  RICAddress,
  WETHxAddress,
  wethxUsdcxExchangeAddress,
} from 'constants/polygon_config';
import { call } from 'redux-saga/effects';

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

export function* subscriptionRicUsdcSaga() {
  try {
    yield call(approveSubscription, RICAddress, usdcxWethxExchangeAddress);
  } catch (e) {
    // TODO: handle errors properly
    // eslint-disable-next-line no-alert
    alert("You've already approved RIC for this exchange.");
  }
}

export function* subscriptionRicWethSaga() {
  try {
    yield call(approveSubscription, RICAddress, wethxUsdcxExchangeAddress);
  } catch (e) {
    // TODO: handle errors properly
    // eslint-disable-next-line no-alert
    alert("You've already approved RIC for this exchange.");
  }
}

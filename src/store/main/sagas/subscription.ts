import { approveSubscription } from 'api/ethereum';
import {
  DAIxAddress,
  daixWethxExchangeAddress, 
  RICAddress, 
  WETHxAddress, 
  wethxDaixExchangeAddress, 
} from 'constants/polygon_config';
import { call } from 'redux-saga/effects';

export function* subscriptionDaiSaga() {
  try {
    yield call(approveSubscription, DAIxAddress, daixWethxExchangeAddress);
  } catch (e) {
    // TODO: handle errors properly
    // eslint-disable-next-line no-alert
    alert("You've already approved Dai for this exchange.");
  } 
} 

export function* subscriptionWethSaga() {
  try {
    yield call(approveSubscription, WETHxAddress, wethxDaixExchangeAddress);
  } catch (e) {
    // TODO: handle errors properly
    // eslint-disable-next-line no-alert
    alert("You've already approved ETH for this exchange.");
  } 
} 

export function* subscriptionRicDaiSaga() {
  try {
    yield call(approveSubscription, RICAddress, daixWethxExchangeAddress);
  } catch (e) {
    // TODO: handle errors properly
    // eslint-disable-next-line no-alert
    alert("You've already approved RIC for this exchange.");
  } 
}

export function* subscriptionRicWethSaga() {
  try {
    yield call(approveSubscription, RICAddress, wethxDaixExchangeAddress);
  } catch (e) {
    // TODO: handle errors properly
    // eslint-disable-next-line no-alert
    alert("You've already approved RIC for this exchange.");
  } 
} 

import { takeLeading } from 'redux-saga/effects';
import { MainActionTypes } from '../actionTypes';
import { usdcDowngradeSaga, wethDowngradeSaga, wbtcDowngradeSaga } from './downgradeSaga';
import { loadData } from './loadData';
import { approveUsdcSaga, approveWethSaga, approveWbtcSaga } from './approveSaga';
import { upgradeUsdcSaga, upgradeWethSaga, upgradeWbtcSaga } from './upgradeSaga';
import { mainChainSaga } from './mainChainChanged';
import {
  subscriptionUsdcSaga, subscriptionWethSaga,
} from './subscription';
import {
  usdcWethStopFlowSaga,
  wethUsdcStopFlowSaga,
  usdcWbtcStopFlowSaga,
} from './stopFlow';
import {
  usdcWethStartFlowSaga,
  wethUsdcStartFlowSaga,
  usdcWbtcStartFlowSaga,
} from './startFlow';

export default function* mainSaga() {
  yield takeLeading(MainActionTypes.CHAIN_CHANGED, mainChainSaga);
  yield takeLeading(MainActionTypes.LOAD_DATA, loadData);
  yield takeLeading(MainActionTypes.USDC_DOWNGRADE, usdcDowngradeSaga);
  yield takeLeading(MainActionTypes.WETH_DOWNGRADE, wethDowngradeSaga);
  yield takeLeading(MainActionTypes.WBTC_DOWNGRADE, wbtcDowngradeSaga);
  yield takeLeading(MainActionTypes.USDC_APPROVE, approveUsdcSaga);
  yield takeLeading(MainActionTypes.USDC_UPGRADE, upgradeUsdcSaga);
  yield takeLeading(MainActionTypes.WETH_APPROVE, approveWethSaga);
  yield takeLeading(MainActionTypes.WETH_UPGRADE, upgradeWethSaga);
  yield takeLeading(MainActionTypes.WBTC_UPGRADE, upgradeWbtcSaga);
  yield takeLeading(MainActionTypes.WBTC_APPROVE, approveWbtcSaga);
  yield takeLeading(MainActionTypes.USDC_WETH_SUBSCRIPTION, subscriptionUsdcSaga);
  yield takeLeading(MainActionTypes.WETH_USDC_SUBSCRIPTION, subscriptionWethSaga);
  yield takeLeading(MainActionTypes.USDC_WETH_STOP_FLOW, usdcWethStopFlowSaga);
  yield takeLeading(MainActionTypes.USDC_WBTC_STOP_FLOW, usdcWbtcStopFlowSaga);
  yield takeLeading(MainActionTypes.WETH_USDC_STOP_FLOW, wethUsdcStopFlowSaga);
  yield takeLeading(MainActionTypes.USDC_WETH_START_FLOW, usdcWethStartFlowSaga);
  yield takeLeading(MainActionTypes.USDC_WBTC_START_FLOW, usdcWbtcStartFlowSaga);
  yield takeLeading(MainActionTypes.WETH_USDC_START_FLOW, wethUsdcStartFlowSaga);
}

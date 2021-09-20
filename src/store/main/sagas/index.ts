import { takeEvery, takeLeading } from 'redux-saga/effects';
import { MainActionTypes } from '../actionTypes';
import {
  daiDowngradeSaga,
  usdcDowngradeSaga,
  wethDowngradeSaga,
  wbtcDowngradeSaga,
} from './downgradeSaga';
import { loadData } from './loadData';
import {
  approveDaiSaga,
  approveUsdcSaga,
  approveWethSaga,
  approveWbtcSaga,
} from './approveSaga';
import {
  upgradeDaiSaga,
  upgradeUsdcSaga,
  upgradeWethSaga,
  upgradeWbtcSaga,
} from './upgradeSaga';
import {
  subscriptionUsdcSaga, subscriptionWethSaga,
} from './subscription';
import {
  daiMkrStopFlowSaga,
  usdcWethStopFlowSaga,
  wethUsdcStopFlowSaga,
  wbtcUsdcStopFlowSaga,
  usdcWbtcStopFlowSaga,
} from './stopFlow';
import {
  daiMkrStartFlowSaga,
  usdcWethStartFlowSaga,
  wethUsdcStartFlowSaga,
  wbtcUsdcStartFlowSaga,
  usdcWbtcStartFlowSaga,
} from './startFlow';
import { mainCheckSaga } from './mainCheckSaga';
import { switchNetworkSaga } from './switchNetworkSaga';

export default function* mainSaga() {
  yield takeLeading(MainActionTypes.MAIN_CHECK, mainCheckSaga);
  yield takeLeading(MainActionTypes.MAIN_SWITCH_NETWORK, switchNetworkSaga);
  yield takeEvery(MainActionTypes.LOAD_DATA, loadData);
  yield takeLeading(MainActionTypes.DAI_DOWNGRADE, daiDowngradeSaga);
  yield takeLeading(MainActionTypes.USDC_DOWNGRADE, usdcDowngradeSaga);
  yield takeLeading(MainActionTypes.WETH_DOWNGRADE, wethDowngradeSaga);
  yield takeLeading(MainActionTypes.WBTC_DOWNGRADE, wbtcDowngradeSaga);
  yield takeLeading(MainActionTypes.USDC_APPROVE, approveUsdcSaga);
  yield takeLeading(MainActionTypes.USDC_UPGRADE, upgradeUsdcSaga);
  yield takeLeading(MainActionTypes.DAI_APPROVE, approveDaiSaga);
  yield takeLeading(MainActionTypes.DAI_UPGRADE, upgradeDaiSaga);
  yield takeLeading(MainActionTypes.WETH_APPROVE, approveWethSaga);
  yield takeLeading(MainActionTypes.WETH_UPGRADE, upgradeWethSaga);
  yield takeLeading(MainActionTypes.WBTC_UPGRADE, upgradeWbtcSaga);
  yield takeLeading(MainActionTypes.WBTC_APPROVE, approveWbtcSaga);
  yield takeLeading(MainActionTypes.USDC_WETH_SUBSCRIPTION, subscriptionUsdcSaga);
  yield takeLeading(MainActionTypes.WETH_USDC_SUBSCRIPTION, subscriptionWethSaga);
  yield takeLeading(MainActionTypes.DAI_MKR_STOP_FLOW, daiMkrStopFlowSaga);
  yield takeLeading(MainActionTypes.USDC_WETH_STOP_FLOW, usdcWethStopFlowSaga);
  yield takeLeading(MainActionTypes.USDC_WBTC_STOP_FLOW, usdcWbtcStopFlowSaga);
  yield takeLeading(MainActionTypes.WETH_USDC_STOP_FLOW, wethUsdcStopFlowSaga);
  yield takeLeading(MainActionTypes.WBTC_USDC_STOP_FLOW, wbtcUsdcStopFlowSaga);
  yield takeLeading(MainActionTypes.DAI_MKR_START_FLOW, daiMkrStartFlowSaga);
  yield takeLeading(MainActionTypes.USDC_WETH_START_FLOW, usdcWethStartFlowSaga);
  yield takeLeading(MainActionTypes.USDC_WBTC_START_FLOW, usdcWbtcStartFlowSaga);
  yield takeLeading(MainActionTypes.WETH_USDC_START_FLOW, wethUsdcStartFlowSaga);
  yield takeLeading(MainActionTypes.WBTC_USDC_START_FLOW, wbtcUsdcStartFlowSaga);
  yield takeLeading(MainActionTypes.MAIN_SWITCH_NETWORK, switchNetworkSaga);
}

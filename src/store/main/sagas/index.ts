import { takeLeading } from 'redux-saga/effects';
import { MainActionTypes } from '../actionTypes';
import { daiDowngradeSaga, wethDowngradeSaga } from './downgradeSaga';
import { loadData } from './loadData';
import { approveDaiSaga, approveWethSaga } from './approveSaga';
import { upgradeDaiSaga, upgradeWethSaga } from './upgradeSaga';
import { mainChainSaga } from './mainChainChanged';
import {
  subscriptionDaiSaga, subscriptionWethSaga,
} from './subscription';
import { daiWethStopFlowSaga, wethDaiStopFlowSaga } from './stopFlow';
import { daiWethStartFlowSaga, wethDaiStartFlowSaga } from './startFlow';

export default function* mainSaga() {
  yield takeLeading(MainActionTypes.CHAIN_CHANGED, mainChainSaga);
  yield takeLeading(MainActionTypes.LOAD_DATA, loadData);
  yield takeLeading(MainActionTypes.DAI_DOWNGRADE, daiDowngradeSaga);
  yield takeLeading(MainActionTypes.WETH_DOWNGRADE, wethDowngradeSaga);
  yield takeLeading(MainActionTypes.DAI_APPROVE, approveDaiSaga);
  yield takeLeading(MainActionTypes.DAI_UPGRADE, upgradeDaiSaga);
  yield takeLeading(MainActionTypes.WETH_APPROVE, approveWethSaga);
  yield takeLeading(MainActionTypes.WETH_UPGRADE, upgradeWethSaga);
  yield takeLeading(MainActionTypes.DAI_WETH_SUBSCRIPTION, subscriptionDaiSaga);
  yield takeLeading(MainActionTypes.WETH_DAI_SUBSCRIPTION, subscriptionWethSaga);
  yield takeLeading(MainActionTypes.DAI_WETH_STOP_FLOW, daiWethStopFlowSaga);
  yield takeLeading(MainActionTypes.WETH_DAI_STOP_FLOW, wethDaiStopFlowSaga);
  yield takeLeading(MainActionTypes.DAI_WETH_START_FLOW, daiWethStartFlowSaga);
  yield takeLeading(MainActionTypes.WETH_DAI_START_FLOW, wethDaiStartFlowSaga);
}

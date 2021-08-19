import { takeLeading } from 'redux-saga/effects';
import { MainActionTypes } from '../actionTypes';
import { daiDowngradeSaga, wethDowngradeSaga } from './downgradeSaga';
import { loadData } from './loadData';
import { approveDaiSaga, approveWethSaga } from './approveSaga';
import { upgradeDaiSaga, upgradeWethSaga } from './upgradeSaga';
import { mainChainSaga } from './mainChainChanged';
import {
  subscriptionDaiSaga, subscriptionRicDaiSaga, subscriptionRicWethSaga, subscriptionWethSaga, 
} from './subscription';
import { daiStopFlowSaga, wethStopFlowSaga } from './stopFlow';
import { daiStartFlowSaga, wethStartFlowSaga } from './startFlow';

export default function* mainSaga() {
  yield takeLeading(MainActionTypes.CHAIN_CHANGED, mainChainSaga);
  yield takeLeading(MainActionTypes.LOAD_DATA, loadData);
  yield takeLeading(MainActionTypes.DAI_DOWNGRADE, daiDowngradeSaga);
  yield takeLeading(MainActionTypes.WETH_DOWNGRADE, wethDowngradeSaga);
  yield takeLeading(MainActionTypes.DAI_APPROVE, approveDaiSaga);
  yield takeLeading(MainActionTypes.DAI_UPGRADE, upgradeDaiSaga);
  yield takeLeading(MainActionTypes.WETH_APPROVE, approveWethSaga);
  yield takeLeading(MainActionTypes.WETH_UPGRADE, upgradeWethSaga);
  yield takeLeading(MainActionTypes.DAI_SUBSCRIPTION, subscriptionDaiSaga);
  yield takeLeading(MainActionTypes.WETH_SUBSCRIPTION, subscriptionWethSaga);
  yield takeLeading(MainActionTypes.RIC_DAI_SUBSCRIPTION, subscriptionRicDaiSaga);
  yield takeLeading(MainActionTypes.RIC_WETH_SUBSCRIPTION, subscriptionRicWethSaga);
  yield takeLeading(MainActionTypes.DAI_STOP_FLOW, daiStopFlowSaga);
  yield takeLeading(MainActionTypes.WETH_STOP_FLOW, wethStopFlowSaga);
  yield takeLeading(MainActionTypes.DAI_START_FLOW, daiStartFlowSaga);
  yield takeLeading(MainActionTypes.WETH_START_FLOW, wethStartFlowSaga);
}

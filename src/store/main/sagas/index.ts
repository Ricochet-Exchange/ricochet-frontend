import { takeEvery, takeLeading } from 'redux-saga/effects';
import { MainActionTypes } from '../actionTypes';
import { downgradeMainSaga } from './downgradeSaga';
import { loadData } from './loadData';
import { approveMainSaga } from './approveSaga';
import { upgradeMainSaga } from './upgradeSaga';
import { stopFlowSaga } from './stopFlow';
import { startFlowSaga } from './startFlow';
import { mainCheckSaga } from './mainCheckSaga';
import { switchNetworkSaga } from './switchNetworkSaga';
import { selectDowngradeCoinSaga, selectUpgradeCoinSaga, showTokenListSaga } from './selectCoinSaga';

export default function* mainSaga() {
  yield takeLeading(MainActionTypes.MAIN_CHECK, mainCheckSaga);
  yield takeLeading(MainActionTypes.MAIN_SWITCH_NETWORK, switchNetworkSaga);
  yield takeEvery(MainActionTypes.LOAD_DATA, loadData);
  yield takeLeading(MainActionTypes.MAIN_SWITCH_NETWORK, switchNetworkSaga);

  yield takeLeading(MainActionTypes.START_FLOW, startFlowSaga);
  yield takeLeading(MainActionTypes.STOP_FLOW, stopFlowSaga);
  yield takeLeading(MainActionTypes.DOWNGRADE, downgradeMainSaga);
  yield takeLeading(MainActionTypes.APPROVE, approveMainSaga);
  yield takeLeading(MainActionTypes.UPGRADE, upgradeMainSaga);

  yield takeLeading(MainActionTypes.SELECT_DOWNGRADE_COIN, selectDowngradeCoinSaga);
  yield takeLeading(MainActionTypes.SELECT_UPGRADE_COIN, selectUpgradeCoinSaga);
  yield takeLeading(MainActionTypes.SHOW_TYPE_TOKEN_LIST, showTokenListSaga);
}

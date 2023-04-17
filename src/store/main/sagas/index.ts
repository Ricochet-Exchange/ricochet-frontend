import { takeEvery, takeLeading } from 'redux-saga/effects';
import { MainActionTypes } from '../actionTypes';
import { downgradeMainSaga } from './downgradeSaga';
import { loadData } from './loadData';
import { readApprovalsSaga } from './readApprovalSaga';
import { readBalancesSaga } from './readBalancesSaga';
import { readCoinGeckoPricesSaga } from './readCoinGeckoPricesSaga';
import { approveMainSaga } from './approveSaga';
import { upgradeMainSaga } from './upgradeSaga';
import { stopFlowSaga } from './stopFlow';
import { startFlowSaga } from './startFlow';
import { mainCheckSaga } from './mainCheckSaga';
import { switchNetworkSaga } from './switchNetworkSaga';
import { aggregatedRICRewards } from './aggregateRICRewards';
import { selectDowngradeCoinSaga, selectUpgradeCoinSaga, showTokenListSaga } from './selectCoinSaga';
import { loadReadOnlyData } from './loadReadOnlyData';
import { connectWeb3Modal } from './connectWeb3Modal';
import { updateHistory } from './updateHistory';

export default function* mainSaga() {
	yield takeLeading(MainActionTypes.MAIN_CHECK, mainCheckSaga);
	yield takeLeading(MainActionTypes.MAIN_SWITCH_NETWORK, switchNetworkSaga);
	yield takeLeading(MainActionTypes.MAIN_SWITCH_NETWORK, switchNetworkSaga);

	yield takeLeading(MainActionTypes.READ_APPROVALS, readApprovalsSaga);
	yield takeLeading(MainActionTypes.READ_COINGECK_PRICES, readCoinGeckoPricesSaga);
	yield takeLeading(MainActionTypes.READ_BALANCES, readBalancesSaga);

	yield takeEvery(MainActionTypes.LOAD_DATA, loadData);

	//@ts-ignore
	yield takeLeading(MainActionTypes.ADD_REWARD, aggregatedRICRewards);
	//@ts-ignore
	yield takeLeading(MainActionTypes.UPDATE_HISTORY, updateHistory);

	yield takeLeading(MainActionTypes.START_FLOW, startFlowSaga);
	yield takeLeading(MainActionTypes.STOP_FLOW, stopFlowSaga);
	yield takeLeading(MainActionTypes.DOWNGRADE, downgradeMainSaga);
	yield takeLeading(MainActionTypes.APPROVE, approveMainSaga);
	yield takeLeading(MainActionTypes.UPGRADE, upgradeMainSaga);

	yield takeLeading(MainActionTypes.SELECT_DOWNGRADE_COIN, selectDowngradeCoinSaga);
	yield takeLeading(MainActionTypes.SELECT_UPGRADE_COIN, selectUpgradeCoinSaga);
	yield takeLeading(MainActionTypes.SHOW_TYPE_TOKEN_LIST, showTokenListSaga);
	yield takeEvery(MainActionTypes.LOAD_READ_ONLY_DATA, loadReadOnlyData);
	yield takeEvery(MainActionTypes.CONNECT_WEB3_MODAL, connectWeb3Modal);
}

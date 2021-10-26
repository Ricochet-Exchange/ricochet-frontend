import { put } from 'redux-saga/effects';
import { transformError } from 'utils/transformError';
import { ModalType } from '../../modal/types';
import { modalShow, modalHide } from '../../modal/actionCreators';

import {
  mainSetState, selectDowngradeCoin, selectUpgradeCoin, showTokenList, 
} from '../actionCreators';

export function* selectUpgradeCoinSaga({ payload }: ReturnType<typeof selectUpgradeCoin>) {
  try {
    yield put(mainSetState({ selectedUpgradeCoin: payload.selectedUpgradeCoin }));
    yield put(modalHide());
  } catch (e) {
    transformError(e);
  }
}

export function* selectDowngradeCoinSaga({ payload }: ReturnType<typeof selectDowngradeCoin>) {
  try {
    yield put(mainSetState({ selectedDowngradeCoin: payload.selectedDowngradeCoin }));
    yield put(modalHide());
  } catch (e) {
    transformError(e);
  }
}

export function* showTokenListSaga({ payload }: ReturnType<typeof showTokenList>) {
  try {
    yield put(mainSetState({ coinType: payload.coinType }));
    yield put(modalShow(ModalType.SelectToken));
  } catch (e) {
    transformError(e);
  }
}

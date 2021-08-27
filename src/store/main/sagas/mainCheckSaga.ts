import { call, put } from 'redux-saga/effects';
import { modalHide, modalShow } from 'store/modal/actionCreators';
import { ModalType } from 'store/modal/types';
import { mainCheck, mainGetData } from '../actionCreators';

export function* mainCheckSaga() {
  try {
    const { ethereum } = (window as any);
    if (!ethereum) {
      // if metamask don't install run modal setup metamask
      yield put(modalShow(ModalType.Metamask));
    } else {
      yield call(ethereum.enable);
      const chainId = parseInt(ethereum.networkVersion, 10);
      if (chainId === Number(process.env.REACT_APP_CHAIN_ID)) {
        yield put(modalHide());
        yield put(mainGetData());
      } else {
        // run modal switch network
        yield put(modalShow(ModalType.Network));
      }
    }
  } catch (e) {
    yield put(mainCheck());
  } 
}

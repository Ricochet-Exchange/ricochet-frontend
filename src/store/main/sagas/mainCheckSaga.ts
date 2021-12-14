import { call, put } from 'redux-saga/effects';
import { banksGetData } from 'store/banks/actionCreators';
import { modalHide, modalShow } from 'store/modal/actionCreators';
import { ModalType } from 'store/modal/types';
import { mainCheck, mainGetData, mainGetReadOnlyData } from '../actionCreators';

export function* mainCheckSaga() {
  try {
    const { ethereum } = (window as any);
    if (!ethereum) {
      // if metamask don't installed
      // Show read only data Total Value Streaming, Total Streamers, rexLP yield %, $RIC price, etc
      yield put(mainGetReadOnlyData());
    } else {
      yield call(ethereum.enable);
      const chainId = parseInt(ethereum.networkVersion, 10);
      if (chainId === Number(process.env.REACT_APP_CHAIN_ID)) {
        yield put(modalHide());
        yield put(mainGetData());
        yield put(banksGetData());
      } else {
        // run modal switch network
        yield put(modalShow(ModalType.Network));
      }
    }
  } catch (e) {
    yield put(mainCheck());
  } 
}

import { call, put } from 'redux-saga/effects';
import { modalHide, modalShow } from 'store/modal/actionCreators';
import { ModalType } from 'store/modal/types';
import Web3 from 'web3';
import { getConnectedSafe, getSafeProvider } from 'utils/getSafeInfo';
import { Unwrap } from 'types/unwrap';
import { LedgerHQFrameConnector } from 'utils/ledgerhq-frame-connector/connector';
import { getLedgerChainId, getLedgerProvider } from 'utils/getLedgerInfo';

import {
  connectWeb3Modal, mainCheck, mainGetData, mainGetReadOnlyData, mainSetState, 
} from '../actionCreators';

export function* mainCheckSaga() {
  try {
    const gnosisSafeProvider: Unwrap<typeof getSafeProvider > = yield call(getSafeProvider);
    const ledgerHQFrame = new LedgerHQFrameConnector();
    // Check we are inside gnosis safe
    if (gnosisSafeProvider) {
      yield put(mainSetState({ web3: new Web3(<any>gnosisSafeProvider!) }));
      const connectedSafe: Unwrap<typeof getConnectedSafe> = yield call(
        getConnectedSafe,
      );
      const chainId = connectedSafe?.chainId;
      // Check we are on polygon chain
      if (chainId === Number(process.env.REACT_APP_CHAIN_ID)) {
        yield put(modalHide());
        yield put(mainGetData());
      } else {
        // Run modal switch network
        yield put(modalShow(ModalType.Network));
      }
    } else if (ledgerHQFrame.isLedgerApp()) {
      const ledgerProvider: Unwrap<typeof getLedgerProvider> =
          yield call(getLedgerProvider, ledgerHQFrame);
      const chainId: Unwrap<typeof getLedgerChainId> =
          yield call(getLedgerChainId, ledgerHQFrame);
      yield put(mainSetState({ web3: new Web3(<any>ledgerProvider!) }));
      if (parseInt(chainId.toString(), 16) === Number(process.env.REACT_APP_CHAIN_ID)) {
        yield put(modalHide());
        yield put(mainGetData());
      } else {
        // Run modal switch network
        yield put(modalShow(ModalType.Network));
      }
    } else if (localStorage.getItem('WEB3_CONNECT_CACHED_PROVIDER')) {
      yield put(connectWeb3Modal());
    } else {
      yield put(mainSetState({
        web3: new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_API_NODE_URL!)),
      }));
      yield put(mainGetReadOnlyData());
    }
  } catch (e) {
    yield put(mainCheck());
  }
}

import { call, put } from 'redux-saga/effects';
import { modalHide, modalShow } from 'store/modal/actionCreators';
import { ModalType } from 'store/modal/types';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import {
  mainCheck,
  mainGetData,
  mainSetState,
} from '../actionCreators';
import { getConnectedSafe, requestProvider } from '../../../utils/getSafeInfo';
import { Unwrap } from '../../../types/unwrap';

export function* mainCheckSaga() {
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: process.env.REACT_APP_INFURA_ID, // required
      },
    },
  };
  try {
    const { ethereum } = window as any;
    const gnosisSafeProvider: Unwrap<typeof requestProvider> = yield call(
      requestProvider,
    );
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
    } else if (ethereum) {
      const web3Modal = new Web3Modal({
        providerOptions,
      });
      const provider = yield call(web3Modal.connect);
      const web3 = new Web3(provider);
      const chainId = yield call(web3.eth.net.getId);
      if (chainId === Number(process.env.REACT_APP_CHAIN_ID)) {
        yield put(modalHide());
        yield put(mainGetData());
      } else {
        // Run modal switch network
        yield put(modalShow(ModalType.Network));
      }
      yield put(mainSetState({ web3 }));
    } else {
      const web3Modal = new Web3Modal({
        providerOptions,
        disableInjectedProvider: true,
      });
      const provider = yield call(web3Modal.connect);
      const web3 = new Web3(provider);
      const chainId = yield call(web3.eth.net.getId);
      if (chainId === Number(process.env.REACT_APP_CHAIN_ID)) {
        yield put(modalHide());
        yield put(mainGetData());
      } else {
        // Run modal switch network
        yield put(modalShow(ModalType.Network));
      }
      yield put(mainSetState({ web3 }));
    }
  } catch (e) {
    yield put(mainCheck());
  }
}

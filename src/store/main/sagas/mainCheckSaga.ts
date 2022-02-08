import { call, put } from 'redux-saga/effects';
import { modalHide, modalShow } from 'store/modal/actionCreators';
import { ModalType } from 'store/modal/types';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import WalletLink from 'walletlink';
import {
  mainCheck,
  mainGetData,
  mainGetReadOnlyData,
  mainSetState,
} from '../actionCreators';
import { getConnectedSafe, requestProvider } from '../../../utils/getSafeInfo';
import { Unwrap } from '../../../types/unwrap';

export function* mainCheckSaga(payload: { init:boolean }) {
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        rpc: {
          137: process.env.REACT_APP_RPC_URLS,
        },
      },
    },
    walletlink: {
      package: WalletLink,
      options: {
        rpc: process.env.REACT_APP_RPC_URLS,
        chainId: 137,
      },
    },
  };
  const web3Modal = new Web3Modal({
    network: 'matic',
    providerOptions,
    cacheProvider: true,
  });
  if (payload.init) {
    yield put(mainSetState({ 
      web3: new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_API_NODE_URL!)), 
    }));
    yield put(mainGetReadOnlyData());
  } else {
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
}

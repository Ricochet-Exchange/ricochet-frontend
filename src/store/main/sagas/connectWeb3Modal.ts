import { call, put } from 'redux-saga/effects';
import WalletConnectProvider from '@walletconnect/web3-provider';
import WalletLink from 'walletlink';
import Web3Modal from 'web3modal';
import Web3 from 'web3';
import Torus from '@toruslabs/torus-embed';
import { mainGetData, mainSetState } from '../actionCreators';
import { modalHide, modalShow } from '../../modal/actionCreators';
import { ModalType } from '../../modal/types';

export function* connectWeb3Modal(): any {
  try {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          rpc: {
            137: process.env.NEXT_PUBLIC_RPC_URLS,
          },
        },
      },
      walletlink: {
        package: WalletLink,
        options: {
          rpc: process.env.NEXT_PUBLIC_RPC_URLS,
          chainId: 137,
        },
      },
      torus: {
        package: Torus,
        options: {
          networkParams: {
            chainId: 137,
          },
        },
      },
    };
    const web3Modal = new Web3Modal({
      network: 'matic',
      providerOptions,
      cacheProvider: true,
    });

    const provider = yield call(web3Modal.connect);
    const readWeb3 = new Web3(new Web3.providers.HttpProvider(process.env.NEXT_PUBLIC_API_NODE_URL!));
    const web3 = new Web3(provider);
    const chainId = yield call(web3.eth.net.getId);
    if (chainId === Number(process.env.NEXT_PUBLIC_CHAIN_ID)) {
      yield put(modalHide());
      yield put(mainGetData());
    } else {
      // Run modal switch network
      yield put(modalShow(ModalType.Network));
    }
    yield put(mainSetState({ web3, readWeb3 }));
  } catch (e) {
    // Ignoring error, since user can reject connection
    console.warn(e);
  }
}

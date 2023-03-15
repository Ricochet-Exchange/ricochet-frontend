import { call, put } from 'redux-saga/effects';
import WalletConnectProvider from '@walletconnect/web3-provider';
import WalletLink from 'walletlink';
import { SafeAppWeb3Modal } from '@gnosis.pm/safe-apps-web3modal';
import Web3 from 'web3';
import Torus from '@toruslabs/torus-embed';
import { mainCheck, mainGetData, mainSetState } from '../actionCreators';
import { modalHide, modalShow } from '../../modal/actionCreators';
import { ModalType } from '../../modal/types';
import { store } from '../../index';
// import { SafeAppProvider } from '@gnosis.pm/safe-apps-provider';
// import { getProvider } from 'utils/getSafeInfo';

export function* connectWeb3Modal(): any {
	try {
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
			torus: {
				package: Torus,
				options: {
					networkParams: {
						chainId: 137,
					},
				},
			},
			// "custom-gnosis": {
			//   display: {
			//     logo: "https://gnosis-safe.io/app/static/media/transition-logo.f4f66a24.gif?40",
			//     name: "Example Provider",
			//     description: "Connect to your example provider account"
			//   },
			//   package: SafeAppProvider,
			//   options: {
			//     networkParams: {
			//       chainId: 137,
			//     },
			//   },
			//   connector: async () => {
			//     const provider = await getProvider();

			//     console.log(provider)

			//     await provider.connect();

			//     return provider;
			//   }
			// }
		};
		// const web3Modal = new Web3Modal({
		//   network: 'matic',
		//   providerOptions,
		//   cacheProvider: true,
		// });
		const web3Modal = new SafeAppWeb3Modal({
			network: 'matic',
			providerOptions,
			cacheProvider: true,
		});

		// const provider = yield call(web3Modal.connect);
		const provider = yield call(web3Modal.requestProvider);
		const readWeb3 = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_API_NODE_URL!));
		const web3 = new Web3(provider);
		const chainId = yield call(web3.eth.net.getId);
		if (chainId === Number(process.env.REACT_APP_CHAIN_ID)) {
			yield put(modalHide());
			yield put(mainGetData());
		} else {
			// Run modal switch network
			yield put(modalShow(ModalType.Network));
		}
		provider?.on('chainChanged', () => store.dispatch(mainCheck()));
		provider?.on('accountsChanged', () => store.dispatch(mainGetData()));
		yield put(mainSetState({ web3, readWeb3 }));
	} catch (e) {
		// Ignoring error, since user can reject connection
		console.warn(e);
	}
}

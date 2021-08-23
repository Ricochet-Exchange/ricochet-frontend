import { put } from 'redux-saga/effects';
import { mainChainChanged, mainSetState } from '../actionCreators';

export function* mainChainSaga({ payload }: ReturnType<typeof mainChainChanged>) {
  const chainId = parseInt(payload, 10);
  if (chainId !== Number(process.env.REACT_APP_CHAIN_ID)) {
    yield put(mainSetState({ disabled: true }));
  } else {
    yield put(mainSetState({ disabled: false }));
  }
} 

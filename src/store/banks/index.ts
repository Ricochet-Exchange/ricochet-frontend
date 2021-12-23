import { createReducer } from 'utils/createReducer';
import { TOKEN_PAIRS, CONTRACT_ADDRESSES } from 'constants/contracts';
import { chainSettings } from 'constants/chainSettings';
import { BanksState } from './types';
import { MAIN_HANDLERS } from './handlers';

const chainID: number = +chainSettings.chainId!;

export const banksInitialState: Readonly<BanksState> = {
  tokenPairs: TOKEN_PAIRS,
  activePair: TOKEN_PAIRS[0],
  bankAddresses: CONTRACT_ADDRESSES[chainID],
  banks: [],
  isLoadingSubmit: false,
  isLoadingApprove: false,
  isLoadingTransaction: false,
};

export default createReducer(banksInitialState, MAIN_HANDLERS);

import { State } from 'types/store';

export const selectBanks = (state: State) => state.banks;
export const selectBanksData = (state: State) => state.banks.banks;
export const selectBanksAddresses = (state: State) => state.banks.bankAddresses;

import { State } from 'types/store';

export const selectMain = (state: State) => state.main;
export const selectBalances = (state: State) => state.main.balances;

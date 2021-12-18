import { State } from 'types/store';
import { flowConfig } from 'constants/flowConfig';

export const selectMain = (state: State) => state.main;
export const selectBalances = (state: State) => state.main.balances;
export const selectUserStreams = (state: State) => flowConfig
  .filter(({ flowKey }) => parseFloat(state.main[flowKey]?.placeholder || '0') > 0);

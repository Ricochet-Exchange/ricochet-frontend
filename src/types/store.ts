import { BanksState } from 'store/banks/types';
import { MainState } from 'store/main/types';
import { ModalState } from 'store/modal/types';
import { DistributionState } from 'store/distributions/types';

export interface State {
  main: MainState,
  banks: BanksState,
  modal: ModalState,
  distributions: DistributionState,
}

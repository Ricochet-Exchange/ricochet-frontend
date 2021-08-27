export enum ModalType {
  Metamask = 'metamask',
  Network = 'network',
}

export type ModalState = {
  active: boolean;
  current?: ModalType;
};

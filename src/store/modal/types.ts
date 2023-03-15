export enum ModalType {
  Metamask = 'metamask',
  Network = 'network',
  SelectToken = 'token',
}

export type ModalState = {
  active: boolean;
  current?: ModalType;
};

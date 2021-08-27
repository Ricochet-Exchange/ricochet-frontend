import React, { FC, useEffect } from 'react';
import { useModal } from 'hooks/useModal';
import ReactModal from 'react-modal';
import { disablePageScroll, enablePageScroll } from 'scroll-lock';
import { ModalType } from 'store/modal/types';
import { ModalMetamask } from 'containers/modal/ModalMetamask';
import { ModalNetwork } from 'containers/modal/ModalNetwork';
import styles from './styles.module.scss';

ReactModal.setAppElement('#root');

export type ModalComponentProps = { 
  onCloseModal: () => void 
};

const modalRenderers: Record<ModalType, FC<ModalComponentProps>> = {
  [ModalType.Metamask]: ModalMetamask,
  [ModalType.Network]: ModalNetwork,  
};

interface IProps {}

export const Modal: FC<IProps> = () => {
  const {
    current, active, onCloseModal,
  } = useModal();

  useEffect(() => {
    if (!active) {
      return;
    }

    disablePageScroll();
    return () => enablePageScroll();
  }, [active]);

  if (!active || !current) {
    return null;
  }

  return (
    <ReactModal
      isOpen={active}
      className={styles.modal}
      overlayClassName={styles.modal_overlay}
      preventScroll
    >
      {React.createElement(modalRenderers[current], { onCloseModal })}
    </ReactModal>
  );
};

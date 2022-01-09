import React, { FC, useEffect } from 'react';
import { useModal } from 'hooks/useModal';
import ReactModal from 'react-modal';
import { disablePageScroll, enablePageScroll } from 'scroll-lock';
import { ModalType } from 'store/modal/types';
import { ModalMetamask } from 'containers/modal/ModalMetamask';
import { ModalNetwork } from 'containers/modal/ModalNetwork';
import { ModalContainer } from 'containers/main/ModalContainer';
import cx from 'classnames';
import styles from './styles.module.scss';

ReactModal.setAppElement('#root');

export type ModalComponentProps = { 
  onCloseModal: () => void,
};

const modalRenderers: Record<ModalType, FC<ModalComponentProps>> = {
  [ModalType.Metamask]: ModalMetamask,
  [ModalType.Network]: ModalNetwork,
  [ModalType.SelectToken]: ModalContainer,
};

interface IProps {
  classNameOverlay?: string,
}

export const Modal: FC<IProps> = ({ classNameOverlay }) => {
  const {
    current, active, onCloseModal,
  } = useModal();

  useEffect(() => {
    if (!active) {
      return;
    }

    disablePageScroll();
    return () => enablePageScroll();
  }, [active, current]);

  if (!active || !current) {
    return null;
  }

  return (
    <ReactModal
      isOpen={active}
      className={cx(styles.modal, {
        [styles.modal_token]: !!ModalType.SelectToken,
      })}
      overlayClassName={cx(styles.modal_overlay, classNameOverlay)}
      preventScroll
    >
      {React.createElement(modalRenderers[current], { onCloseModal })}
    </ReactModal>
  );
};

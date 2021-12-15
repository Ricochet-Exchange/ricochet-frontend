import React, { FC } from 'react';
import { Button } from 'antd';
import { useModal } from 'hooks/useModal';
import { ModalType } from 'store/modal/types';

type Props = {
  size?: string,
  color?: string,
};

export const SignInButton: FC<Props> = ({ size = 'big', color }) => {
  const { showModal } = useModal();

  return (
    <>
      {size === 'big' ? (
        <Button
          className="lightshadow biggestbutton"
          size="large"
          onClick={showModal(ModalType.Metamask)}
        >
          Sign in with Web3
        </Button>
      ) : (
        <Button
          className={color ? `${color}button` : ''}
          size="large"
          shape="round"
          onClick={showModal(ModalType.Metamask)}
        >
          Sign in with Web3
        </Button>
      )}
    </>
  );
};

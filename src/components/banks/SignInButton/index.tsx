import React, { FC, useCallback } from 'react';
import { Button } from 'antd';
import { useModal } from 'hooks/useModal';
import { ModalType } from 'store/modal/types';
import { useDispatch } from 'react-redux';
import { mainCheck } from 'store/main/actionCreators';

type Props = {
  isReadOnly?: boolean,
  size?: string,
  color?: string,
};

export const SignInButton: FC<Props> = ({ size = 'big', color, isReadOnly }) => {
  const { showModal } = useModal();
  const dispatch = useDispatch();
  const onClick = useCallback(() => {
    if (isReadOnly) {
      showModal(ModalType.Metamask);
    } else dispatch(mainCheck());
  }, [dispatch, showModal]);

  return (
    <>
      {size === 'big' ? (
        <Button
          className="lightshadow biggestbutton"
          size="large"
          onClick={onClick}
        >
          Sign in with Web3
        </Button>
      ) : (
        <Button
          className={color ? `${color}button` : ''}
          size="large"
          shape="round"
          onClick={onClick}
        >
          Sign in with Web3
        </Button>
      )}
    </>
  );
};

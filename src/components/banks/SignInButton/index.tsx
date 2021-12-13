import React, { FC } from 'react';
import { Button } from 'antd';

type Props = {
  size?: string,
  color?: string,
};

export const SignInButton: FC<Props> = ({ size = 'big', color }) => {
  const activate = () => {};
  
  return (
    <>
      {size === 'big' ? (
        <Button
          className="lightshadow biggestbutton"
          size="large"
          onClick={() => activate()}
        >
          Sign in with Web3
        </Button>
      ) : (
        <Button
          className={color ? `${color}button` : ''}
          size="large"
          shape="round"
          onClick={() => activate()}
        >
          Sign in with Web3
        </Button>
      )}
    </>
  );
};

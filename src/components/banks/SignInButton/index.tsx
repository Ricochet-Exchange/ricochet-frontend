import React, { FC } from 'react';
import cx from 'classnames';
import { Button } from 'components/common/Button';
import styles from './styles.module.scss';

type Props = {
  className?: string,
  onClick: () => void,
};

export const SignInButton: FC<Props> = ({ className, onClick }) => (
  <Button
    className={cx(styles.button, className)}
    onClick={onClick}
    label="Sign in with Web3"
  />
);

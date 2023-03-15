import React, { FC } from 'react';
import cx from 'classnames';
import { Button } from 'components/common/Button';
import { FontIcon, FontIconName } from 'components/common/FontIcon';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

type Props = {
  className?: string;
  onClick: () => void;
};

export const SignInButton: FC<Props> = ({ className, onClick }) => {
  const { t } = useTranslation();

  return (
    <Button className={cx(styles.button, className)} onClick={onClick} label="">
      <FontIcon name={FontIconName.Login} size={16} />
      {t('Sign in with Web3')}
    </Button>
  );
};

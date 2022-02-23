import React, { FC } from 'react';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { RICAddress } from 'constants/polygon_config';
import { selectMain } from 'store/main/selectors';
import { BanksContainer } from 'containers/main/BanksContainer';
import { MainLayout } from 'containers/MainLayout';
import { HeaderContainer } from 'containers/main/HeaderContainer';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

interface IProps {}

export const BanksPage: FC<IProps> = () => {
  const {
    address,
    balances,
  } = useShallowSelector(selectMain);
  const { t } = useTranslation('main');

  return (
    <MainLayout>
      <div className={styles.header}>
        <HeaderContainer balance={balances && balances[RICAddress]} address={address || t('Connect Wallet')} />
      </div>
      <div className={styles.content}>
        <BanksContainer />
      </div>
    </MainLayout>
  );
};

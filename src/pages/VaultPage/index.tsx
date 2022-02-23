import React, { FC } from 'react';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { selectMain } from 'store/main/selectors';
import { MainLayout } from 'containers/MainLayout';
import { HeaderContainer } from 'containers/main/HeaderContainer';
import { RICAddress } from 'constants/polygon_config';
import { VaultsContainer } from 'containers/main/VaultsContainer';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

interface IProps {}

export const VaultsPage: FC<IProps> = () => {
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
        <VaultsContainer />
      </div>
    </MainLayout>
  );
};

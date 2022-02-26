import React, { FC } from 'react';
import { useShallowSelector } from '../../hooks/useShallowSelector';
import { selectMain } from '../../store/main/selectors';
import { MainLayout } from '../../containers/MainLayout';
import styles from '../InvestPage/styles.module.scss';
import { HeaderContainer } from '../../containers/main/HeaderContainer';
import { RICAddress } from '../../constants/polygon_config';
import { DistributionContainer } from '../../containers/main/DistributionContainer';

interface IProps {
}

const DistributionPage: FC<IProps> = () => {
  const {
    address,
    balances,
  } = useShallowSelector(selectMain);
  return (
    <MainLayout>
      <div className={styles.header}>
        <HeaderContainer balance={balances && balances[RICAddress]} address={address || 'Connect Wallet'} />
      </div>
      <div className={styles.content}>
        <DistributionContainer />
      </div>
    </MainLayout>
  );
};

export { DistributionPage };

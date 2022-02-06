import { RICAddress } from 'constants/polygon_config';
import { HeaderContainer } from 'containers/main/HeaderContainer';
import { InvestNav } from 'components/layout/InvestNav';
import { MainLayout } from 'containers/MainLayout';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { ContractContainer } from 'containers/main/ContractContainer';
import React, {
  FC,
} from 'react';
import { selectMain } from 'store/main/selectors';
import styles from './styles.module.scss';

interface IProps {}

const ContractPage: FC<IProps> = () => {
  const {
    address,
    balances,
    isReadOnly,
  } = useShallowSelector(selectMain);
  return (
    <MainLayout>
      <div className={styles.header}>
        <HeaderContainer isReadOnly={isReadOnly} balance={balances && balances[RICAddress]} address={address || 'Connect Wallet'} />
      </div>
      <div className={styles.content}>
        <div className={styles.left_wallet_nav}>
          <InvestNav />
        </div>
      
        <div className={styles.contracts}>
          <ContractContainer />
        </div>
      </div>
    </MainLayout>
  );
};

export { ContractPage };

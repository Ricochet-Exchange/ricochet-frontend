import { RICAddress } from 'constants/polygon_config';
import { HeaderContainer } from 'containers/main/HeaderContainer';
import { UpgradeContainer } from 'containers/main/UpgradeContainer';
import { MainLayout } from 'containers/MainLayout';
import { Modal } from 'components/common/Modal';
import { useShallowSelector } from 'hooks/useShallowSelector';
import React, {
  FC, 
} from 'react';
import { selectMain } from 'store/main/selectors';
import styles from './styles.module.scss';

interface IProps {}

const WalletPage: FC<IProps> = () => {
  const {
    address,
    balances,
    isReadOnly,
  } = useShallowSelector(selectMain);

  return (
    <MainLayout>
      <div className={styles.header}>
        <HeaderContainer isReadOnly={isReadOnly} balance={balances && balances[RICAddress]} address={address || 'Connecting'} />
      </div>
      <div className={styles.content}>
        <UpgradeContainer balance={balances && balances[RICAddress]} address={address || 'Connecting'} />
      </div>
    
    </MainLayout>
  );
};

export { WalletPage };

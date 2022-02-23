import { RICAddress } from 'constants/polygon_config';
import { UpgradeContainer } from 'containers/main/UpgradeContainer';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { InvestNav } from 'components/layout/InvestNav';
import React, { FC } from 'react';
import { selectMain } from 'store/main/selectors';
import styles from './styles.module.scss';

interface IProps {}

const WalletPage: FC<IProps> = () => {
  const {
    address,
    balances,
  } = useShallowSelector(selectMain);

  return (
    <div className={styles.content_special}>
      <div className={styles.left_wallet_nav}>
        <InvestNav />
      </div>
      <div className={styles.wallet}>
        <UpgradeContainer balance={balances && balances[RICAddress]} address={address || 'Connect Wallet'} />
      </div>
    </div>
  );
};

export { WalletPage };

import React from 'react';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { selectMain } from 'store/main/selectors';
import { HeaderContainer } from 'containers/main/HeaderContainer';
import { RICAddress } from 'constants/polygon_config';
import styles from './styles.module.scss';

interface IProps {}

export const MainLayout: React.FC<IProps> = ({ children }) => {
  const { address, balances } = useShallowSelector(selectMain);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <HeaderContainer
          balance={balances && balances[RICAddress]}
          address={address || 'Connect Wallet'}
        />
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

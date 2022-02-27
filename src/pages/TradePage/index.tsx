import { RICAddress } from 'constants/polygon_config';
import { HeaderContainer } from 'containers/main/HeaderContainer';
import { TradeContainer } from 'containers/main/TradeContainer';
import { MainLayout } from 'containers/MainLayout';
import { useShallowSelector } from 'hooks/useShallowSelector';
import React, {
  FC,
} from 'react';
import { selectMain } from 'store/main/selectors';
import styles from './styles.module.scss';

interface IProps {}

const TradePage: FC<IProps> = () => {
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
        <TradeContainer />
      </div>
    </MainLayout>
  );
};

export { TradePage };

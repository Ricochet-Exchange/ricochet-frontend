import { RICAddress } from 'constants/polygon_config';
import { HeaderContainer } from 'containers/main/HeaderContainer';
import { InvestContainer } from 'containers/main/InvestContainer';
import { MainLayout } from 'containers/MainLayout';
import { useShallowSelector } from 'hooks/useShallowSelector';
import {
  useRouteMatch,
} from 'react-router-dom';
import { RoutesToFlows } from 'constants/flowConfig';
import React, {
  FC,
} from 'react';
import { selectMain } from 'store/main/selectors';
import styles from './styles.module.scss';

interface IProps {}

const InvestPage: FC<IProps> = () => {
  const {
    address,
    balances, 
  } = useShallowSelector(selectMain);
  const match = useRouteMatch();
  return (
    <MainLayout>
      <div className={styles.header}>
        <HeaderContainer balance={balances && balances[RICAddress]} address={address || 'Connecting'} />
      </div>
      <div className={styles.content}>
        <InvestContainer key={match.path} flowConfig={RoutesToFlows[match.path]} />
      </div>
    
    </MainLayout>
  );
};

export { InvestPage };

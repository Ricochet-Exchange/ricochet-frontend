import React, { useEffect } from 'react';
import { MainLayout } from 'containers/MainLayout';
import { useDispatch } from 'react-redux';
import { mainGetData } from 'store/main/actionCreators';
import { Header } from 'components/layout/Header';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { selectMain } from 'store/main/selectors';
import { WethDowngrade } from 'containers/main/WethDowngrade';
import { DaiDowngrade } from 'containers/main/DaiDowngrade';
import {
  DAIAddress, DAIxAddress, RICAddress, WETHAddress, WETHxAddress, 
} from 'constants/polygon_config';
import { DaiUpgrade } from 'containers/main/DaiUpgrade';
import { WethUpgrade } from 'containers/main/WethUpgrade';
import { DaiSubscription } from 'containers/main/DaiSubscription';
import { WethSubscription } from 'containers/main/WethSubscription';
import { DaiFlow } from 'containers/main/DaiFlow';
import { WethFlow } from 'containers/main/WethFlow';
import styles from './styles.module.scss';

export const MainPage: React.FC = () => {
  const dispatch = useDispatch();
  const {
    address, 
    balances, 
    disabled,
    hasDaiApprove,
    hasWethApprove,
    daiFlowQuery,
    wethFlowQuery,
  } = useShallowSelector(selectMain);

  useEffect(() => {
    dispatch(mainGetData());
  }, [dispatch]);

  return (
    <MainLayout>
      <div className={styles.header}>
        <Header 
          account={address || 'Connecting'}
          ricBalance={balances && balances[RICAddress]}
        />
      </div>
      <div className={styles.list}>
        <DaiFlow 
          balance={balances && balances[DAIxAddress]}
          totalFlows={daiFlowQuery?.totalFlows}
          flowsOwned={daiFlowQuery?.flowsOwned}
          placeholder={daiFlowQuery?.placeholder}
        />
        <WethFlow    
          balance={balances && balances[WETHxAddress]}
          totalFlows={wethFlowQuery?.totalFlows}
          flowsOwned={wethFlowQuery?.flowsOwned}
          placeholder={wethFlowQuery?.placeholder}
        />
      
        <DaiUpgrade 
          balance={balances && balances[DAIAddress]}
          disabled={disabled}
          hasDaiApprove={hasDaiApprove}
        />
        <WethUpgrade 
          balance={balances && balances[WETHAddress]}
          disabled={disabled}
          hasWethApprove={hasWethApprove}
        />

        <DaiDowngrade
          balance={balances && balances[DAIxAddress]}
          disabled={disabled}
        />
        <WethDowngrade
          balance={balances && balances[WETHxAddress]}
          disabled={disabled}
        />
      
        <DaiSubscription />
        <WethSubscription />
      </div>
    </MainLayout>
  ); 
};

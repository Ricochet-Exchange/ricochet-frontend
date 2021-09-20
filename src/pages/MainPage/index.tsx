import React, { useEffect } from 'react';
import { MainLayout } from 'containers/MainLayout';
import { useDispatch } from 'react-redux';
import { mainCheck } from 'store/main/actionCreators';
import { Header } from 'components/layout/Header';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { selectMain } from 'store/main/selectors';
import { WethDowngrade } from 'containers/main/WethDowngrade';
import { UsdcDowngrade } from 'containers/main/UsdcDowngrade';
import { DaiDowngrade } from 'containers/main/DaiDowngrade';
import { WbtcDowngrade } from 'containers/main/WbtcDowngrade';
import {
  USDCAddress, USDCxAddress, RICAddress,
  DAIAddress, DAIxAddress,
  WETHAddress, WETHxAddress,
  WBTCAddress, WBTCxAddress,
} from 'constants/polygon_config';
import { UsdcUpgrade } from 'containers/main/UsdcUpgrade';
import { DaiUpgrade } from 'containers/main/DaiUpgrade';
import { WethUpgrade } from 'containers/main/WethUpgrade';
import { WbtcUpgrade } from 'containers/main/WbtcUpgrade';
import { UsdcWethFlow } from 'containers/main/UsdcWethFlow';
import { UsdcWbtcFlow } from 'containers/main/UsdcWbtcFlow';
import { WethUsdcFlow } from 'containers/main/WethUsdcFlow';
import { WbtcUsdcFlow } from 'containers/main/WbtcUsdcFlow';
import { CoinsList } from 'components/layout/CoinsList';
import styles from './styles.module.scss';

export const MainPage: React.FC = () => {
  const dispatch = useDispatch();
  const {
    address,
    balances,
    hasUsdcApprove,
    hasDaiApprove,
    hasWethApprove,
    hasWbtcApprove,
    usdcWethFlowQuery,
    usdcWbtcFlowQuery,
    wethUsdcFlowQuery,
    wbtcUsdcFlowQuery,
    isLoadingDaiDowngrade,
    isLoadingUsdcDowngrade,
    isLoadingDaiUpgrade,
    isLoadingUsdcUpgrade,
    isLoadingUsdcWbtcFlow,
    isLoadingUsdcWethFlow,
    isLoadingWbtcDowngrade,
    isLoadingWbtcUpgrade,
    isLoadingWbtcFlow,
    isLoadingWethDownGrade,
    isLoadingWethUpgrade,
    isLoadingWethFlow,
  } = useShallowSelector(selectMain);

  useEffect(() => {
    dispatch(mainCheck());
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
        <UsdcWethFlow
          balance={balances && balances[USDCxAddress]}
          totalFlows={usdcWethFlowQuery?.totalFlows}
          flowsOwned={usdcWethFlowQuery?.flowsOwned}
          placeholder={usdcWethFlowQuery?.placeholder}
          isLoading={isLoadingUsdcWethFlow}
        />

        <UsdcWbtcFlow
          balance={balances && balances[USDCxAddress]}
          totalFlows={usdcWbtcFlowQuery?.totalFlows}
          flowsOwned={usdcWbtcFlowQuery?.flowsOwned}
          placeholder={usdcWbtcFlowQuery?.placeholder}
          isLoading={isLoadingUsdcWbtcFlow}
        />

        <WethUsdcFlow
          balance={balances && balances[WETHxAddress]}
          totalFlows={wethUsdcFlowQuery?.totalFlows}
          flowsOwned={wethUsdcFlowQuery?.flowsOwned}
          placeholder={wethUsdcFlowQuery?.placeholder}
          isLoading={isLoadingWethFlow}
        />

        <WbtcUsdcFlow
          balance={balances && balances[WBTCxAddress]}
          totalFlows={wbtcUsdcFlowQuery?.totalFlows}
          flowsOwned={wbtcUsdcFlowQuery?.flowsOwned}
          placeholder={wbtcUsdcFlowQuery?.placeholder}
          isLoading={isLoadingWbtcFlow}
        />
        <CoinsList />
        <UsdcUpgrade
          balance={balances && balances[USDCAddress]}
          hasUsdcApprove={hasUsdcApprove}
          isLoading={isLoadingUsdcUpgrade}
        />

        <UsdcDowngrade
          balance={balances && balances[USDCxAddress]}
          isLoading={isLoadingUsdcDowngrade}
        />

        <DaiUpgrade
          balance={balances && balances[DAIAddress]}
          hasDaiApprove={hasDaiApprove}
          isLoading={isLoadingDaiUpgrade}
        />

        <DaiDowngrade
          balance={balances && balances[DAIxAddress]}
          isLoading={isLoadingDaiDowngrade}
        />

        <WethUpgrade
          balance={balances && balances[WETHAddress]}
          hasWethApprove={hasWethApprove}
          isLoading={isLoadingWethUpgrade}
        />

        <WethDowngrade
          balance={balances && balances[WETHxAddress]}
          isLoading={isLoadingWethDownGrade}
        />

        <WbtcUpgrade
          balance={balances && balances[WBTCAddress]}
          hasWbtcApprove={hasWbtcApprove}
          isLoading={isLoadingWbtcUpgrade}
        />

        <WbtcDowngrade
          balance={balances && balances[WBTCxAddress]}
          isLoading={isLoadingWbtcDowngrade}
        />

      </div>
    </MainLayout>
  );
};

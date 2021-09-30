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
import { MkrDowngrade } from 'containers/main/MkrDowngrade';
import { WbtcDowngrade } from 'containers/main/WbtcDowngrade';
import {
  USDCAddress, USDCxAddress, RICAddress,
  DAIAddress, DAIxAddress,
  MKRAddress, MKRxAddress,
  // MATICAddress, 
  MATICxAddress,
  WETHAddress, WETHxAddress,
  WBTCAddress, WBTCxAddress,
} from 'constants/polygon_config';
import { UsdcUpgrade } from 'containers/main/UsdcUpgrade';
import { DaiUpgrade } from 'containers/main/DaiUpgrade';
import { MkrUpgrade } from 'containers/main/MkrUpgrade';
import { WethUpgrade } from 'containers/main/WethUpgrade';
import { WbtcUpgrade } from 'containers/main/WbtcUpgrade';
import { UsdcWethFlow } from 'containers/main/UsdcWethFlow';
import { UsdcWbtcFlow } from 'containers/main/UsdcWbtcFlow';
import { WethUsdcFlow } from 'containers/main/WethUsdcFlow';
import { WbtcUsdcFlow } from 'containers/main/WbtcUsdcFlow';
import { DaiEthFlow } from 'containers/main/DaiEthFlow';
import { EthDaiFlow } from 'containers/main/EthDaiFlow';
import { DaiMkrFlow } from 'containers/main/DaiMkrFlow';
import { MkrDaiFlow } from 'containers/main/MkrDaiFlow';
import { UsdcMkrFlow } from 'containers/main/UsdcMkrFlow';
import { MkrUsdcFlow } from 'containers/main/MkrUsdcFlow';
import { DaiMaticFlow } from 'containers/main/DaiMaticFlow';
import { MaticDaiFlow } from 'containers/main/MaticDaiFlow';
import { UsdcMaticFlow } from 'containers/main/UsdcMaticFlow';
import { MaticUsdcFlow } from 'containers/main/MaticUsdcFlow';
import { CoinsList } from 'components/layout/CoinsList';
import styles from './styles.module.scss';

export const MainPage: React.FC = () => {
  const dispatch = useDispatch();
  const {
    address,
    balances,
    hasUsdcApprove,
    hasDaiApprove,
    hasMkrApprove,
    hasWethApprove,
    hasWbtcApprove,
    daiMkrFlowQuery,
    mkrDaiFlowQuery,
    usdcMkrFlowQuery,
    mkrUsdcFlowQuery,
    daiMaticFlowQuery,
    maticDaiFlowQuery,
    usdcMaticFlowQuery,
    maticUsdcFlowQuery,
    usdcWethFlowQuery,
    usdcWbtcFlowQuery,
    wethUsdcFlowQuery,
    wbtcUsdcFlowQuery,
    daiEthFlowQuery,
    ethDaiFlowQuery,
    isLoadingMkrDowngrade,
    isLoadingMkrUpgrade,
    isLoadingDaiDowngrade,
    isLoadingDaiUpgrade,
    isLoadingUsdcDowngrade,
    isLoadingUsdcUpgrade,
    isLoadingWbtcDowngrade,
    isLoadingWbtcUpgrade,
    isLoadingWethDownGrade,
    isLoadingWethUpgrade,
    isLoadingDaiEthFlow,
    isLoadingEthDaiFlow,
    isLoadingDaiMkrFlow,
    isLoadingMkrDaiFlow,
    isLoadingUsdcMkrFlow,
    isLoadingMkrUsdcFlow,
    isLoadingDaiMaticFlow,
    isLoadingMaticDaiFlow,
    isLoadingUsdcMaticFlow,
    isLoadingMaticUsdcFlow,
    isLoadingUsdcWbtcFlow,
    isLoadingUsdcWethFlow,
    isLoadingWbtcFlow,
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
        <DaiMaticFlow
          balance={balances && balances[DAIxAddress]}
          totalFlows={daiMaticFlowQuery?.totalFlows}
          flowsOwned={daiMaticFlowQuery?.flowsOwned}
          placeholder={daiMaticFlowQuery?.placeholder}
          isLoading={isLoadingDaiMaticFlow}
        />
        <MaticDaiFlow
          balance={balances && balances[MATICxAddress]}
          totalFlows={maticDaiFlowQuery?.totalFlows}
          flowsOwned={maticDaiFlowQuery?.flowsOwned}
          placeholder={maticDaiFlowQuery?.placeholder}
          isLoading={isLoadingMaticDaiFlow}
        />
        <UsdcMaticFlow
          balance={balances && balances[USDCxAddress]}
          totalFlows={usdcMaticFlowQuery?.totalFlows}
          flowsOwned={usdcMaticFlowQuery?.flowsOwned}
          placeholder={usdcMaticFlowQuery?.placeholder}
          isLoading={isLoadingUsdcMaticFlow}
        />
        <MaticUsdcFlow
          balance={balances && balances[MATICxAddress]}
          totalFlows={maticUsdcFlowQuery?.totalFlows}
          flowsOwned={maticUsdcFlowQuery?.flowsOwned}
          placeholder={maticUsdcFlowQuery?.placeholder}
          isLoading={isLoadingMaticUsdcFlow}
        />
        <DaiMkrFlow
          balance={balances && balances[DAIxAddress]}
          totalFlows={daiMkrFlowQuery?.totalFlows}
          flowsOwned={daiMkrFlowQuery?.flowsOwned}
          placeholder={daiMkrFlowQuery?.placeholder}
          isLoading={isLoadingDaiMkrFlow}
        />
        <MkrDaiFlow
          balance={balances && balances[MKRxAddress]}
          totalFlows={mkrDaiFlowQuery?.totalFlows}
          flowsOwned={mkrDaiFlowQuery?.flowsOwned}
          placeholder={mkrDaiFlowQuery?.placeholder}
          isLoading={isLoadingMkrDaiFlow}
        />
        <UsdcMkrFlow
          balance={balances && balances[USDCxAddress]}
          totalFlows={usdcMkrFlowQuery?.totalFlows}
          flowsOwned={usdcMkrFlowQuery?.flowsOwned}
          placeholder={usdcMkrFlowQuery?.placeholder}
          isLoading={isLoadingUsdcMkrFlow}
        />
        <MkrUsdcFlow
          balance={balances && balances[MKRxAddress]}
          totalFlows={mkrUsdcFlowQuery?.totalFlows}
          flowsOwned={mkrUsdcFlowQuery?.flowsOwned}
          placeholder={mkrUsdcFlowQuery?.placeholder}
          isLoading={isLoadingMkrUsdcFlow}
        />
        <DaiEthFlow
          balance={balances && balances[DAIxAddress]}
          totalFlows={daiEthFlowQuery?.totalFlows}
          flowsOwned={daiEthFlowQuery?.flowsOwned}
          placeholder={daiEthFlowQuery?.placeholder}
          isLoading={isLoadingDaiEthFlow}
        />
        <EthDaiFlow
          balance={balances && balances[WETHxAddress]}
          totalFlows={ethDaiFlowQuery?.totalFlows}
          flowsOwned={ethDaiFlowQuery?.flowsOwned}
          placeholder={ethDaiFlowQuery?.placeholder}
          isLoading={isLoadingEthDaiFlow}
        />
        <UsdcWethFlow
          balance={balances && balances[USDCxAddress]}
          totalFlows={usdcWethFlowQuery?.totalFlows}
          flowsOwned={usdcWethFlowQuery?.flowsOwned}
          placeholder={usdcWethFlowQuery?.placeholder}
          isLoading={isLoadingUsdcWethFlow}
        />

        <WethUsdcFlow
          balance={balances && balances[WETHxAddress]}
          totalFlows={wethUsdcFlowQuery?.totalFlows}
          flowsOwned={wethUsdcFlowQuery?.flowsOwned}
          placeholder={wethUsdcFlowQuery?.placeholder}
          isLoading={isLoadingWethFlow}
        />

        <UsdcWbtcFlow
          balance={balances && balances[USDCxAddress]}
          totalFlows={usdcWbtcFlowQuery?.totalFlows}
          flowsOwned={usdcWbtcFlowQuery?.flowsOwned}
          placeholder={usdcWbtcFlowQuery?.placeholder}
          isLoading={isLoadingUsdcWbtcFlow}
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

        <MkrUpgrade
          balance={balances && balances[MKRAddress]}
          hasMkrApprove={hasMkrApprove}
          isLoading={isLoadingMkrUpgrade}
        />

        <MkrDowngrade
          balance={balances && balances[MKRxAddress]}
          isLoading={isLoadingMkrDowngrade}
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

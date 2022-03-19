import { showErrorToast } from 'components/common/Toaster';
import { UpgradePanel } from 'components/layout/UpgradePanel';
import { UserSettings } from 'components/layout/UserSettings';
import { Coin } from 'constants/coins';
import { useLang } from 'hooks/useLang';
import React, {
  ChangeEvent,
  FC, useCallback, useState, useEffect,
} from 'react';
import { useDispatch } from 'react-redux';
import {
  approveAction, downgradeAction, showTokenList, swapAction, upgradeAction,
} from 'store/main/actionCreators';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { selectMain } from 'store/main/selectors';
import { downgradeTokensList } from 'constants/downgradeConfig';
import { swapTokensList } from 'constants/swapConfig';
import { useTranslation } from 'i18n';
import styles from './styles.module.scss';
import { flowConfig } from 'constants/flowConfig';
import { rexSuperSwapAddress } from 'constants/polygon_config';

interface IProps {
  address: string;
  balance?: string;
}
export const SwapContainer:FC<IProps> = ({ address, balance }) => {
  const state = useShallowSelector(selectMain);
  const {
    balances, isLoading, isLoadingDowngrade,
    isLoadingUpgrade, selectedDowngradeCoin, selectedUpgradeCoin, selectedSwapCoin, isReadOnly,
  } = state;
  const [showWarningToolTip, setShowWarningToolTip] = useState(false);
  const [downgradeCoin, setDowngradeCoin] = useState(selectedDowngradeCoin);
  const [downgradeAddress, setDowngradeAddress] = useState('');
  const [downgradeValue, setDownGradeValue] = useState('');
  const [upgradeCoin, setUpgradeCoin] = useState(selectedSwapCoin);
  const [swapConfig, setSwapConfig] = useState<{
    coin: Coin,
    superTokenAddress: string,
    multi: number,
    key: 'hasWethxApprove' | 'hasUsdcxApprove' | 'hasWbtcxApprove' | 'hasDaixApprove' | 'hasMkrxApprove' | 'hasMaticxApprove' | 'hasSushixApprove' | 'hasIdlexApprove',
  }>();
  const [upgradeValue, setUpgradeValue] = useState('');
  const dispatch = useDispatch();

  const { language, changeLanguage } = useLang();
  const { t } = useTranslation('main');

  const handleVisionModal = (coinType: Coin) => {
    dispatch(showTokenList(coinType));
  };

  const callback = (e?: string) => {
    if (e) {
      showErrorToast(e, 'Error');
    }
  };

  useEffect(() => {
    const coin = downgradeTokensList.find((el) => el.coin === selectedDowngradeCoin);
    if (coin) {
      setShowWarningToolTip(!!flowConfig
        .filter((config) => config.tokenA === coin.tokenAddress)
        .flatMap((filteredConfig) => filteredConfig.flowKey)
        .find((filteredFlowKey) => state[filteredFlowKey]?.flowsReceived! > 0));
      setDowngradeAddress(coin.tokenAddress);
      setDowngradeCoin(coin.coin);
    }
  }, [selectedDowngradeCoin]);

  const handleDowngradeValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setDownGradeValue(e.target.value);
  }, []);

  const handleDowngrade = useCallback(() => {
    if (Number(downgradeValue) <= 0 || (balances && Number(balances[downgradeAddress]) === 0)) {
      return;
    }
    dispatch(downgradeAction(downgradeValue, downgradeAddress, callback));
  }, [dispatch, downgradeAddress, downgradeValue, balances]);

  useEffect(() => {
    const coin = swapTokensList.find((el) => el.coin === selectedSwapCoin);
    if (coin) {
      setSwapConfig(coin);
      setUpgradeCoin(coin.coin);
    }
  }, [selectedSwapCoin]);

  const handleUpgradeValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUpgradeValue(e.target.value);
  }, []);

  const handleSwap = useCallback(() => {
    if (Number(upgradeValue) < 0 ||
    (balances && swapConfig && Number(balances[swapConfig.superTokenAddress]) === 0)) {
      return;
    }
    if (swapConfig) {
      dispatch(swapAction(
        upgradeValue,
        swapConfig?.superTokenAddress,
        callback,
        swapConfig.multi,
      ));
    }
  }, [dispatch, swapConfig, upgradeValue, balances]);

  const handleApprove = useCallback(() => {
    if (Number(upgradeValue) < 0 ||
    (balances && swapConfig && Number(balances[swapConfig.superTokenAddress]) === 0)) {
      return;
    }
    if (swapConfig) {
      dispatch(approveAction(
        upgradeValue,
        swapConfig?.superTokenAddress,
        rexSuperSwapAddress,
        callback,
        swapConfig.multi,
      ));
    }
  }, [upgradeValue, balances, swapConfig]);

  const handleMaxUpgrade = () => {
    if (!balances || !swapConfig) return;

    setUpgradeValue(balances[swapConfig.superTokenAddress]);
  };

  const handleMaxDowngrade = () => {
    if (!balances || !downgradeAddress) return;

    setDownGradeValue(balances[downgradeAddress]);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.upgrade}>
          <div className={styles.header_upgrade}>
            {t('From')}
          </div>
          <UpgradePanel
            placeholder={t('Input Amount')}
            balance={balances && (+balances[downgradeAddress]).toFixed(6)}
            nameCoin={upgradeCoin}
            onChange={handleUpgradeValue}
            onClickApprove={handleApprove}
            onClickUpgrade={handleSwap}
            onClickMax={handleMaxUpgrade}
            value={upgradeValue}
            isUpgrade
            showWarningToolTip={false}
            onSelectToken={handleVisionModal}
            isLoading={isLoading || isLoadingUpgrade}
            disabledApprove={isLoading || (swapConfig && state[swapConfig?.key])}
            isReadOnly={isReadOnly}
          />
        </div>
        <div className={styles.downgrade}>
          <div className={styles.header_downgrade}>
            {t('To')}
          </div>
          <UpgradePanel
            balance={balances && (+balances[downgradeAddress]).toFixed(6)}
            nameCoin={downgradeCoin}
            onChange={handleDowngradeValue}
            onClickDowngrade={handleDowngrade}
            onClickMax={handleMaxDowngrade}
            placeholder={t('Input Amount')}
            value={downgradeValue}
            isUpgrade={false}
            onSelectToken={handleVisionModal}
            isLoading={isLoading || isLoadingDowngrade}
            showWarningToolTip={showWarningToolTip}
            isReadOnly={isReadOnly}
          />
        </div>
        <div className={styles.settings_mob}>
          <UserSettings
            className={styles.dot}
            ricBalance={balance}
            account={address}
          />
        </div>
      </div>
    </div>
  );
};

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
  approveAction, downgradeAction, showTokenList, upgradeAction, 
} from 'store/main/actionCreators';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { selectMain } from 'store/main/selectors';
import { downgradeTokensList } from 'constants/downgradeConfig';
import { upgradeTokensList } from 'constants/upgradeConfig';
import { useTranslation } from 'i18n';
import styles from './styles.module.scss';

interface IProps {
  address: string;
  balance?: string;
}

export const UpgradeContainer:FC<IProps> = ({ address, balance }) => {
  const state = useShallowSelector(selectMain);
  const {
    balances, isLoading, isLoadingDowngrade, 
    isLoadingUpgrade, selectedDowngradeCoin, selectedUpgradeCoin,
  } = state;
  
  const [downgradeCoin, setDowngradeCoin] = useState(selectedDowngradeCoin);
  const [downgradeAddress, setDowngradeAddress] = useState('');
  const [downgradeValue, setDownGradeValue] = useState('');
  const [upgradeCoin, setUpgradeCoin] = useState(selectedUpgradeCoin);
  const [upgradeConfig, setUpgradeConfig] = useState<{  
    coin: Coin,
    tokenAddress: string,
    superTokenAddress: string,
    multi: number,
    key: 'hasWethApprove' | 'hasUsdcApprove' | 'hasWbtcApprove' | 'hasDaiApprove' | 'hasMkrApprove',
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
    const coin = upgradeTokensList.find((el) => el.coin === selectedUpgradeCoin);
    if (coin) {
      setUpgradeConfig(coin);
      setUpgradeCoin(coin.coin);
    }
  }, [selectedUpgradeCoin]);

  const handleUpgradeValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUpgradeValue(e.target.value);
  }, []);

  const handleUpgrade = useCallback(() => {
    if (Number(upgradeValue) < 0 || 
    (balances && upgradeConfig && Number(balances[upgradeConfig.tokenAddress]) === 0)) {
      return;
    }
    if (upgradeConfig) {
      dispatch(upgradeAction(
        upgradeValue,
        upgradeConfig?.tokenAddress,
        callback,
        upgradeConfig.multi,
      ));
    }
  }, [dispatch, upgradeConfig, upgradeValue, balances]);
  
  const handleApprove = useCallback(() => {
    if (Number(upgradeValue) < 0 || 
    (balances && upgradeConfig && Number(balances[upgradeConfig.tokenAddress]) === 0)) {
      return;
    }
    if (upgradeConfig) {
      dispatch(approveAction(
        upgradeValue,
        upgradeConfig?.tokenAddress,
        upgradeConfig.superTokenAddress,
        callback,
        upgradeConfig.multi,
      ));
    }
  }, [upgradeValue, balances, upgradeConfig]);

  const handleMax = useCallback(() => {
    if (!balances || !upgradeConfig) return;

    setUpgradeValue(balances[upgradeConfig.tokenAddress]);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.upgrade}>
          <div className={styles.header_upgrade}>
            {t('Upgrade')}
          </div>
          <UpgradePanel
            placeholder={t('Input Amount')}
            balance={balances && 
              upgradeConfig &&
               (+balances[upgradeConfig?.tokenAddress]).toFixed(6)} 
            nameCoin={upgradeCoin}
            onChange={handleUpgradeValue}
            onClickApprove={handleApprove}
            onClickUpgrade={handleUpgrade}
            onClickMax={handleMax}
            value={upgradeValue}
            isUpgrade
            onSelectToken={handleVisionModal}
            isLoading={isLoading || isLoadingUpgrade}
            disabledApprove={upgradeConfig && state[upgradeConfig?.key]}
          />
        </div>
        <div className={styles.downgrade}>
          <div className={styles.header_downgrade}>
            {t('Downgrade')}
          </div>
          <UpgradePanel 
            balance={balances && (+balances[downgradeAddress]).toFixed(6)} 
            nameCoin={downgradeCoin}
            onChange={handleDowngradeValue}
            onClickDowngrade={handleDowngrade}
            placeholder={t('Input Amount')} 
            value={downgradeValue}
            isUpgrade={false}
            onSelectToken={handleVisionModal}
            isLoading={isLoading || isLoadingDowngrade}
          />
        </div>
        <div className={styles.settings_mob}>
          <UserSettings
            onSelectLanguage={changeLanguage}
            language={language} 
            className={styles.dot}
            ricBalance={balance}
            account={address}
          />
        </div>
      </div>
    </div>
  );
};

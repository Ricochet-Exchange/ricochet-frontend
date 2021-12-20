/* eslint-disable jsx-a11y/interactive-supports-focus */
import { showErrorToast } from 'components/common/Toaster';
import { UpgradePanel } from 'components/layout/UpgradePanel';
import { UserSettings } from 'components/layout/UserSettings';
import { iconsCoin, Coin } from 'constants/coins';
import { useLang } from 'hooks/useLang';
import React, {
  ChangeEvent,
  FC,
  useCallback,
  useState,
  useEffect,
} from 'react';
import { useDispatch } from 'react-redux';
import {
  approveAction,
  downgradeAction,
  upgradeAction,
} from 'store/main/actionCreators';

import { useShallowSelector } from 'hooks/useShallowSelector';
import { selectMain } from 'store/main/selectors';
import { upgradeTokensList } from 'constants/upgradeConfig';
import { useTranslation } from 'i18n';
import { FontIcon, FontIconName } from 'components/common/FontIcon';
import axios from 'axios';
import Big from 'big.js';
import { Popover } from 'react-tiny-popover';
import styles from './styles.module.scss';
import { queryFlows } from '../../../api';
import { Flow } from '../../../types/flow';

interface IProps {
  address: string;
  balance?: string;
}
export const UpgradeContainer: FC<IProps> = ({ address, balance }) => {
  const state = useShallowSelector(selectMain);
  const {
    balances,
    isLoading,
    isLoadingDowngrade,
    isLoadingUpgrade,
    selectedDowngradeCoin,
    selectedUpgradeCoin,
    isReadOnly,
  } = state;
  const [showWarningToolTip, setShowWarningToolTip] = useState(false);
  const [downgradeCoin, setDowngradeCoin] = useState(selectedDowngradeCoin);
  const [selectType, setSelectType] = useState<string>('none');
  const [downgradeAddress, setDowngradeAddress] = useState('');
  const [downgradeValue, setDownGradeValue] = useState('');
  const [geckoPriceList, setGeckoPriceList] = useState<{}>();
  const [selectedIndex, setSelectedIndex] = useState<Number>();

  const [flows, setFlows] = useState<{
    flowsOwned: Flow[];
    flowsReceived: Flow[];
  }>();
  const [upgradeCoin, setUpgradeCoin] = useState(selectedUpgradeCoin);
  const [upgradeConfig, setUpgradeConfig] = useState<{
    coin: Coin;
    tokenAddress: string;
    superTokenAddress: string;
    multi: number;
    key:
    | 'hasWethApprove'
    | 'hasUsdcApprove'
    | 'hasWbtcApprove'
    | 'hasDaiApprove'
    | 'hasMkrApprove'
    | 'hasMaticApprove'
    | 'hasSushiApprove'
    | 'hasIdleApprove';
  }>();
  const [upgradeValue, setUpgradeValue] = useState('');
  const dispatch = useDispatch();

  const { language, changeLanguage } = useLang();
  const { t } = useTranslation('main');

  const callback = (e?: string) => {
    if (e) {
      showErrorToast(e, 'Error');
    }
  };

  const coingeckoUrl =
    'https://api.coingecko.com/api/v3/simple/price?ids=usd-coin%2Cdai%2Cmaker%2Cethereum%2Cwrapped-bitcoin%2Cidle%2Cmatic-network%2Csushi&vs_currencies=usd';
  const geckoMapping = {
    USDC: 'usd-coin',
    MATIC: 'matic-network',
    ETH: 'ethereum',
    WBTC: 'wrapped-bitcoin',
    SUSHI: 'sushi',
    MKR: 'maker',
    DAI: 'dai',
    IDLE: 'idle',
  };
  useEffect(() => {
    async function getGraphData() {
      setFlows((await queryFlows(address)).data.data.account);
    }
    if (address !== undefined) getGraphData();
  }, [address]);

  useEffect(() => {
    axios.get(coingeckoUrl).then((response) => {
      setGeckoPriceList(response.data);
    });
  }, [balances, upgradeConfig]);

  useEffect(() => {
    if (downgradeAddress && flows) {
      setShowWarningToolTip(
        flows?.flowsOwned?.filter(
          (flow: Flow) => flow.token.id === downgradeAddress.toLowerCase(),
        ).length > 0,
      );
    }
  }, [downgradeAddress, flows]);

  const handleDowngradeValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setDownGradeValue(e.target.value);
    },
    [],
  );

  const handleDowngrade = useCallback(() => {
    if (
      Number(downgradeValue) <= 0 ||
      (balances && Number(balances[downgradeAddress]) === 0)
    ) {
      return;
    }
    dispatch(downgradeAction(downgradeValue, downgradeAddress, callback));
  }, [dispatch, downgradeAddress, downgradeValue, balances]);

  useEffect(() => {
    const coin = upgradeTokensList.find(
      (el) => el.coin === selectedUpgradeCoin,
    );
    if (coin) {
      setUpgradeConfig(coin);
      setUpgradeCoin(coin.coin);
    }
  }, [selectedUpgradeCoin]);

  const handleUpgradeValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUpgradeValue(e.target.value);
  }, []);

  const handleUpgrade = useCallback(() => {
    if (
      Number(upgradeValue) < 0 ||
      (balances &&
        upgradeConfig &&
        Number(balances[upgradeConfig.tokenAddress]) === 0)
    ) {
      return;
    }
    if (upgradeConfig) {
      dispatch(
        upgradeAction(
          upgradeValue,
          upgradeConfig?.superTokenAddress,
          callback,
          upgradeConfig.multi,
        ),
      );
    }
  }, [dispatch, upgradeConfig, upgradeValue, balances]);

  const handleApprove = useCallback(() => {
    if (
      Number(upgradeValue) < 0 ||
      (balances &&
        upgradeConfig &&
        Number(balances[upgradeConfig.tokenAddress]) === 0)
    ) {
      return;
    }
    if (upgradeConfig) {
      dispatch(
        approveAction(
          upgradeValue,
          upgradeConfig?.tokenAddress,
          upgradeConfig.superTokenAddress,
          callback,
          upgradeConfig.multi,
        ),
      );
    }
  }, [upgradeValue, balances, upgradeConfig]);

  const handleMaxUpgrade = () => {
    if (!balances || !upgradeConfig) return;

    setUpgradeValue(balances[upgradeConfig.tokenAddress]);
  };

  const handleMaxDowngrade = () => {
    if (!balances || !downgradeAddress) return;

    setDownGradeValue(balances[downgradeAddress]);
  };

  return (
    <div className={styles.wrapper}>
      <table className={styles.dextable}>
        <thead>
          <tr>
            <td> Currency</td>
            <td>
              Your Wallet
              <br />
              Balance
            </td>
            <td className={styles.section}>
              SuperToken
              <br />
              Balance
            </td>
            <td>
              Market Price
              <br />
              in USD
            </td>
            <td className={styles.section}>
              SuperToken Balance
              <br />
              in USD
            </td>
            <td>
              Incoming Outgoing
              <br />
              Per Month in USD
            </td>
            <td className={styles.section}>
              Monthly net Flow
              <br />
              in USD
            </td>

            <td>
              Upgrade or
              <br />
              Downgrade
            </td>
          </tr>
        </thead>
        <tbody>
          {geckoPriceList !== undefined &&
            upgradeTokensList.map((token, index) => {
              const usdPriceString = (geckoPriceList as any)[
                (geckoMapping as any)[token.coin]
              ].usd;
              const usdPrice = new Big(parseFloat(usdPriceString));

              const inFlowString =
                flows?.flowsOwned?.filter(
                  (flow: Flow) =>
                    flow.token.id === token.superTokenAddress.toLowerCase(),
                )[0]?.flowRate || '0';
              let inFlow = new Big(inFlowString);
              inFlow = inFlow
                .times(new Big('2592000'))
                .div(new Big('10e17'))
                .times(usdPrice);

              const outFlowString =
                flows?.flowsReceived?.filter(
                  (flow: Flow) =>
                    flow.token.id === token.superTokenAddress.toLowerCase(),
                )[0]?.flowRate || '0';

              let outFlow = new Big(outFlowString);
              outFlow = outFlow
                .times(new Big('2592000'))
                .div(new Big('10e17'))
                .times(usdPrice);
              return (
                <tr>
                  <td>
                    <div className={styles.currDisplay}>
                      <div className={styles.currDisplayImg}>
                        <img
                          height="24px"
                          width="24px"
                          src={iconsCoin[token.coin]}
                          alt="icon for token"
                        />
                      </div>
                      <div className={styles.currDisplayName}>{token.coin}</div>
                    </div>
                  </td>
                  <td>
                    {balances &&
                      parseFloat(balances[token.tokenAddress]).toFixed(2)}
                  </td>
                  <td className={styles.section}>
                    {balances &&
                      parseFloat(balances[token.superTokenAddress]).toFixed(2)}
                  </td>
                  <td>
                    {geckoPriceList &&
                      parseFloat(
                        (geckoPriceList as any)[
                          (geckoMapping as any)[token.coin]
                        ].usd,
                      ).toFixed(2)}
                  </td>
                  <td className={styles.section}>
                    {balances &&
                      geckoPriceList &&
                      (
                        parseFloat(balances[token.superTokenAddress]) *
                        parseFloat(
                          (geckoPriceList as any)[
                            (geckoMapping as any)[token.coin]
                          ].usd,
                        )
                      ).toFixed(2)}
                  </td>
                  <td>
                    $
                    {inFlow.toFixed(2)}
                    <span className={styles.redFont}>
                      <FontIcon name={FontIconName.ArrowUp} size={15} />
                    </span>
                    <br />
                    $
                    {outFlow.toFixed(2)}
                    <span className={styles.greenFont}>
                      <FontIcon name={FontIconName.ArrowDown} size={15} />
                    </span>
                  </td>
                  <td className={styles.section}>
                    {outFlow.minus(inFlow) < new Big(0) ? (
                      <>
                        - $
                        {inFlow.minus(outFlow).toFixed(2)}
                      </>
                    ) : (
                      <>{outFlow.minus(inFlow).toFixed(2)}</>
                    )}
                  </td>

                  <td className={styles.displaybutton}>
                    <Popover
                      onClickOutside={() => {
                        setSelectedIndex(-1);
                        setSelectType('none');
                      }}
                      isOpen={index === selectedIndex}
                      positions={['top', 'bottom', 'left', 'right']} // preferred positions by priority
                      content={(
                        <>
                          {selectType === 'upgrade' && (
                            <UpgradePanel
                              placeholder={t('Input Amount')}
                              balance={
                                balances &&
                                upgradeConfig &&
                                (+balances[
                                  upgradeConfig?.tokenAddress
                                ]).toFixed(6)
                              }
                              nameCoin={upgradeCoin}
                              onChange={handleUpgradeValue}
                              onClickApprove={handleApprove}
                              onClickUpgrade={handleUpgrade}
                              onClickMax={handleMaxUpgrade}
                              value={upgradeValue}
                              isUpgrade
                              showWarningToolTip={false}
                              isLoading={isLoading || isLoadingUpgrade}
                              disabledApprove={
                                isLoading ||
                                (upgradeConfig && state[upgradeConfig?.key])
                              }
                              isReadOnly={isReadOnly}
                            />
                          )}
                          {selectType === 'downgrade' && (
                            <UpgradePanel
                              balance={
                                balances &&
                                (+balances[downgradeAddress]).toFixed(6)
                              }
                              nameCoin={downgradeCoin}
                              onChange={handleDowngradeValue}
                              onClickDowngrade={handleDowngrade}
                              onClickMax={handleMaxDowngrade}
                              placeholder={t('Input Amount')}
                              value={downgradeValue}
                              isUpgrade={false}
                              isLoading={isLoading || isLoadingDowngrade}
                              showWarningToolTip={showWarningToolTip}
                              isReadOnly={isReadOnly}
                            />
                          )}
                        </>
                      )}
                    >
                      <div className={styles.displaybutton}>
                        <span
                          role="button"
                          onClick={() => {
                            setSelectedIndex(index);
                            setSelectType('upgrade');
                            setUpgradeCoin(token.coin);
                            setUpgradeConfig(token);
                          }}
                          onKeyDown={() => {
                            setSelectedIndex(index);
                            setSelectType('upgrade');
                            setUpgradeCoin(token.coin);
                            setUpgradeConfig(token);
                          }}
                          className={styles.upgradeButton}
                        >
                          <FontIcon name={FontIconName.Plus} size={15} />
                        </span>
                        <span
                          role="button"
                          onClick={() => {
                            setSelectedIndex(index);
                            setSelectType('downgrade');
                            setDowngradeCoin(token.coin);
                            setDowngradeAddress(token.superTokenAddress);
                            setDowngradeCoin(token.coin);
                          }}
                          onKeyDown={() => {
                            setSelectedIndex(index);
                            setSelectType('downgrade');
                            setDowngradeCoin(token.coin);
                            setDowngradeAddress(token.superTokenAddress);
                            setDowngradeCoin(token.coin);
                          }}
                          className={styles.downgradeButton}
                        >
                          <FontIcon name={FontIconName.Minus} size={15} />
                        </span>
                      </div>
                    </Popover>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div>
        <div className={styles.settings_mob}>
          <UserSettings
            onSelectLanguage={changeLanguage}
            language={language}
            className={styles.dot}
            ricBalance={balance}
            account={address}
            isReadOnly={isReadOnly}
          />
        </div>
      </div>
    </div>
  );
};

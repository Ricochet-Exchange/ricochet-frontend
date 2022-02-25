/* eslint-disable jsx-a11y/interactive-supports-focus */
import { showErrorToast } from 'components/common/Toaster';
import { UpgradePanel } from 'components/layout/UpgradePanel';
import { UserSettings } from 'components/layout/UserSettings';
import { Coin, iconsCoin } from 'constants/coins';
import React, {
  ChangeEvent, FC, useCallback, useEffect, useState,
} from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useDispatch } from 'react-redux';
import { approveAction, downgradeAction, upgradeAction } from 'store/main/actionCreators';
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

function getFormattedNumber(num: string) {
  return parseFloat(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '');
}

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

  const { t } = useTranslation();

  const callback = (e?: string) => {
    if (e) {
      showErrorToast(e, 'Error');
    }
  };

  const coingeckoUrl =
    'https://api.coingecko.com/api/v3/simple/price?ids=richochet%2Cusd-coin%2Cdai%2Cmaker%2Cethereum%2Cwrapped-bitcoin%2Cidle%2Cmatic-network%2Csushi&vs_currencies=usd';
  const geckoMapping = {
    USDC: 'usd-coin',
    MATIC: 'matic-network',
    ETH: 'ethereum',
    WBTC: 'wrapped-bitcoin',
    SUSHI: 'sushi',
    MKR: 'maker',
    DAI: 'dai',
    IDLE: 'idle',
    RIC: 'richochet',
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

  const totalBalance = upgradeTokensList.reduce((total, token) => {
    const balancess = balances && geckoPriceList &&
      (
        parseFloat(balances[token.superTokenAddress]) *
        parseFloat(
          (geckoPriceList as any)[
            (geckoMapping as any)[token.coin]
          ].usd,
        )
      ).toFixed(2);

    return total + parseFloat(balancess as any);
  }, 0);

  const getWalletBalance = (token: any) => (token.coin === Coin.RIC ? 'NA' : balances &&
    parseFloat(balances[token.tokenAddress]).toFixed(2));

  const getFlow = (outFlow: any, inFlow: any) => (outFlow.minus(inFlow) < new Big(0) ? (
    <>
      - $
      {inFlow.minus(outFlow).toFixed(2)}
    </>
  ) : (
    <>
      + $
      {outFlow.minus(inFlow).toFixed(2)}
    </>
  ));

  return (
    <div className={styles.wrapper}>
      <table className={styles.dextable}>
        <thead>
          <tr>
            <td className={styles.currencyStyle}>
              {t('Currency')}
            </td>
            <td>
              {t('Wallet')}
              <br />
              {t('Balance')}
            </td>
            <td className={styles.section}>
              {t('Super Token Balance')}
            </td>
            <td className={styles.section}>
              {t('Super Token Balance')}
              <br />
              in
              <span className={styles.blue}> USD</span>
              <br />
              <span>
                {t('Total balance')}
                :
                {' '}
                <b>
                  $
                  {totalBalance ? totalBalance.toFixed(2) : '0.00'}
                </b>
              </span>
            </td>
            <td>
              {t('Incoming')}
              &nbsp;
              {t('Outgoing')}
              <br />
              {t('per month')}
              &nbsp;
              in
              <span className={styles.blue}> USD</span>
            </td>
            <td className={styles.section}>
              {t('Monthly net Flow')}
              <br />
              in
              <span className={styles.blue}> USD</span>
            </td>

            <td className={styles.upgrade_downgrade_head}>
              {t('Upgrade')}
              &nbsp;
              {t('or')}
              <br />
              {t('Downgrade')}
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
              let inFlowRate = 0;
              const inFlowArray = flows?.flowsOwned
                ?.filter(
                  (flow: Flow) =>
                    flow.token.id === token.superTokenAddress.toLowerCase(),
                );
              for (let i = 0; i < (inFlowArray?.length || 0); i += 1) {
                if (inFlowArray !== undefined) inFlowRate += parseInt(inFlowArray[i].flowRate, 10);
              }
              let inFlow = new Big(inFlowRate);
              inFlow = inFlow
                .times(new Big('2592000'))
                .div(new Big('10e17'))
                .times(usdPrice);

              let outFlowRate = 0;
              const outFlowArray = flows?.flowsReceived
                ?.filter(
                  (flow: Flow) =>
                    flow.token.id === token.superTokenAddress.toLowerCase(),
                );
              for (let i = 0; i < (outFlowArray?.length || 0); i += 1) {
                if (outFlowArray !== undefined) {
                  outFlowRate += parseInt(outFlowArray[i].flowRate, 10);
                }
              }
              let outFlow = new Big(outFlowRate);
              outFlow = outFlow
                .times(new Big('2592000'))
                .div(new Big('10e17'))
                .times(usdPrice);

              return (
                <tr key={token.coin}>
                  <td>
                    {token && token.coin ? (
                      <div className={styles.currDisplay}>
                        <div className={styles.currDisplayImg}>
                          <img
                            height="25px"
                            width="25px"
                            src={iconsCoin[token.coin]}
                            alt="icon for token"
                          />
                        </div>

                        <div className={styles.currDisplayName}>{token.coin}</div>
                      </div>
                    )
                      :
                      (
                        <span className={styles.wallet_loading}>
                          <Skeleton count={2} width={140} />
                        </span>
                      )}
                  </td>
                  <td>
                    {token && token.coin && balances ? getWalletBalance(token)
                      :
                      (
                        <span className={styles.wallet_loading}>
                          <Skeleton height={30} width={60} />
                        </span>
                      )}
                  </td>
                  <td className={styles.section}>
                    {token && balances ? balances &&
                      parseFloat(balances[token.superTokenAddress]).toFixed(2)
                      :
                      (
                        <span className={styles.wallet_loading}>
                          <Skeleton height={30} width={60} />
                        </span>
                      )}
                  </td>
                  <td className={styles.section}>
                    {balances && geckoPriceList ?
                      `$${(
                        parseFloat(balances[token.superTokenAddress]) *
                        parseFloat(
                          (geckoPriceList as any)[
                            (geckoMapping as any)[token.coin]
                          ].usd,
                        )
                      ).toFixed(2)}`

                      :
                      (
                        <span className={styles.wallet_loading}>
                          <Skeleton count={1} width={60} />
                        </span>
                      )}
                    <div className={styles.grey}>
                      {balances && geckoPriceList ?
                        `@ $${getFormattedNumber(
                          (geckoPriceList as any)[
                            (geckoMapping as any)[token.coin]
                          ].usd,
                        )}`

                        :
                        (
                          <span className={styles.wallet_loading}>
                            <Skeleton count={1} width={100} />
                          </span>
                        )}
                    </div>
                  </td>
                  <td>
                    <div className={styles.streamshow}>
                      {balances && inFlow ?
                        (
                          <>
                            + $
                            {outFlow.toFixed(2)}
                            <FontIcon
                              className={styles.greenFont}
                              name={FontIconName.ArrowUpStrong}
                              size={15}
                            />
                          </>
                        )
                        :
                        (
                          <span className={styles.wallet_loading}>
                            <Skeleton count={1} width={100} />
                          </span>
                        )}
                    </div>
                    <br />
                    <div className={styles.streamshow}>
                      {balances && inFlow ?
                        (
                          <>
                            - $
                            {inFlow.toFixed(2)}
                            <FontIcon
                              className={styles.redFont}
                              name={FontIconName.ArrowDownStrong}
                              size={15}
                            />
                          </>
                        )
                        :
                        (
                          <span className={styles.wallet_loading}>
                            <Skeleton count={1} width={100} />
                          </span>
                        )}
                    </div>
                  </td>
                  <td className={styles.section}>
                    {balances && outFlow && inFlow ? getFlow(outFlow, inFlow)
                      :
                      (
                        <span className={styles.wallet_loading}>
                          <Skeleton count={1} width={70} />
                        </span>
                      )}
                  </td>

                  <td className={styles.section}>
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
                                isLoading || (upgradeConfig && state[upgradeConfig?.key])
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
                        {balances && token ?
                          (
                            <>
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
                                className={token.coin === Coin.RIC
                                  ? styles.disabledButton : styles.downgradeButton}
                              >
                                <FontIcon name={FontIconName.Minus} size={12} />
                              </span>
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
                                className={token.coin === Coin.RIC
                                  ? styles.disabledButton : styles.upgradeButton}
                              >
                                <FontIcon name={FontIconName.Plus} size={12} />
                              </span>
                            </>
                          )
                          :
                          (
                            <span className={styles.wallet_loading}>
                              <Skeleton count={2} width={105} />
                            </span>
                          )}
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
            className={styles.dot}
            ricBalance={balance}
            account={address}
          />
        </div>
      </div>
    </div>
  );
};

import React, {
  ChangeEvent, FC, useCallback, useEffect, useState,
} from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FontIcon, FontIconName } from 'components/common/FontIcon';
import { showErrorToast } from 'components/common/Toaster';
import ReactTooltip from 'react-tooltip';
import { ExchangeKeys } from 'utils/getExchangeAddress';
import { getLastDistributionOnPair } from 'utils/getLastDistributions';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { AddressLink } from 'components/common/AddressLink';
import { getAddressLink } from 'utils/getAddressLink';
import { selectMain } from 'store/main/selectors';
import ReactTimeAgo from 'react-time-ago';
import TimeAgo from 'javascript-time-ago';
import { useTranslation } from 'react-i18next';
import en from 'javascript-time-ago/locale/en.json';
import styles from './styles.module.scss';
import { Coin } from '../../../constants/coins';
import { CoinChange } from '../CoinChange';
import { CoinBalancePanel } from '../CoinBalancePanel';
import { CoinRateForm } from '../CoinRateForm';
import { FlowTypes } from '../../../constants/flowConfig';
// import Price from '../../common/Price';
import LpAPY from '../../common/LpAPY';
import Price from '../../common/Price';
import { getShareScaler } from '../../../utils/getShareScaler';

TimeAgo.addDefaultLocale(en);

interface IProps {
  placeholder?: string,
  onClickStart: (amount: string, callback: (e?: string) => void) => void,
  onClickStop: (callback: (e?: string) => void) => void
  coinA: Coin,
  coinB: Coin,
  tokenA: string,
  tokenB: string,
  coingeckoPrice: number;
  balanceA?: string;
  balanceB?: string;
  totalFlow?: string;
  totalFlows?: number;
  streamEnd?: string;
  subsidyRate?: { perso: number, total: number, endDate: string };
  personalFlow?: string;
  mainLoading?: boolean;
  flowType: FlowTypes,
  contractAddress: string,
  exchangeKey: ExchangeKeys,
  isReadOnly?: boolean,
}

export const PanelChange: FC<IProps> = ({
  onClickStart,
  onClickStop,
  placeholder,
  coinA,
  coingeckoPrice,
  coinB,
  tokenA,
  tokenB,
  balanceA,
  balanceB,
  totalFlow,
  totalFlows,
  streamEnd,
  subsidyRate,
  personalFlow,
  mainLoading = false,
  flowType,
  isReadOnly,
  contractAddress,
  exchangeKey,
}) => {
  const link = getAddressLink(contractAddress);
  const { web3 } = useShallowSelector(selectMain);
  const [inputShow, setInputShow] = useState(false);
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [lastDistribution, setLastDistribution] = useState<Date>();
  const [shareScaler, setShareScaler] = useState(1e3);
  const { t } = useTranslation();

  useEffect(() => {
    setIsLoading(mainLoading);
  }, [mainLoading]);

  useEffect(() => {
    let isMounted = true;
    if (web3?.currentProvider === null || flowType !== FlowTypes.market) return;
    getShareScaler(web3, exchangeKey, tokenA, tokenB).then((res) => {
      if (isMounted) {
        setShareScaler(res);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [web3]);

  useEffect(() => {
    let isMounted = true;
    if (web3?.currentProvider === null) return;
    getLastDistributionOnPair(web3, exchangeKey).then((p) => {
      if (isMounted) {
        setLastDistribution(p);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [web3]);

  function getFormattedNumber(num: string) {
    return parseFloat(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function getFlowUSDValue(flow: string) {
    return (parseFloat(flow as string) * coingeckoPrice).toFixed(0);
  }

  const toggleInputShow = useCallback(() => { setInputShow(!inputShow); },
    [inputShow, setInputShow]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    if (e.target.value < 0) {
      e.preventDefault();
    } else {
      setValue(e.target.value);
    }
  }, []);

  const callback = (e?: string) => {
    if (e) {
      showErrorToast(e, 'Error');
    }
    setIsLoading(false);
  };

  const handleStart = useCallback(() => {
    if (Number(balanceA) <= 0 || Number(value) < 0) {
      return;
    }
    setIsLoading(true);
    if (flowType === FlowTypes.market) {
      onClickStart((((Math.floor(((parseFloat(value) / 2592000) * 1e18) / shareScaler)
          * shareScaler) / 1e18) * 2592000).toString(), callback);
    } else {
      onClickStart(value, callback);
    }
  }, [value, balanceA]);

  const handleStop = useCallback(() => {
    setIsLoading(true);
    onClickStop(callback);
  }, [callback]);

  // uncomment when need
  // const date = generateDate(balanceA, personalFlow);

  const uuid = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);
  return (
    <>
      <section className={styles.panel}>
        <div className={styles.btn_arrow} onClick={toggleInputShow} role="presentation">
          <div className={styles.container}>
            <div className={styles.wrap}>
              {mainLoading ? (
                <span className={styles.stream}>
                  <Skeleton height={50} width={200} />
                </span>
              ) :

                (
                  <div className={styles.row}>
                    {flowType === 'launchpad' && <Price />}
                    <div className={styles.coin}>
                      <CoinChange nameCoinLeft={coinA} nameCoinRight={coinB} />
                      {flowType === 'sushiLP' && <LpAPY contractAddress={contractAddress} />}
                      <AddressLink addressLink={link} />
                    </div>
                  </div>
                )}

              {isLoading && !personalFlow ? (
                <span className={styles.stream}>
                  <Skeleton count={2} width={140} />
                </span>
              ) : (
                <div className={styles.stream}>
                  <span>
                    <span className={styles.number}>
                      {`$${personalFlow && getFormattedNumber(getFlowUSDValue(personalFlow))} ${t('per month')}`}
                    </span>
                    {((subsidyRate?.perso) || 0) > 0 ? (
                      <span>
                        <span data-tip data-for={`depositTooltipTotalPerso-${uuid}`}>🔥</span>
                        <ReactTooltip
                          id={`depositTooltipTotalPerso-${uuid}`}
                          place="right"
                          effect="solid"
                          multiline
                          className={styles.depositTooltip}
                        >
                          <span className={styles.depositTooltip_span}>
                            {`${t('Earning')} ${((subsidyRate?.perso || 0)).toFixed(2)} RIC/mo. ${t('subsidy')}`}
                          </span>
                        </ReactTooltip>
                      </span>
                    ) : <span />}
                  </span>
                  <div>
                    <span className={styles.token_amounts}>
                      <span>{`${personalFlow && getFormattedNumber(personalFlow)} ${coinA}x / ${t('Month')}`}</span>
                    </span>
                  </div>
                  <span>
                    {((personalFlow || 0) > 0 && (balanceA || 0) > 0) && (
                    <div className={styles.stream_values}>
                      {`${t('Runs out on')} ${streamEnd}`}
                    </div>
                    )}
                  </span>
                </div>
              )}
              {mainLoading ?
                (
                  <span className={styles.stream}>
                    <Skeleton count={2} width={140} />
                  </span>
                ) : (
                  <div className={styles.balances}>
                    <div className={styles.first_balance_container}>
                      <CoinBalancePanel
                        className={styles.currency_first_balance}
                        name={coinA}
                        balance={balanceA}
                      />
                    </div>
                    <CoinBalancePanel
                      className={styles.currency_second_balance}
                      name={coinB}
                      balance={balanceB}
                    />
                  </div>
                )}
              {mainLoading ? (
                <span className={styles.stream}>
                  <Skeleton count={4} width={140} />
                </span>
              ) : (
                <div className={styles.streaming}>
                  <span>
                    <span className={styles.number}>
                      {`${totalFlow && getFormattedNumber(getFlowUSDValue(totalFlow))}`}
                    </span>
                    {t('per month')}
                    { ((subsidyRate?.total) || 0) > 0 ? (
                      <span>
                        <span data-tip data-for={`depositTooltipTotal-${uuid}`}>🔥</span>
                        <ReactTooltip
                          id={`depositTooltipTotal-${uuid}`}
                          place="right"
                          effect="solid"
                          multiline
                          className={styles.depositTooltip}
                        >
                          <span className={styles.depositTooltip_span}>
                            {`${t('Total subsidy')}: ${((subsidyRate?.total || 0) / 1e3).toFixed(0)}k RIC/mo. | ${t('Rewards End')}: ${subsidyRate?.endDate}`}
                          </span>
                        </ReactTooltip>
                      </span>
                    ) : <span />}
                  </span>
                  <span className={styles.token_amounts}>
                    <span>{`${totalFlow && getFormattedNumber(totalFlow)} ${coinA}x / ${t('Month')}`}</span>
                  </span>
                  <span>
                    <span className={styles.number}>{totalFlows}</span>
                    {t('total streams')}
                  </span>
                  <span className={styles.distributed_time}>
                    {t('Distributed')}
                    {' '}
                    <b>
                      {lastDistribution && <ReactTimeAgo date={lastDistribution} />}
                    </b>
                  </span>
                </div>
              )}
              {inputShow
                ? (
                  <FontIcon name={FontIconName.ArrowUp} className={styles.arrow_up} />
                )
                : (
                  <FontIcon name={FontIconName.ArrowDown} className={styles.arrow_down} />
                )}
            </div>
          </div>
        </div>
        {inputShow && personalFlow && (
          <div className={styles.form_mob}>
            <CoinRateForm
              placeholder={placeholder}
              value={value}
              onChange={handleChange}
              onClickStart={handleStart}
              onClickStop={handleStop}
              coin={coinA}
              isLoading={isLoading}
              isReadOnly={isReadOnly}
              shareScaler={shareScaler}
              personalFlow={getFormattedNumber(getFlowUSDValue(personalFlow))}
            />
          </div>
        )}
        {inputShow && personalFlow && (
          <div className={styles.form}>
            <CoinRateForm
              placeholder={placeholder}
              value={value}
              onChange={handleChange}
              onClickStart={handleStart}
              onClickStop={handleStop}
              coin={coinA}
              isLoading={isLoading}
              isReadOnly={isReadOnly}
              personalFlow={getFormattedNumber(getFlowUSDValue(personalFlow))}
              shareScaler={shareScaler}
            />
          </div>
        )}
      </section>
    </>
  );
};

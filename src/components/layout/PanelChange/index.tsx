import React, {
  ChangeEvent,
  FC, useCallback, useEffect, useState,
} from 'react';
import { FontIcon, FontIconName } from 'components/common/FontIcon';
import { showErrorToast } from 'components/common/Toaster';
// import { useTranslation } from 'i18n';
// import { generateDate } from 'utils/generateDate';
import ReactTooltip from 'react-tooltip';
import styles from './styles.module.scss';
import { Coin } from '../../../constants/coins';
import { CoinChange } from '../CoinChange';
import { CoinBalancePanel } from '../CoinBalancePanel';
import { CoinRateForm } from '../CoinRateForm';
import { FlowTypes } from '../../../constants/flowConfig';
// import Price from '../../common/Price';
import LpAPY from '../../common/LpAPY';
import Price from '../../common/Price';

interface IProps {
  placeholder?:string,
  onClickStart: (amount: string, callback: (e?: string) => void) => void,
  onClickStop: (callback: (e?: string) => void) => void
  coinA: Coin,
  coinB: Coin,
  coingeckoPrice: number;
  balanceA?: string;
  balanceB?: string;
  totalFlow?: string;
  totalFlows?: number;
  streamEnd?: string;
  subsidyRate?: { perso:number, total:number, endDate:string };
  personalFlow?: string;
  mainLoading?: boolean;
  flowType: FlowTypes,
  contractAddress: string,
  isReadOnly?:boolean,
}

export const PanelChange: FC<IProps> = ({
  onClickStart,
  onClickStop,
  placeholder,
  coinA,
  coingeckoPrice,
  coinB,
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
}) => {
  const [inputShow, setInputShow] = useState(false);
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  // const { t } = useTranslation('main');

  useEffect(() => {
    setIsLoading(mainLoading);
  }, [mainLoading]);

  function getFormattedNumber(num: string) {
    return parseFloat(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function getFlowUSDValue(flow:string) {
    return (parseFloat(flow as string) * coingeckoPrice).toFixed(0);
  }

  const toggleInputShow = useCallback(() => { setInputShow(!inputShow); },
    [inputShow, setInputShow]);

  const handleChange = useCallback((e:ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
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
    onClickStart(value, callback);
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
              <div className={styles.row}>
                <div className={styles.coin}>
                  <CoinChange nameCoinLeft={coinA} nameCoinRight={coinB} />
                  {flowType === 'launchpad' && <Price />}
                  {flowType === 'sushiLP' && <LpAPY contractAddress={contractAddress} />}
                </div>
                {isLoading ? <span className={styles.streaming_mob}>Loading</span> : (
                  <div className={styles.streaming_mob}>
                    <span className={styles.number}>
                      {`$${totalFlow && getFormattedNumber(getFlowUSDValue(totalFlow))}`}
                    </span>
                    /mo.
                  </div>
                )}
              </div>

              {isLoading && !personalFlow ? (
                <span className={styles.stream}>
                  <span className={styles.number}>Loading your streams... </span>
                </span>
              ) : (
                <div className={styles.stream}>
                  <span>
                    <span className={styles.number}>
                      {`$${personalFlow && getFormattedNumber(getFlowUSDValue(personalFlow))} per month`}
                    </span>
                    { ((subsidyRate?.perso) || 0) > 0 ? (
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
                            {`Earning ${((subsidyRate?.perso || 0)).toFixed(2)} RIC/mo. subsidy`}
                          </span>
                        </ReactTooltip>
                      </span>
                    ) : <span /> }
                  </span>
                  <div>
                    <span className={styles.token_amounts}>
                      <span>{`${personalFlow && getFormattedNumber(personalFlow)} ${coinA}x / month`}</span>
                    </span>
                  </div>
                  <span>
                    {((personalFlow || 0) > 0 && (balanceA || 0) > 0) && (
                    <div className={styles.stream_values}>
                      {`Runs out on ${streamEnd}`}
                    </div>
                    )}
                  </span>
                </div>
              )}
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
              {isLoading ? (
                <span className={styles.streaming}>
                  <span className={styles.number}> Loading total values...</span>
                </span>
              ) : (
                <div className={styles.streaming}>
                  <span>
                    <span className={styles.number}>
                      {`$${totalFlow && getFormattedNumber(getFlowUSDValue(totalFlow))}`}
                    </span>
                    per month
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
                            {`Total subsidy: ${((subsidyRate?.total || 0) / 1e3).toFixed(0)}k RIC/mo. | Rewards End: ${subsidyRate?.endDate}`}
                          </span>
                        </ReactTooltip>
                      </span>
                    ) : <span /> }
                  </span>
                  <span className={styles.token_amounts}>
                    <span>{`${totalFlow && getFormattedNumber(totalFlow)} ${coinA}x / month`}</span>
                  </span>
                  <span>
                    <span className={styles.number}>{totalFlows}</span>
                    total streams
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
        {inputShow && (
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
          />
        </div>
        ) }
        {inputShow && (
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
            />
          </div>
        )}

      </section>
    </>
  );
};

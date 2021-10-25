import React, {
  ChangeEvent,
  FC, useCallback, useEffect, useState,
} from 'react';
import { FontIcon, FontIconName } from 'components/common/FontIcon';
import { showErrorToast } from 'components/common/Toaster';
import { useTranslation } from 'i18n';
import { generateDate } from 'utils/generateDate';
import styles from './styles.module.scss';
import { Coin } from '../../../constants/coins';
import { CoinChange } from '../CoinChange';
import { CoinBalancePanel } from '../CoinBalancePanel';
import { CoinRateForm } from '../CoinRateForm';

interface IProps {
  placeholder?:string,
  onClickStart: (amount: string, callback: (e?: string) => void) => void,
  onClickStop: (callback: (e?: string) => void) => void
  coinA: Coin,
  coinB: Coin,
  balanceA?: string;
  balanceB?: string;
  totalFlow?: string;
  personalFlow?: string;
  mainLoading?: boolean;
}

export const PanelChange: FC<IProps> = ({
  onClickStart,
  onClickStop,
  placeholder,
  coinA,
  coinB, 
  balanceA,
  balanceB,
  totalFlow, 
  personalFlow,
  mainLoading = false,
}) => {
  const [inputShow, setInputShow] = useState(false);
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation('main');

  useEffect(() => {
    setIsLoading(mainLoading);
  }, [mainLoading]);

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

  const date = generateDate(balanceA, personalFlow);

  return (
    <>
      <section className={styles.panel}>
        <div className={styles.btn_arrow} onClick={toggleInputShow} role="presentation">
          <div className={styles.container}>
            <div className={styles.wrap}>
              <div className={styles.coin}>
                <CoinChange nameCoinLeft={coinA} nameCoinRight={coinB} />
              </div>
              <div className={styles.streaming_mob}>
                <span className={styles.number}>{totalFlow}</span>
                {`${coinA}x/mo.`}
              </div>
              <div className={styles.stream}>
                <div className={styles.stream_values}>
                  <span className={styles.number}>{personalFlow}</span>
                  {`${coinA}/mo.`}
                </div>
                <div className={styles.date}>
                  {t('Runs out on')}
                  :
                  <span className={styles.number_date}>{date}</span>
                </div>
              </div>
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
              <div className={styles.streaming}>
                <span className={styles.number}>{totalFlow}</span>
                {`${coinA}x/mo.`}
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
                />
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
          <div className={styles.form}>
            <CoinRateForm
              placeholder={placeholder}
              value={value} 
              onChange={handleChange} 
              onClickStart={handleStart} 
              onClickStop={handleStop}
              coin={coinA}
              isLoading={isLoading}
            />
          </div>
        )}
  
      </section>
    </>
  );
};

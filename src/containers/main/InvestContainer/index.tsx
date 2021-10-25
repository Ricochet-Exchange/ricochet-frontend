import React, { ChangeEvent, useCallback, useState } from 'react';
import { FontIcon, FontIconName } from 'components/common/FontIcon';
import { TextInput } from 'components/common/TextInput';
import { PanelChange } from 'components/layout/PanelChange';
import { UserSettings } from 'components/layout/UserSettings';
import { useLang } from 'hooks/useLang';
import { flowConfig } from 'constants/flowConfig';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { selectMain } from 'store/main/selectors';
import { RICAddress } from 'constants/polygon_config';
import { useDispatch } from 'react-redux';
import { startFlowAction, stopFlowAction } from 'store/main/actionCreators';
import styles from './styles.module.scss';

export const InvestContainer :React.FC = () => {
  const { language, changeLanguage, t } = useLang();
  const state = useShallowSelector(selectMain);
  const { address, balances, isLoading } = state;
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [filteredList, setFilteredList] = useState(flowConfig);

  const handleStart = useCallback((config: { [key: string]: string }) => (
    amount: string,
    callback: (e?:string) => void,
  ) => {
    dispatch(startFlowAction(amount, config, callback));
  }, [dispatch, balances]);

  const handleStop = useCallback((config: { [key: string]: string }) => (
    callback: (e?:string) => void,
  ) => {
    dispatch(stopFlowAction(config, callback));
  }, [dispatch, balances]);

  const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
    const filtered = flowConfig.filter(
      (el) => el.coinA.includes(value.toUpperCase()) || el.coinB.includes(value.toUpperCase()),
    );
    setFilteredList(filtered);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.input_wrap}>
        <TextInput 
          value={search}
          placeholder={t('Search by Name')}
          onChange={handleSearch} 
          className={styles.input} 
          containerClassName={styles.container_input}
          left={<FontIcon name={FontIconName.Search} className={styles.search} size={16} />}
        />
      </div>
      <div className={styles.headers}>
        <div className={styles.market}>{t('Stream Market')}</div>
        <div className={styles.stream}>{t('Your Stream')}</div>
        <div className={styles.balances}>{t('Your Balances')}</div>
        <div className={styles.streaming}>{t('Total Value Streaming')}</div>
      </div>
      <div className={styles.content}>
        {filteredList.map((element) => (
          <div className={styles.panel} key={`${element.coinA}-${element.coinB}`}>
            <PanelChange 
              placeholder={t('Input Rate')} 
              onClickStart={handleStart(element)} 
              onClickStop={handleStop(element)}
              coinA={element.coinA}
              coinB={element.coinB}
              balanceA={balances && balances[element.tokenA]}
              balanceB={balances && balances[element.tokenB]}
              totalFlow={state[element.flowKey]?.flowsOwned}
              personalFlow={state[element.flowKey]?.placeholder}
              mainLoading={isLoading}
            />
          </div>
        ))}
        <div className={styles.settings_mob}>
          <UserSettings
            language={language}
            onSelectLanguage={changeLanguage}
            className={styles.dot}
            ricBalance={balances && balances[RICAddress]}
            account={address || 'Connecting'}
          />
        </div>
      </div>
    </div>
  );
};

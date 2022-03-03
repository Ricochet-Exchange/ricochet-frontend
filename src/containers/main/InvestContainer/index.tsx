import React, {
  ChangeEvent, useCallback, useEffect, useState,
} from 'react';
import { FontIcon, FontIconName } from 'components/common/FontIcon';
import { useRouteMatch } from 'react-router-dom';
import { TextInput } from 'components/common/TextInput';
import { PanelChange } from 'components/layout/PanelChange';
import { UserSettings } from 'components/layout/UserSettings';
import { InvestNav } from 'components/layout/InvestNav';
import { useTranslation } from 'react-i18next';
import { flowConfig, FlowEnum, RoutesToFlowTypes } from 'constants/flowConfig';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { selectMain, selectUserStreams } from 'store/main/selectors';
import { RICAddress } from 'constants/polygon_config';
import { useDispatch } from 'react-redux';
import { startFlowAction, stopFlowAction } from 'store/main/actionCreators';
import { ExchangeKeys } from 'utils/getExchangeAddress';
import styles from './styles.module.scss';

function sumStrings(a: number, b: string): number { return (a + parseFloat(b)); }
function endDate(bal: number, outgoing: number): string {
  const outgoingPerMs = outgoing / (30 * 24 * 60 * 60 * 1000);
  const endDateTimestamp = Date.now() + bal / outgoingPerMs;
  const endDateStr = (new Date(endDateTimestamp)).toLocaleDateString();
  return `${endDateStr}`;
}

interface IProps { }

export const InvestContainer: React.FC<IProps> = () => {
  const { t } = useTranslation();
  const state = useShallowSelector(selectMain);
  const {
    address, balances, isLoading, coingeckoPrices,
  } = state;
  const userStreams = useShallowSelector(selectUserStreams);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [filteredList, setFilteredList] = useState(flowConfig);
  const match = useRouteMatch();
  const flowType = RoutesToFlowTypes[match.path];

  useEffect(() => {
    if (flowType) {
      setFilteredList(flowConfig.filter((each) => each.type === flowType));
    } else {
      const sortedUserStreams = userStreams.sort(
        (a, b) => {
          const flowA = parseFloat(state[a.flowKey]?.placeholder || '0');
          const flowB = parseFloat(state[b.flowKey]?.placeholder || '0');
          return flowB - flowA;
        },
      );
      setFilteredList(sortedUserStreams);
    }
  }, [flowType, userStreams]);

  const handleStart = useCallback((config: { [key: string]: string }) => (
    amount: string,
    callback: (e?: string) => void,
  ) => {
    dispatch(startFlowAction(amount, config, callback));
  }, [dispatch, balances]);

  const handleStop = useCallback((config: { [key: string]: string }) => (
    callback: (e?: string) => void,
  ) => {
    dispatch(stopFlowAction(config, callback));
  }, [dispatch, balances]);

  function retrieveEndDate(flowKey: FlowEnum, currentState: any, currentBalances: any) {
    const flow = flowConfig.find((flow_) => flow_.flowKey === flowKey);
    const sameCoinAFlows = flowConfig.filter((flow_) => flow_.coinA === flow?.coinA);
    const outgoing = sameCoinAFlows.map((flow_) => currentState[flow_.flowKey]?.placeholder || '0');
    const outgoingSum = outgoing.reduce(sumStrings, 0);
    const bal = parseFloat((currentBalances && currentBalances[flow?.tokenA || '']) || '0');
    return endDate(bal, outgoingSum);
  }
  function computeStreamEnds(currentState: any, currentBalances: any) {
    const streamEnds: { [id: string]: string; } = {};
    Object.values(FlowEnum).forEach((flowEnum: FlowEnum) => {
      streamEnds[flowEnum] = retrieveEndDate(flowEnum, currentState, currentBalances);
    });
    return streamEnds;
  }

  const streamEnds = computeStreamEnds(state, balances);

  const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
    const filtered = flowConfig.filter(
      (el) => el.coinA.toUpperCase().includes(value.toUpperCase()) ||
        el.coinB.toUpperCase().includes(value.toUpperCase()),
    );
    setFilteredList(filtered);
  }, []);

  return (
    <div className={styles.outer_container}>
      <InvestNav />
      <div className={styles.settings_mob}>
        <UserSettings
          className={styles.dot}
          ricBalance={balances && balances[RICAddress]}
          account={address || t('Connect Wallet')}
        />
      </div>
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
          <div className={styles.ends}>{t('')}</div>
        </div>
        <div className={styles.content}>
          {filteredList.map((element, idx) => (
            <div className={styles.panel} key={`${element.coinA}-${element.coinB}`}>
              <PanelChange
                placeholder={t('Input Rate')}
                onClickStart={handleStart(element)}
                onClickStop={handleStop(element)}
                coinA={element.coinA}
                coingeckoPrice={coingeckoPrices ? coingeckoPrices[element.tokenA] : 0}
                coinB={element.coinB}
                tokenA={element.tokenA}
                tokenB={element.tokenB}
                balanceA={balances && balances[element.tokenA]}
                balanceB={balances && balances[element.tokenB]}
                totalFlow={state[element.flowKey]?.flowsOwned}
                totalFlows={state[element.flowKey]?.totalFlows}
                streamEnd={streamEnds[element.flowKey]}
                subsidyRate={
                  new Date().toLocaleDateString().split('/').reverse()
                    .join('')
                    >= (state[element.flowKey]?.subsidyRate.endDate.split('/').reverse()
                      .join('') || '0')
                    ? undefined : state[element.flowKey]?.subsidyRate
                }
                personalFlow={state[element.flowKey]?.placeholder}
                mainLoading={isLoading}
                flowType={element.type}
                isReadOnly={state.isReadOnly}
                contractAddress={element.superToken}
                exchangeKey={element.flowKey.replace('FlowQuery', '') as ExchangeKeys}
                indexVal={idx}
              />
            </div>
          ))}
        </div>

        {filteredList.length === 0 && (
          <div className={styles.empty_state}>
            <FontIcon name={FontIconName.Search} size={30} />
            <span className={styles.empty_state_text}>
              <div>{t('No results found')}</div>
            </span>
          </div>
        )}

        <div>
          <span className={styles.fee_disclaimer}>
            {t('Ricochet takes a 2% fee on swaps.')}
          </span>
        </div>
      </div>
    </div>
  );
};

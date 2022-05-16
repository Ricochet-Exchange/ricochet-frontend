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
import StreamManager from 'components/streaming/StreamManager';
import styles from './styles.module.scss';
import { StreamContainer } from '../StreamContainer';


interface IProps { }
export const PaymentsContainer: React.FC<IProps> = () => {
  const { t } = useTranslation();
  const state = useShallowSelector(selectMain);
  const {
    address, balances, isLoading, coingeckoPrices,
  } = state;




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
      <div className={styles.payment_page} >
        <StreamContainer paymentPage />
        <StreamManager />
      </div>
    </div>
  );
};

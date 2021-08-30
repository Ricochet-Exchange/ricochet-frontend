import React, { useCallback, useState, ChangeEvent } from 'react';
import { Card } from 'components/layout/Card';
import { FlowForm } from 'components/main/FlowForm';
import { useDispatch } from 'react-redux';
import {
  subscriptionRicWbtcUsdc,
  wbtcUsdcStartFlow, 
  wbtcUsdcStopFlow,
} from 'store/main/actionCreators';
import { useToasts } from 'hooks/useToast';
import styles from './styles.module.scss';

type Props = {
  balance?: string,
  totalFlows?: number,
  flowsOwned?: string,
  placeholder?: string,
  isLoading?: boolean,
};

export const WbtcUsdcFlow: React.FC<Props> = ({
  balance,
  flowsOwned,
  totalFlows,
  placeholder,
  isLoading,
}) => {
  const dispatch = useDispatch();
  const { showErrorToast } = useToasts();
  const [wbtcUsdc, setWbtcUsdc] = useState('');
  const [error, setError] = useState('');

  const callback = useCallback((e?:string) => {
    setWbtcUsdc('');
    if (e) {
      showErrorToast(e, 'Error');
    }
  }, [setWbtcUsdc]);

  const handleStart = useCallback(() => {
    if (!wbtcUsdc || Number(wbtcUsdc) <= 0) {
      return setError('Enter positive value');
    }
    dispatch(wbtcUsdcStartFlow(wbtcUsdc, callback));
  }, [dispatch, wbtcUsdc, callback]);

  const handleSubscription = useCallback(() => {
    dispatch(subscriptionRicWbtcUsdc(callback));
  }, [dispatch, callback]);

  const handleStop = useCallback(() => {
    dispatch(wbtcUsdcStopFlow(callback));
  }, [dispatch, callback]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) {
      setError('');
    }
    setWbtcUsdc(e.target.value);
  };

  return (
    <Card isLoading={isLoading} main title={<a href="https://polygonscan.com/address/0xD25CBfD04172C8C79c5823bcF14DaB8Fe11C672D" className={styles.link}>{'WBTC >> USDC (market out of commission - do not use. If you have existing streams, please cancel ASAP)'}</a>}>
      <FlowForm
        onSubscription={handleSubscription}
        onStart={handleStart}
        onStop={handleStop}
        balance={balance}
        flowsOwned={flowsOwned}
        totalFlows={totalFlows}
        token="WBTCx"
        value={wbtcUsdc}
        onChange={handleChange}
        error={error}
        placeholder={placeholder}
      />
    </Card>
  );
};

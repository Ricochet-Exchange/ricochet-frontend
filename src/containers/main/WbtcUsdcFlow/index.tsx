import React, { useCallback, useState, ChangeEvent } from 'react';
import { Card } from 'components/layout/Card';
import { FlowForm } from 'components/main/FlowForm';
import { useDispatch } from 'react-redux';
import {
  wbtcUsdcStartFlow, wbtcUsdcStopFlow,
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
    <Card isLoading={isLoading} main title={<a href="https://polygonscan.com/address/0x71f649EB05AA48cF8d92328D1C486B7d9fDbfF6b" className={styles.link}>{'WBTC >> USDC'}</a>}>
      <FlowForm
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

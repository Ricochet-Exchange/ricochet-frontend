import React, { useCallback, useState, ChangeEvent } from 'react';
import { Card } from 'components/layout/Card';
import { FlowForm } from 'components/main/FlowForm';
import { useDispatch } from 'react-redux';
import {
  wbtcUsdcStartFlow, wbtcUsdcStopFlow,
} from 'store/main/actionCreators';
import styles from './styles.module.scss';

type Props = {
  balance?: string,
  totalFlows?: number,
  flowsOwned?: string,
  placeholder?: string,
};

export const WbtcUsdcFlow: React.FC<Props> = ({
  balance,
  flowsOwned,
  totalFlows,
  placeholder,
}) => {
  const dispatch = useDispatch();
  const [wbtcUsdc, setWbtcUsdc] = useState('');
  const [error, setError] = useState('');

  const callback = useCallback((e?: string) => {
    setWbtcUsdc('');
    if (e) {
      setError(e);
      setTimeout(() => setError(''), 5000);
    }
  }, [setWbtcUsdc]);

  const handleStart = useCallback(() => {
    dispatch(wbtcUsdcStartFlow(wbtcUsdc, callback));
  }, [dispatch, wbtcUsdc, callback]);

  const handleStop = useCallback(() => {
    dispatch(wbtcUsdcStopFlow(callback));
  }, [dispatch, callback]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWbtcUsdc(e.target.value);
  };

  return (
    <Card main title={<a href="https://polygonscan.com/address/0x5786D3754443C0D3D1DdEA5bB550ccc476FdF11D" className={styles.link}>{'WBTC >> USDC'}</a>}>
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

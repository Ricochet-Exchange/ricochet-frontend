import React, { useCallback, useState, ChangeEvent } from 'react';
import { Card } from 'components/layout/Card';
import { FlowForm } from 'components/main/FlowForm';
import { useDispatch } from 'react-redux';
import {
  wethUsdcStartFlow, wethUsdcStopFlow,
} from 'store/main/actionCreators';
import styles from './styles.module.scss';

type Props = {
  balance?: string,
  totalFlows?: number,
  flowsOwned?: string,
  placeholder?: string,
};

export const WethUsdcFlow: React.FC<Props> = ({
  balance,
  flowsOwned,
  totalFlows,
  placeholder,
}) => {
  const dispatch = useDispatch();
  const [wethUsdc, setWethUsdc] = useState('');
  const [error, setError] = useState('');

  const callback = useCallback((e?: string) => {
    setWethUsdc('');
    if (e) {
      setError(e);
      setTimeout(() => setError(''), 5000);
    }
  }, [setWethUsdc]);

  const handleStart = useCallback(() => {
    dispatch(wethUsdcStartFlow(wethUsdc, callback));
  }, [dispatch, wethUsdc, callback]);

  const handleStop = useCallback(() => {
    dispatch(wethUsdcStopFlow(callback));
  }, [dispatch, callback]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWethUsdc(e.target.value);
  };

  return (
    <Card main title={<a href="https://polygonscan.com/address/0x5786D3754443C0D3D1DdEA5bB550ccc476FdF11D" className={styles.link}>{'ETH >> USDC'}</a>}>
      <FlowForm
        onStart={handleStart}
        onStop={handleStop}
        balance={balance}
        flowsOwned={flowsOwned}
        totalFlows={totalFlows}
        token="WETHx"
        value={wethUsdc}
        onChange={handleChange}
        error={error}
        placeholder={placeholder}
      />
    </Card>
  );
};

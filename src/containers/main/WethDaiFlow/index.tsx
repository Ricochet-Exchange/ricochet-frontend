import React, { useCallback, useState, ChangeEvent } from 'react';
import { Card } from 'components/layout/Card';
import { FlowForm } from 'components/main/FlowForm';
import { useDispatch } from 'react-redux';
import {
  wethDaiStartFlow, wethDaiStopFlow,
} from 'store/main/actionCreators';
import styles from './styles.module.scss';

type Props = {
  balance?: string,
  totalFlows?: number,
  flowsOwned?: string,
  placeholder?: string,
};

export const WethDaiFlow: React.FC<Props> = ({
  balance,
  flowsOwned,
  totalFlows,
  placeholder,
}) => {
  const dispatch = useDispatch();
  const [wethDai, setWethDai] = useState('');
  const [error, setError] = useState('');

  const callback = useCallback((e?: string) => {
    setWethDai('');
    if (e) {
      setError(e);
      setTimeout(() => setError(''), 5000);
    }
  }, [setWethDai]);

  const handleStart = useCallback(() => {
    dispatch(wethDaiStartFlow(wethDai, callback));
  }, [dispatch, wethDai, callback]);

  const handleStop = useCallback(() => {
    dispatch(wethDaiStopFlow(callback));
  }, [dispatch, callback]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWethDai(e.target.value);
  };

  return (
    <Card main title={<a href="https://polygonscan.com/address/0x5786D3754443C0D3D1DdEA5bB550ccc476FdF11D" className={styles.link}>{'ETH >> DAI'}</a>}>
      <FlowForm
        onStart={handleStart}
        onStop={handleStop}
        balance={balance}
        flowsOwned={flowsOwned}
        totalFlows={totalFlows}
        token="WETHx"
        value={wethDai}
        onChange={handleChange}
        error={error}
        placeholder={placeholder}
      />
    </Card>
  );
};

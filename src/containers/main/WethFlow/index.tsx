import React, { useCallback, useState, ChangeEvent } from 'react';
import { Card } from 'components/layout/Card';
import { FlowForm } from 'components/main/FlowForm';
import { useDispatch } from 'react-redux';
import {
  ricwethSubscription, wethStartFlow, wethStopFlow, 
} from 'store/main/actionCreators';
import styles from './styles.module.scss';

type Props = {
  balance?: string,
  totalFlows?: number,
  flowsOwned?: string,
  placeholder?: string,
};

export const WethFlow: React.FC<Props> = ({
  balance,
  flowsOwned,
  totalFlows,
  placeholder,
}) => {
  const dispatch = useDispatch();
  const [weth, setWeth] = useState('');
  const [error, setError] = useState('');
  
  const callback = useCallback((e?: string) => {
    setWeth('');
    if (e) {
      setError(e);
      setTimeout(() => setError(''), 5000);
    }
  }, [setWeth]);

  const handleSubscription = useCallback(() => {
    dispatch(ricwethSubscription());
  }, [dispatch]);

  const handleStart = useCallback(() => {
    dispatch(wethStartFlow(weth, callback));
  }, [dispatch, weth, callback]);

  const handleStop = useCallback(() => {
    dispatch(wethStopFlow(callback));
  }, [dispatch, callback]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWeth(e.target.value);
  };

  return (
    <Card main title={<a href="https://polygonscan.com/address/0x5786D3754443C0D3D1DdEA5bB550ccc476FdF11D" className={styles.link}>{'ETH >> DAI'}</a>}>
      <FlowForm
        onSubscription={handleSubscription}
        onStart={handleStart}
        onStop={handleStop}
        balance={balance}
        flowsOwned={flowsOwned}
        totalFlows={totalFlows}
        token="WETHx"
        value={weth}
        onChange={handleChange}
        error={error}
        placeholder={placeholder}
      />
    </Card>
  );
};

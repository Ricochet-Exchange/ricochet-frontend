import React, { useCallback, useState, ChangeEvent } from 'react';
import { Card } from 'components/layout/Card';
import { FlowForm } from 'components/main/FlowForm';
import { useDispatch } from 'react-redux';
import { usdcWethStartFlow, usdcWethStopFlow } from 'store/main/actionCreators';
import styles from './styles.module.scss';

type Props = {
  balance?: string,
  flowsOwned?: string,
  totalFlows?: number,
  placeholder?: string,
};

export const UsdcWethFlow: React.FC<Props> = ({
  balance,
  flowsOwned,
  totalFlows,
  placeholder,
}) => {
  const dispatch = useDispatch();
  const [usdcWeth, setUsdcWeth] = useState('');
  const [error, setError] = useState('');

  const callback = useCallback((e?: string) => {
    setUsdcWeth('');
    if (e) {
      setError(e);
      setTimeout(() => setError(''), 5000);
    }
  }, [setUsdcWeth]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsdcWeth(e.target.value);
  };

  const handleStart = useCallback(() => {
    dispatch(usdcWethStartFlow(usdcWeth, callback));
  }, [dispatch, usdcWeth, callback]);

  const handleStop = useCallback(() => {
    dispatch(usdcWethStopFlow(callback));
  }, [dispatch, callback]);

  return (
    <Card main title={<a href="https://polygonscan.com/address/0x27C7D067A0C143990EC6ed2772E7136Cfcfaecd6" className={styles.link}>{'USDC >> ETH'}</a>}>
      <FlowForm
        onStart={handleStart}
        onStop={handleStop}
        balance={balance}
        flowsOwned={flowsOwned}
        totalFlows={totalFlows}
        token="USDCx"
        value={usdcWeth}
        onChange={handleChange}
        error={error}
        placeholder={placeholder}
      />
    </Card>
  );
};

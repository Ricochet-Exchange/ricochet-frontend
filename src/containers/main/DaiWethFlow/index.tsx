import React, { useCallback, useState, ChangeEvent } from 'react';
import { Card } from 'components/layout/Card';
import { FlowForm } from 'components/main/FlowForm';
import { useDispatch } from 'react-redux';
import { daiWethStartFlow, daiWethStopFlow } from 'store/main/actionCreators';
import styles from './styles.module.scss';

type Props = {
  balance?: string,
  flowsOwned?: string,
  totalFlows?: number,
  placeholder?: string,
};

export const DaiWethFlow: React.FC<Props> = ({
  balance,
  flowsOwned,
  totalFlows,
  placeholder,
}) => {
  const dispatch = useDispatch();
  const [daiWeth, setDaiWeth] = useState('');
  const [error, setError] = useState('');

  const callback = useCallback((e?: string) => {
    setDaiWeth('');
    if (e) {
      setError(e);
      setTimeout(() => setError(''), 5000);
    }
  }, [setDaiWeth]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDaiWeth(e.target.value);
  };

  const handleStart = useCallback(() => {
    dispatch(daiWethStartFlow(daiWeth, callback));
  }, [dispatch, daiWeth, callback]);

  const handleStop = useCallback(() => {
    dispatch(daiWethStopFlow(callback));
  }, [dispatch, callback]);

  return (
    <Card main title={<a href="https://polygonscan.com/address/0x27C7D067A0C143990EC6ed2772E7136Cfcfaecd6" className={styles.link}>{'DAI >> WETH'}</a>}>
      <FlowForm
        onStart={handleStart}
        onStop={handleStop}
        balance={balance}
        flowsOwned={flowsOwned}
        totalFlows={totalFlows}
        token="DAIx"
        value={daiWeth}
        onChange={handleChange}
        error={error}
        placeholder={placeholder}
      />
    </Card>
  );
};

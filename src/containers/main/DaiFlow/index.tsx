import React, { useCallback, useState, ChangeEvent } from 'react';
import { Card } from 'components/layout/Card';
import { FlowForm } from 'components/main/FlowForm';
import { useDispatch } from 'react-redux';
import { daiStartFlow, daiStopFlow, ricdaiSubscription } from 'store/main/actionCreators';
import styles from './styles.module.scss';

type Props = {
  balance?: string,
  flowsOwned?: string,
  totalFlows?: number,
  placeholder?: string,
};

export const DaiFlow: React.FC<Props> = ({
  balance,
  flowsOwned,
  totalFlows,
  placeholder,
}) => {
  const dispatch = useDispatch();
  const [dai, setDai] = useState('');
  const [error, setError] = useState('');

  const callback = useCallback((e?: string) => {
    setDai('');
    if (e) {
      setError(e);
      setTimeout(() => setError(''), 5000);
    }
  }, [setDai]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDai(e.target.value);
  };
  
  const handleSubscription = useCallback(() => {
    dispatch(ricdaiSubscription());
  }, [dispatch]);

  const handleStart = useCallback(() => {
    dispatch(daiStartFlow(dai, callback));
  }, [dispatch, dai, callback]);

  const handleStop = useCallback(() => {
    dispatch(daiStopFlow(callback));
  }, [dispatch, callback]);

  return (
    <Card main title={<a href="https://polygonscan.com/address/0x27C7D067A0C143990EC6ed2772E7136Cfcfaecd6" className={styles.link}>{'DAI >> WETH'}</a>}>   
      <FlowForm
        onSubscription={handleSubscription}
        onStart={handleStart}
        onStop={handleStop}
        balance={balance}
        flowsOwned={flowsOwned}
        totalFlows={totalFlows}
        token="DAIx"
        value={dai}
        onChange={handleChange}
        error={error}
        placeholder={placeholder}
      />      
    </Card>
  ); 
};

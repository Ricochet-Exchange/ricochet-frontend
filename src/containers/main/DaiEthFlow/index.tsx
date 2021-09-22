import React, { useCallback, useState, ChangeEvent } from 'react';
import { Card } from 'components/layout/Card';
import { FlowForm } from 'components/main/FlowForm';
import { useDispatch } from 'react-redux';
import { daiEthStartFlow, daiEthStopFlow } from 'store/main/actionCreators';
import { useToasts } from 'hooks/useToast';
import styles from './styles.module.scss';

type Props = {
  balance?: string,
  flowsOwned?: string,
  totalFlows?: number,
  placeholder?: string,
  isLoading?: boolean,
};

export const DaiEthFlow: React.FC<Props> = ({
  balance,
  flowsOwned,
  totalFlows,
  placeholder,
  isLoading,
}) => {
  const dispatch = useDispatch();
  const { showErrorToast } = useToasts();
  const [daiEth, setDaiEth] = useState('');
  const [error, setError] = useState('');

  const callback = useCallback((e?: string) => {
    setDaiEth('');
    if (e) {
      showErrorToast(e, 'Error');
    }
  }, [setDaiEth]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) {
      setError('');
    }
    setDaiEth(e.target.value);
  };

  const handleStart = useCallback(() => {
    if (!daiEth || Number(daiEth) <= 0) {
      return setError('Enter positive value');
    }
    dispatch(daiEthStartFlow(daiEth, callback));
  }, [dispatch, daiEth, callback]);

  const handleStop = useCallback(() => {
    dispatch(daiEthStopFlow(callback));
  }, [dispatch, callback]);

  return (
    <Card
      main
      title={(
        <a
          href="https://polygonscan.com/address/0x47de4Fd666373Ca4A793e2E0e7F995Ea7D3c9A29"
          className={styles.link}
        >
          {'DAI >> ETH'}
        </a>
      )}
      isLoading={isLoading}
    >
      <FlowForm
        onStart={handleStart}
        onStop={handleStop}
        balance={balance}
        flowsOwned={flowsOwned}
        totalFlows={totalFlows}
        token="DAIx"
        value={daiEth}
        onChange={handleChange}
        error={error}
        placeholder={placeholder}
      />
    </Card>
  );
};

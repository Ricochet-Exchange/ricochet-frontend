import React, { useCallback, useState, ChangeEvent } from 'react';
import { Card } from 'components/layout/Card';
import { FlowForm } from 'components/main/FlowForm';
import { useDispatch } from 'react-redux';
import { daiMkrStartFlow, daiMkrStopFlow } from 'store/main/actionCreators';
import { useToasts } from 'hooks/useToast';
import styles from './styles.module.scss';

type Props = {
  balance?: string,
  flowsOwned?: string,
  totalFlows?: number,
  placeholder?: string,
  isLoading?: boolean,
};

export const DaiMkrFlow: React.FC<Props> = ({
  balance,
  flowsOwned,
  totalFlows,
  placeholder,
  isLoading,
}) => {
  const dispatch = useDispatch();
  const { showErrorToast } = useToasts();
  const [daiMkr, setDaiMkr] = useState('');
  const [error, setError] = useState('');

  const callback = useCallback((e?: string) => {
    setDaiMkr('');
    if (e) {
      showErrorToast(e, 'Error');
    }
  }, [setDaiMkr]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) {
      setError('');
    }
    setDaiMkr(e.target.value);
  };

  const handleStart = useCallback(() => {
    if (!daiMkr || Number(daiMkr) <= 0) {
      return setError('Enter positive value');
    }
    dispatch(daiMkrStartFlow(daiMkr, callback));
  }, [dispatch, daiMkr, callback]);

  const handleStop = useCallback(() => {
    dispatch(daiMkrStopFlow(callback));
  }, [dispatch, callback]);

  return (
    <Card
      main
      title={(
        <a
          href="https://polygonscan.com/address/0x47de4Fd666373Ca4A793e2E0e7F995Ea7D3c9A29"
          className={styles.link}
        >
          {'DAI >> MKR'}
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
        value={daiMkr}
        onChange={handleChange}
        error={error}
        placeholder={placeholder}
      />
    </Card>
  );
};

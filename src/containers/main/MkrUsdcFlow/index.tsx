import React, { useCallback, useState, ChangeEvent } from 'react';
import { Card } from 'components/layout/Card';
import { FlowForm } from 'components/main/FlowForm';
import { useDispatch } from 'react-redux';
import { mkrUsdcStartFlow, mkrUsdcStopFlow } from 'store/main/actionCreators';
import { useToasts } from 'hooks/useToast';
import styles from './styles.module.scss';

type Props = {
  balance?: string,
  flowsOwned?: string,
  totalFlows?: number,
  placeholder?: string,
  isLoading?: boolean,
};

export const MkrUsdcFlow: React.FC<Props> = ({
  balance,
  flowsOwned,
  totalFlows,
  placeholder,
  isLoading,
}) => {
  const dispatch = useDispatch();
  const { showErrorToast } = useToasts();
  const [mkrUsdc, setMkrUsdc] = useState('');
  const [error, setError] = useState('');

  const callback = useCallback((e?: string) => {
    setMkrUsdc('');
    if (e) {
      showErrorToast(e, 'Error');
    }
  }, [setMkrUsdc]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) {
      setError('');
    }
    setMkrUsdc(e.target.value);
  };

  const handleStart = useCallback(() => {
    if (!mkrUsdc || Number(mkrUsdc) <= 0) {
      return setError('Enter positive value');
    }
    dispatch(mkrUsdcStartFlow(mkrUsdc, callback));
  }, [dispatch, mkrUsdc, callback]);

  const handleStop = useCallback(() => {
    dispatch(mkrUsdcStopFlow(callback));
  }, [dispatch, callback]);

  return (
    <Card
      main
      title={(
        <a
          href="https://polygonscan.com/address/0x47de4Fd666373Ca4A793e2E0e7F995Ea7D3c9A29"
          className={styles.link}
        >
          {'MKR >> USDC'}
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
        token="MKRx"
        value={mkrUsdc}
        onChange={handleChange}
        error={error}
        placeholder={placeholder}
      />
    </Card>
  );
};

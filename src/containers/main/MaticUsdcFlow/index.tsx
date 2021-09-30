import React, { useCallback, useState, ChangeEvent } from 'react';
import { Card } from 'components/layout/Card';
import { FlowForm } from 'components/main/FlowForm';
import { useDispatch } from 'react-redux';
import { maticUsdcStartFlow, maticUsdcStopFlow } from 'store/main/actionCreators';
import { useToasts } from 'hooks/useToast';
import styles from './styles.module.scss';

type Props = {
  balance?: string,
  flowsOwned?: string,
  totalFlows?: number,
  placeholder?: string,
  isLoading?: boolean,
};

export const MaticUsdcFlow: React.FC<Props> = ({
  balance,
  flowsOwned,
  totalFlows,
  placeholder,
  isLoading,
}) => {
  const dispatch = useDispatch();
  const { showErrorToast } = useToasts();
  const [maticUsdc, setMaticUsdc] = useState('');
  const [error, setError] = useState('');

  const callback = useCallback((e?: string) => {
    setMaticUsdc('');
    if (e) {
      showErrorToast(e, 'Error');
    }
  }, [setMaticUsdc]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) {
      setError('');
    }
    setMaticUsdc(e.target.value);
  };

  const handleStart = useCallback(() => {
    if (!maticUsdc || Number(maticUsdc) <= 0) {
      return setError('Enter positive value');
    }
    dispatch(maticUsdcStartFlow(maticUsdc, callback));
  }, [dispatch, maticUsdc, callback]);

  const handleStop = useCallback(() => {
    dispatch(maticUsdcStopFlow(callback));
  }, [dispatch, callback]);

  return (
    <Card
      main
      title={(
        <a
          href="https://polygonscan.com/address/0x47de4Fd666373Ca4A793e2E0e7F995Ea7D3c9A29"
          className={styles.link}
        >
          {'MATIC >> USDC'}
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
        token="MATICx"
        value={maticUsdc}
        onChange={handleChange}
        error={error}
        placeholder={placeholder}
      />
    </Card>
  );
};

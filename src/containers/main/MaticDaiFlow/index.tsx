import React, { useCallback, useState, ChangeEvent } from 'react';
import { Card } from 'components/layout/Card';
import { FlowForm } from 'components/main/FlowForm';
import { useDispatch } from 'react-redux';
import { maticDaiStartFlow, maticDaiStopFlow } from 'store/main/actionCreators';
import { useToasts } from 'hooks/useToast';
import styles from './styles.module.scss';

type Props = {
  balance?: string,
  flowsOwned?: string,
  totalFlows?: number,
  placeholder?: string,
  isLoading?: boolean,
};

export const MaticDaiFlow: React.FC<Props> = ({
  balance,
  flowsOwned,
  totalFlows,
  placeholder,
  isLoading,
}) => {
  const dispatch = useDispatch();
  const { showErrorToast } = useToasts();
  const [maticDai, setMaticDai] = useState('');
  const [error, setError] = useState('');

  const callback = useCallback((e?: string) => {
    setMaticDai('');
    if (e) {
      showErrorToast(e, 'Error');
    }
  }, [setMaticDai]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) {
      setError('');
    }
    setMaticDai(e.target.value);
  };

  const handleStart = useCallback(() => {
    if (!maticDai || Number(maticDai) <= 0) {
      return setError('Enter positive value');
    }
    dispatch(maticDaiStartFlow(maticDai, callback));
  }, [dispatch, maticDai, callback]);

  const handleStop = useCallback(() => {
    dispatch(maticDaiStopFlow(callback));
  }, [dispatch, callback]);

  return (
    <Card
      main
      title={(
        <a
          href="https://docs.ricochet.exchange/docs/network-directory"
          className={styles.link}
        >
          {'MATIC >> DAI'}
          <span className={styles.badge}>🚰</span>
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
        value={maticDai}
        onChange={handleChange}
        error={error}
        placeholder={placeholder}
      />
    </Card>
  );
};

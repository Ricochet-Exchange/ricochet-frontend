import React, { useCallback, useState, ChangeEvent } from 'react';
import { Card } from 'components/layout/Card';
import { FlowForm } from 'components/main/FlowForm';
import { useDispatch } from 'react-redux';
import { usdcWethStartFlow, usdcWethStopFlow } from 'store/main/actionCreators';
import { useToasts } from 'hooks/useToast';
import styles from './styles.module.scss';

type Props = {
  balance?: string,
  flowsOwned?: string,
  totalFlows?: number,
  placeholder?: string,
  isLoading?: boolean,
};

export const UsdcWethFlow: React.FC<Props> = ({
  balance,
  flowsOwned,
  totalFlows,
  placeholder,
  isLoading,
}) => {
  const { showErrorToast } = useToasts();
  const dispatch = useDispatch();
  const [usdcWeth, setUsdcWeth] = useState('');
  const [error, setError] = useState('');

  const callback = useCallback((e?: string) => {
    setUsdcWeth('');
    if (e) {
      showErrorToast(e, 'Error');
    }
  }, [setUsdcWeth]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) {
      setError('');
    }
    setUsdcWeth(e.target.value);
  };

  const handleStart = useCallback(() => {
    if (!usdcWeth || Number(usdcWeth) <= 0) {
      return setError('Enter positive value');
    }
    dispatch(usdcWethStartFlow(usdcWeth, callback));
  }, [dispatch, usdcWeth, callback]);

  const handleStop = useCallback(() => {
    dispatch(usdcWethStopFlow(callback));
  }, [dispatch, callback]);

  return (
    <Card
      isLoading={isLoading}
      main
      title={(
        <a
          href="https://docs.ricochet.exchange/docs/network-directory"
          className={styles.link}
        >
          {'USDC >> WETH'}
          <span className={styles.badge}>🚰</span>
        </a>
      )}
    >
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

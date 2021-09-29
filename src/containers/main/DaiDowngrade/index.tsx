import React, { useState, useCallback } from 'react';
import { DowngradeForm } from 'components/main/DowngradeForm';
import { Card } from 'components/layout/Card';
import { useDispatch } from 'react-redux';
import { daiDownGrade } from 'store/main/actionCreators';
import { BalanceText } from 'components/common/BalanceText';
import { useToasts } from 'hooks/useToast';
import { trimPad } from 'utils/balances';

type Props = {
  balance?: string;
  isLoading?: boolean;
};

export const DaiDowngrade: React.FC<Props> = ({
  balance = '',
  isLoading,
}) => {
  const { showErrorToast } = useToasts();
  const [dai, setDai] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const callback = useCallback((e?: string) => {
    setDai('');
    if (e) {
      showErrorToast(e, 'Error');
    }
  }, [setDai]);

  const handleAmount = (amount: string) => {
    if (error) {
      setError('');
    }
    setDai(amount);
  };

  const handleClick = useCallback(() => {
    if (!dai || Number(dai) <= 0) {
      return setError('Enter positive value');
    }
    if (Number(dai) > Number(balance)) {
      return setError('Low balance');
    }
    dispatch(daiDownGrade(dai, callback));
  }, [dispatch, dai]);

  return (
    <Card title="Downgrade DAIx to DAI" isLoading={isLoading}>
      <>
        <DowngradeForm
          value={dai}
          onAmount={handleAmount}
          onClick={handleClick}
          error={error}
          balance={balance}
        />
        <BalanceText text={`Your DAIx Balance: ${trimPad(balance, 6)}`} />
      </>
    </Card>
  );
};

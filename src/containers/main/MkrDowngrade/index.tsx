import React, { useState, useCallback } from 'react';
import { DowngradeForm } from 'components/main/DowngradeForm';
import { Card } from 'components/layout/Card';
import { useDispatch } from 'react-redux';
import { mkrDownGrade } from 'store/main/actionCreators';
import { BalanceText } from 'components/common/BalanceText';
import { useToasts } from 'hooks/useToast';
import { trimPad } from 'utils/balances';

type Props = {
  balance?: string;
  isLoading?: boolean;
};

export const MkrDowngrade: React.FC<Props> = ({
  balance = '',
  isLoading,
}) => {
  const { showErrorToast } = useToasts();
  const [mkr, setMkr] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const callback = useCallback((e?: string) => {
    setMkr('');
    if (e) {
      showErrorToast(e, 'Error');
    }
  }, [setMkr]);

  const handleAmount = (amount: string) => {
    if (error) {
      setError('');
    }
    setMkr(amount);
  };

  const handleClick = useCallback(() => {
    if (!mkr || Number(mkr) <= 0) {
      return setError('Enter positive value');
    }
    if (Number(mkr) > Number(balance)) {
      return setError('Low balance');
    }
    dispatch(mkrDownGrade(mkr, callback));
  }, [dispatch, mkr]);

  return (
    <Card title="Downgrade MKRx to MKR" isLoading={isLoading}>
      <>
        <DowngradeForm
          value={mkr}
          onAmount={handleAmount}
          onClick={handleClick}
          error={error}
          balance={balance}
        />
        <BalanceText text={`Your MKRx Balance: ${trimPad(balance, 6)}`} />
      </>
    </Card>
  );
};

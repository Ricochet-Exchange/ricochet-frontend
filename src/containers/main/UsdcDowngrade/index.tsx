import React, { useState, useCallback } from 'react';
import { DowngradeForm } from 'components/main/DowngradeForm';
import { Card } from 'components/layout/Card';
import { useDispatch } from 'react-redux';
import { usdcDownGrade } from 'store/main/actionCreators';
import { BalanceText } from 'components/common/BalanceText';
import { useToasts } from 'hooks/useToast';
import { trimPad } from 'utils/balances';

type Props = {
  balance?: string;
  isLoading?: boolean;
};

export const UsdcDowngrade: React.FC<Props> = ({ 
  balance = '',
  isLoading, 
}) => {
  const { showErrorToast } = useToasts();
  const [usdc, setUsdc] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const callback = useCallback((e?: string) => {
    setUsdc('');
    if (e) {
      showErrorToast(e, 'Error');
    }
  }, [setUsdc]);

  const handleAmount = (amount: string) => {
    if (error) {
      setError('');
    }
    setUsdc(amount);
  };

  const handleClick = useCallback(() => {
    if (!usdc || Number(usdc) <= 0) {
      return setError('Enter positive value');
    }
    if (Number(usdc) > Number(balance)) {
      return setError('Low balance');
    }
    dispatch(usdcDownGrade(usdc, callback));
  }, [dispatch, usdc]);

  return (
    <Card title="Downgrade USDCx to USDC" isLoading={isLoading}>
      <>
        <DowngradeForm
          value={usdc}
          onAmount={handleAmount}
          onClick={handleClick}
          error={error}
          balance={balance}
        />
        <BalanceText text={`Your USDCx Balance: ${trimPad(balance, 6)}`} />
      </>
    </Card>
  );
};

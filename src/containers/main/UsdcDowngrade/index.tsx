import React, { useState, ChangeEvent, useCallback } from 'react';
import { DowngradeForm } from 'components/main/DowngradeForm';
import { Card } from 'components/layout/Card';
import { useDispatch } from 'react-redux';
import { usdcDownGrade } from 'store/main/actionCreators';
import { BalanceText } from 'components/common/BalanceText';
import { useToasts } from 'hooks/useToast';

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) { 
      setError('');
    }
    setUsdc(e.target.value);
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
          onChange={handleChange}
          onClick={handleClick}
          error={error}
        />
        <BalanceText text={`Your USDCx Balance: ${balance}`} />
      </>
    </Card>
  );
};

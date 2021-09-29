import React, { useState, useCallback } from 'react';
import { Card } from 'components/layout/Card';
import { UpgradeForm } from 'components/main/UpgradeForm';
import { useDispatch } from 'react-redux';
import { usdcApprove, usdcUpgrade } from 'store/main/actionCreators';
import { BalanceText } from 'components/common/BalanceText';
import { useToasts } from 'hooks/useToast';
import { trimPad } from 'utils/balances';

type Props = {
  balance?: string;
  hasUsdcApprove?: boolean;
  isLoading?: boolean;
};

export const UsdcUpgrade: React.FC<Props> = ({
  balance = '',
  hasUsdcApprove,
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

  const handleonApprove = useCallback(() => {
    if (!usdc || Number(usdc) <= 0) {
      return setError('Enter positive value');
    }
    dispatch(usdcApprove(usdc, callback));
  }, [dispatch, usdc, callback, hasUsdcApprove]);

  const handleonUpgrade = useCallback(() => {
    if (!usdc || Number(usdc) <= 0) {
      return setError('Enter positive value');
    }
    if (Number(usdc) > Number(balance)) {
      return setError('Low balance');
    }
    dispatch(usdcUpgrade(usdc, callback));
  }, [dispatch, usdc, callback]);

  return (
    <Card title="Upgrade USDC to USDCx" isLoading={isLoading}>
      <>
        <UpgradeForm
          value={usdc}
          onAmount={handleAmount}
          onApprove={handleonApprove}
          onUpgrade={handleonUpgrade}
          disabledApprove={hasUsdcApprove}
          disabledUpgrade={!hasUsdcApprove}
          error={error}
          balance={balance}
        />
        <BalanceText text={`Your USDC Balance: ${trimPad(balance, 6)}`} />
      </>
    </Card>
  );
};

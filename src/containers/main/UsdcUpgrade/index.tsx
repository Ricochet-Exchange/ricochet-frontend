import React, { useState, useCallback, ChangeEvent } from 'react';
import { Card } from 'components/layout/Card';
import { UpgradeForm } from 'components/main/UpgradeForm';
import { useDispatch } from 'react-redux';
import { usdcApprove, usdcUpgrade } from 'store/main/actionCreators';
import { BalanceText } from 'components/common/BalanceText';

type Props = {
  balance?: string;
  disabled?: boolean;
  hasUsdcApprove?: boolean;
};

export const UsdcUpgrade: React.FC<Props> = ({
  disabled,
  balance = '',
  hasUsdcApprove,
}) => {
  const [usdc, setUsdc] = useState('');
  const dispatch = useDispatch();

  const callback = useCallback(() => {
    setUsdc('');
  }, [setUsdc]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsdc(e.target.value);
  };

  const handleonApprove = useCallback(() => {
    if (!usdc || disabled || hasUsdcApprove) {
      return;
    }
    dispatch(usdcApprove(usdc, callback));
  }, [dispatch, usdc, callback, hasUsdcApprove, disabled]);

  const handleonUpgrade = useCallback(() => {
    if (!usdc || disabled) {
      return;
    }
    dispatch(usdcUpgrade(usdc, callback));
  }, [dispatch, usdc, callback, disabled]);

  return (
    <Card title="Upgrade USDC to USDCx">
      <>
        <UpgradeForm
          value={usdc}
          onChange={handleChange}
          onApprove={handleonApprove}
          onUpgrade={handleonUpgrade}
          disabledApprove={hasUsdcApprove}
          disabledUpgrade={!hasUsdcApprove}
        />
        <BalanceText text={`Your USDC Balance: ${balance}`} />
      </>
    </Card>
  );
};

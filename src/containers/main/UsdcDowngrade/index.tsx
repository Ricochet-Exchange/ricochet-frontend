import React, { useState, ChangeEvent, useCallback } from 'react';
import { DowngradeForm } from 'components/main/DowngradeForm';
import { Card } from 'components/layout/Card';
import { useDispatch } from 'react-redux';
import { usdcDownGrade } from 'store/main/actionCreators';
import { BalanceText } from 'components/common/BalanceText';

type Props = {
  balance?: string
  disabled?: boolean;
};

export const UsdcDowngrade: React.FC<Props> = ({ balance = '', disabled }) => {
  const [usdc, setUsdc] = useState('');
  const dispatch = useDispatch();

  const callback = useCallback(() => {
    setUsdc('');
  }, [setUsdc]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsdc(e.target.value);
  };

  const handleClick = useCallback(() => {
    if (!usdc || disabled) {
      return;
    }
    dispatch(usdcDownGrade(usdc, callback));
  }, [dispatch, usdc, disabled]);

  return (
    <Card title="Downgrade USDCx to USDC">
      <>
        <DowngradeForm
          value={usdc}
          onChange={handleChange}
          onClick={handleClick}
        />
        <BalanceText text={`Your USDCx Balance: ${balance}`} />
      </>
    </Card>
  );
};

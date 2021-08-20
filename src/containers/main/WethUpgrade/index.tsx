import React, { useState, useCallback, ChangeEvent } from 'react';
import { Card } from 'components/layout/Card';
import { UpgradeForm } from 'components/main/UpgradeForm';
import { useDispatch } from 'react-redux';
import { wethApprove, wethUpgrade } from 'store/main/actionCreators';
import { BalanceText } from 'components/common/BalanceText';

type Props = {
  balance?: string;
  disabled?: boolean;
  hasWethApprove?: boolean;
};

export const WethUpgrade: React.FC<Props> = ({
  disabled, 
  balance = '',
  hasWethApprove, 
}) => {
  const [weth, setWeth] = useState('');
  const dispatch = useDispatch();
  
  const callback = useCallback(() => {
    setWeth('');
  }, [setWeth]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWeth(e.target.value);
  };

  const handleonApprove = useCallback(() => { 
    if (!weth || disabled || hasWethApprove) {
      return;
    }
    dispatch(wethApprove(weth, callback));
  }, [dispatch, weth, callback, hasWethApprove, disabled]);

  const handleonUpgrade = useCallback(() => {
    if (!weth || disabled) {
      return;
    }
    dispatch(wethUpgrade(weth, callback));
  }, [dispatch, weth, callback, disabled]);
  
  return (      
    <Card title="Upgrade ETH to ETHx">
      <>
        <UpgradeForm 
          value={weth}
          onChange={handleChange}
          onApprove={handleonApprove}
          onUpgrade={handleonUpgrade}
          disabledApprove={hasWethApprove}
          disabledUpgrade={!hasWethApprove}
        />
        <BalanceText text={`Your ETH Balance: ${balance}`} />
      </>
    </Card>
  ); 
};

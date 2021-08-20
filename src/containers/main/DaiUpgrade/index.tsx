import React, { useState, useCallback, ChangeEvent } from 'react';
import { Card } from 'components/layout/Card';
import { UpgradeForm } from 'components/main/UpgradeForm';
import { useDispatch } from 'react-redux';
import { daiApprove, daiUpgrade } from 'store/main/actionCreators';
import { BalanceText } from 'components/common/BalanceText';

type Props = {
  balance?: string;
  disabled?: boolean;
  hasDaiApprove?: boolean;
};

export const DaiUpgrade: React.FC<Props> = ({
  disabled,
  balance = '', 
  hasDaiApprove, 
}) => {
  const [dai, setDai] = useState('');
  const dispatch = useDispatch();
  
  const callback = useCallback(() => {
    setDai('');
  }, [setDai]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDai(e.target.value);
  };

  const handleonApprove = useCallback(() => { 
    if (!dai || disabled || hasDaiApprove) {
      return;
    }
    dispatch(daiApprove(dai, callback));
  }, [dispatch, dai, callback, hasDaiApprove, disabled]);

  const handleonUpgrade = useCallback(() => {
    if (!dai || disabled) {
      return;
    }
    dispatch(daiUpgrade(dai, callback));
  }, [dispatch, dai, callback, disabled]);
  
  return (      
    <Card title="Upgrade DAI to DAIx">
      <>
        <UpgradeForm 
          value={dai}
          onChange={handleChange}
          onApprove={handleonApprove}
          onUpgrade={handleonUpgrade}
          disabledApprove={hasDaiApprove}
          disabledUpgrade={!hasDaiApprove}
        />
        <BalanceText text={`Your DAI Balance: ${balance}`} />
      </>
    </Card>
  ); 
};

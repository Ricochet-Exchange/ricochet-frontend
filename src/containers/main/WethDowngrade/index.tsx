import React, { useState, ChangeEvent, useCallback } from 'react';
import { Card } from 'components/layout/Card';
import { DowngradeForm } from 'components/main/DowngradeForm';
import { useDispatch } from 'react-redux';
import { wethDownGrade } from 'store/main/actionCreators';
import { BalanceText } from 'components/common/BalanceText';

type Props = {
  balance?: string;
  disabled?: boolean;
};

export const WethDowngrade: React.FC<Props> = ({ balance = '', disabled }) => {
  const [weth, setWeth] = useState('');
  const dispatch = useDispatch();

  const callback = useCallback(() => {
    setWeth('');
  }, [setWeth]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWeth(e.target.value);
  };

  const handleClick = useCallback(() => { 
    if (!weth || disabled) {
      return;
    }
    dispatch(wethDownGrade(weth, callback));
  }, [dispatch, weth, disabled]);

  return (
    <Card title="Downgrade WETHx to WETH">
      <>
        <DowngradeForm 
          value={weth} 
          onChange={handleChange} 
          onClick={handleClick}
        />
        <BalanceText text={`Your WETHx Balance: ${balance}`} />
      </>
    </Card>
  );
};

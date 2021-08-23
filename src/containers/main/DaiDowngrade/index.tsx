import React, { useState, ChangeEvent, useCallback } from 'react';
import { DowngradeForm } from 'components/main/DowngradeForm';
import { Card } from 'components/layout/Card';
import { useDispatch } from 'react-redux';
import { daiDownGrade } from 'store/main/actionCreators';
import { BalanceText } from 'components/common/BalanceText';

type Props = {
  balance?: string
  disabled?: boolean;
};

export const DaiDowngrade: React.FC<Props> = ({ balance = '', disabled }) => {
  const [dai, setDai] = useState('');
  const dispatch = useDispatch();

  const callback = useCallback(() => {
    setDai('');
  }, [setDai]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDai(e.target.value);
  };

  const handleClick = useCallback(() => { 
    if (!dai || disabled) {
      return;
    }
    dispatch(daiDownGrade(dai, callback));
  }, [dispatch, dai, disabled]);

  return (
    <Card title="Downgrade DAIx to DAI">
      <>
        <DowngradeForm 
          value={dai} 
          onChange={handleChange} 
          onClick={handleClick}
        />
        <BalanceText text={`Your DAIx Balance: ${balance}`} />
      </>
    </Card>
  );
};

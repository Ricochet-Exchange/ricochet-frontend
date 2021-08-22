import React, { useState, ChangeEvent, useCallback } from 'react';
import { Card } from 'components/layout/Card';
import { DowngradeForm } from 'components/main/DowngradeForm';
import { useDispatch } from 'react-redux';
import { wbtcDownGrade } from 'store/main/actionCreators';
import { BalanceText } from 'components/common/BalanceText';

type Props = {
  balance?: string;
  disabled?: boolean;
};

export const WbtcDowngrade: React.FC<Props> = ({ balance = '', disabled }) => {
  const [wbtc, setWbtc] = useState('');
  const dispatch = useDispatch();

  const callback = useCallback(() => {
    setWbtc('');
  }, [setWbtc]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWbtc(e.target.value);
  };

  const handleClick = useCallback(() => {
    if (!wbtc || disabled) {
      return;
    }
    dispatch(wbtcDownGrade(wbtc, callback));
  }, [dispatch, wbtc, disabled]);

  return (
    <Card title="Downgrade WBTCx to WBTC">
      <>
        <DowngradeForm
          value={wbtc}
          onChange={handleChange}
          onClick={handleClick}
        />
        <BalanceText text={`Your WBTCx Balance: ${balance}`} />
      </>
    </Card>
  );
};

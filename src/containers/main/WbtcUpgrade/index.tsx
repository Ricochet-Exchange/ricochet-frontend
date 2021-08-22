import React, { useState, useCallback, ChangeEvent } from 'react';
import { Card } from 'components/layout/Card';
import { UpgradeForm } from 'components/main/UpgradeForm';
import { useDispatch } from 'react-redux';
import { wbtcApprove, wbtcUpgrade } from 'store/main/actionCreators';
import { BalanceText } from 'components/common/BalanceText';

type Props = {
  balance?: string;
  disabled?: boolean;
  hasWbtcApprove?: boolean;
};

export const WbtcUpgrade: React.FC<Props> = ({
  disabled,
  balance = '',
  hasWbtcApprove,
}) => {
  const [wbtc, setWbtc] = useState('');
  const dispatch = useDispatch();

  const callback = useCallback(() => {
    setWbtc('');
  }, [setWbtc]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWbtc(e.target.value);
  };

  const handleonApprove = useCallback(() => {
    if (!wbtc || disabled || hasWbtcApprove) {
      return;
    }
    dispatch(wbtcApprove(wbtc, callback));
  }, [dispatch, wbtc, callback, hasWbtcApprove, disabled]);

  const handleonUpgrade = useCallback(() => {
    if (!wbtc || disabled) {
      return;
    }
    dispatch(wbtcUpgrade(wbtc, callback));
  }, [dispatch, wbtc, callback, disabled]);

  return (
    <Card title="Upgrade WBTC to WBTCx">
      <>
        <UpgradeForm
          value={wbtc}
          onChange={handleChange}
          onApprove={handleonApprove}
          onUpgrade={handleonUpgrade}
          disabledApprove={hasWbtcApprove}
          disabledUpgrade={!hasWbtcApprove}
        />
        <BalanceText text={`Your WBTC Balance: ${balance}`} />
      </>
    </Card>
  );
};

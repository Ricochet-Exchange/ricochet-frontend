import React, { useState, useCallback } from 'react';
import { Card } from 'components/layout/Card';
import { DowngradeForm } from 'components/main/DowngradeForm';
import { useDispatch } from 'react-redux';
import { wbtcDownGrade } from 'store/main/actionCreators';
import { BalanceText } from 'components/common/BalanceText';
import { useToasts } from 'hooks/useToast';
import { trimPad } from 'utils/balances';

type Props = {
  balance?: string;
  isLoading?: boolean;
};

export const WbtcDowngrade: React.FC<Props> = ({ balance = '', isLoading }) => {
  const { showErrorToast } = useToasts();
  const [wbtc, setWbtc] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const callback = useCallback((e?:string) => {
    setWbtc('');
    if (e) {
      showErrorToast(e, 'Error');
    }
  }, [setWbtc]);

  const handleAmount = (amount: string) => {
    if (error) {
      setError('');
    }
    setWbtc(amount);
  };

  const handleClick = useCallback(() => {
    if (!wbtc || Number(wbtc) <= 0) {
      return setError('Enter positive value');
    }
    if (Number(wbtc) > Number(balance)) {
      return setError('Low balance');
    }
    dispatch(wbtcDownGrade(wbtc, callback));
  }, [dispatch, wbtc]);

  return (
    <Card title="Downgrade WBTCx to WBTC" isLoading={isLoading}>
      <>
        <DowngradeForm
          value={wbtc}
          onAmount={handleAmount}
          onClick={handleClick}
          error={error}
          balance={balance}
        />
        <BalanceText text={`Your WBTCx Balance: ${trimPad(balance, 6)}`} />
      </>
    </Card>
  );
};

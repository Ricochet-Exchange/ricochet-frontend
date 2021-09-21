import React, { useState, useCallback, ChangeEvent } from 'react';
import { Card } from 'components/layout/Card';
import { UpgradeForm } from 'components/main/UpgradeForm';
import { useDispatch } from 'react-redux';
import { mkrApprove, mkrUpgrade } from 'store/main/actionCreators';
import { BalanceText } from 'components/common/BalanceText';
import { useToasts } from 'hooks/useToast';

type Props = {
  balance?: string;
  hasMkrApprove?: boolean;
  isLoading?: boolean;
};

export const MkrUpgrade: React.FC<Props> = ({
  balance = '',
  hasMkrApprove,
  isLoading,
}) => {
  const { showErrorToast } = useToasts();
  const [mkr, setMkr] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const callback = useCallback((e?: string) => {
    setMkr('');
    if (e) {
      showErrorToast(e, 'Error');
    }
  }, [setMkr]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) {
      setError('');
    }
    setMkr(e.target.value);
  };

  const handleonApprove = useCallback(() => {
    if (!mkr || Number(mkr) <= 0) {
      return setError('Enter positive value');
    }
    dispatch(mkrApprove(mkr, callback));
  }, [dispatch, mkr, callback, hasMkrApprove]);

  const handleonUpgrade = useCallback(() => {
    if (!mkr || Number(mkr) <= 0) {
      return setError('Enter positive value');
    }
    if (Number(mkr) > Number(balance)) {
      return setError('Low balance');
    }
    dispatch(mkrUpgrade(mkr, callback));
  }, [dispatch, mkr, callback]);

  return (
    <Card title="Upgrade MKR to MKRx" isLoading={isLoading}>
      <>
        <UpgradeForm
          value={mkr}
          onChange={handleChange}
          onApprove={handleonApprove}
          onUpgrade={handleonUpgrade}
          disabledApprove={hasMkrApprove}
          disabledUpgrade={!hasMkrApprove}
          error={error}
        />
        <BalanceText text={`Your MKR Balance: ${balance}`} />
      </>
    </Card>
  );
};

import React, { useState, ChangeEvent, useCallback } from 'react';
import { DowngradeForm } from 'components/main/DowngradeForm';
import { Card } from 'components/layout/Card';
import { useDispatch } from 'react-redux';
import { mkrDownGrade } from 'store/main/actionCreators';
import { BalanceText } from 'components/common/BalanceText';
import { useToasts } from 'hooks/useToast';

type Props = {
  balance?: string;
  isLoading?: boolean;
};

export const MkrDowngrade: React.FC<Props> = ({
  balance = '',
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

  const handleClick = useCallback(() => {
    if (!mkr || Number(mkr) <= 0) {
      return setError('Enter positive value');
    }
    if (Number(mkr) > Number(balance)) {
      return setError('Low balance');
    }
    dispatch(mkrDownGrade(mkr, callback));
  }, [dispatch, mkr]);

  return (
    <Card title="Downgrade MKRx to MKR" isLoading={isLoading}>
      <>
        <DowngradeForm
          value={mkr}
          onChange={handleChange}
          onClick={handleClick}
          error={error}
        />
        <BalanceText text={`Your MKRx Balance: ${balance}`} />
      </>
    </Card>
  );
};

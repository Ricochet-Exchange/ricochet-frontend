import React, { useState, useCallback, ChangeEvent } from 'react';
import { Card } from 'components/layout/Card';
import { UpgradeForm } from 'components/main/UpgradeForm';
import { useDispatch } from 'react-redux';
import { daiApprove, daiUpgrade } from 'store/main/actionCreators';
import { BalanceText } from 'components/common/BalanceText';
import { useToasts } from 'hooks/useToast';

type Props = {
  balance?: string;
  hasDaiApprove?: boolean;
  isLoading?: boolean;
};

export const DaiUpgrade: React.FC<Props> = ({
  balance = '',
  hasDaiApprove,
  isLoading,
}) => {
  const { showErrorToast } = useToasts();
  const [dai, setDai] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const callback = useCallback((e?: string) => {
    setDai('');
    if (e) {
      showErrorToast(e, 'Error');
    }
  }, [setDai]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) {
      setError('');
    }
    setDai(e.target.value);
  };

  const handleonApprove = useCallback(() => {
    if (!dai || Number(dai) <= 0) {
      return setError('Enter positive value');
    }
    dispatch(daiApprove(dai, callback));
  }, [dispatch, dai, callback, hasDaiApprove]);

  const handleonUpgrade = useCallback(() => {
    if (!dai || Number(dai) <= 0) {
      return setError('Enter positive value');
    }
    if (Number(dai) > Number(balance)) {
      return setError('Low balance');
    }
    dispatch(daiUpgrade(dai, callback));
  }, [dispatch, dai, callback]);

  return (
    <Card title="Upgrade DAI to DAIx" isLoading={isLoading}>
      <>
        <UpgradeForm
          value={dai}
          onChange={handleChange}
          onApprove={handleonApprove}
          onUpgrade={handleonUpgrade}
          disabledApprove={hasDaiApprove}
          disabledUpgrade={!hasDaiApprove}
          error={error}
        />
        <BalanceText text={`Your DAI Balance: ${balance}`} />
      </>
    </Card>
  );
};

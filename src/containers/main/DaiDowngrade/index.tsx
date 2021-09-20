import React, { useState, ChangeEvent, useCallback } from 'react';
import { DowngradeForm } from 'components/main/DowngradeForm';
import { Card } from 'components/layout/Card';
import { useDispatch } from 'react-redux';
import { daiDownGrade } from 'store/main/actionCreators';
import { BalanceText } from 'components/common/BalanceText';
import { useToasts } from 'hooks/useToast';

type Props = {
  balance?: string;
  isLoading?: boolean;
};

export const DaiDowngrade: React.FC<Props> = ({
  balance = '',
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

  const handleClick = useCallback(() => {
    if (!dai || Number(dai) <= 0) {
      return setError('Enter positive value');
    }
    if (Number(dai) > Number(balance)) {
      return setError('Low balance');
    }
    dispatch(daiDownGrade(dai, callback));
  }, [dispatch, dai]);

  return (
    <Card title="Downgrade DAIx to DAI" isLoading={isLoading}>
      <>
        <DowngradeForm
          value={dai}
          onChange={handleChange}
          onClick={handleClick}
          error={error}
        />
        <BalanceText text={`Your DAIx Balance: ${balance}`} />
      </>
    </Card>
  );
};

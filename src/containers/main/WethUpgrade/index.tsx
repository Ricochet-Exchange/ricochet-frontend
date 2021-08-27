import React, {
  useState, useCallback, ChangeEvent, 
} from 'react';
import { Card } from 'components/layout/Card';
import { UpgradeForm } from 'components/main/UpgradeForm';
import { useDispatch } from 'react-redux';
import { wethApprove, wethUpgrade } from 'store/main/actionCreators';
import { BalanceText } from 'components/common/BalanceText';
import { useToasts } from 'hooks/useToast';

type Props = {
  balance?: string;
  isLoading?: boolean;
  hasWethApprove?: boolean;
};

export const WethUpgrade: React.FC<Props> = ({
  isLoading,
  balance = '',
  hasWethApprove, 
}) => {
  const { showErrorToast } = useToasts();
  const [weth, setWeth] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const callback = useCallback((e?: string) => {
    setWeth('');
    if (e) {
      showErrorToast(e, 'Error');
    }
  }, [setWeth]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (error) { 
      setError('');
    }
    setWeth(e.target.value);
  };

  const handleonApprove = useCallback(() => { 
    if (!weth || Number(weth) <= 0) {
      return setError('Enter positive value');
    }
    dispatch(wethApprove(weth, callback));
  }, [dispatch, weth, callback, hasWethApprove]);

  const handleonUpgrade = useCallback(() => {
    if (!weth || Number(weth) <= 0) {
      return setError('Enter positive value');
    }
    if (Number(weth) > Number(balance)) {
      return setError('Low balance');
    }
    dispatch(wethUpgrade(weth, callback));
  }, [dispatch, weth, callback]);
  
  return (      
    <Card title="Upgrade ETH to ETHx" isLoading={isLoading}>
      <>
        <UpgradeForm 
          value={weth}
          onChange={handleChange}
          onApprove={handleonApprove}
          onUpgrade={handleonUpgrade}
          disabledApprove={hasWethApprove}
          disabledUpgrade={!hasWethApprove}
          error={error}
        />
        <BalanceText text={`Your ETH Balance: ${balance}`} />
      </>
    </Card>
  ); 
};

import React, {
  useState, useCallback, 
} from 'react';
import { Card } from 'components/layout/Card';
import { UpgradeForm } from 'components/main/UpgradeForm';
import { useDispatch } from 'react-redux';
import { wethApprove, wethUpgrade } from 'store/main/actionCreators';
import { BalanceText } from 'components/common/BalanceText';
import { useToasts } from 'hooks/useToast';
import { trimPad } from 'utils/balances';

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

  const handleAmount = (amount: string) => {
    if (error) {
      setError('');
    }
    setWeth(amount);
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
          onAmount={handleAmount}
          onApprove={handleonApprove}
          onUpgrade={handleonUpgrade}
          disabledApprove={hasWethApprove}
          disabledUpgrade={!hasWethApprove}
          error={error}
          balance={balance}
        />
        <BalanceText text={`Your ETH Balance: ${trimPad(balance, 6)}`} />
      </>
    </Card>
  ); 
};

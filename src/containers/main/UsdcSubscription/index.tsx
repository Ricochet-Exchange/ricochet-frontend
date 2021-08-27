import React, { useCallback } from 'react';
import { Card } from 'components/layout/Card';
import { Button } from 'components/common/Button';
import cx from 'classnames';
import { useDispatch } from 'react-redux';
import { usdcWethSubscription } from 'store/main/actionCreators';
import styles from './styles.module.scss';

type Props = {
  isLoading?: boolean;
};

export const UsdcSubscription: React.FC<Props> = ({ isLoading }) => {
  const dispatch = useDispatch();

  const handleUsdcSubscription = useCallback(() => {
    dispatch(usdcWethSubscription());
  }, [dispatch]);

  return (
    <Card title="Approve USDCx Subscription" isLoading={isLoading}>
      <Button
        onClick={handleUsdcSubscription}
        label="Approve USDCx Subscription"
        className={cx(styles.button, styles.button_margin)}
      />
    </Card>
  );
};

import React, { useCallback } from 'react';
import { Card } from 'components/layout/Card';
import { Button } from 'components/common/Button';
import cx from 'classnames';
import { useDispatch } from 'react-redux';
import { wethSubscription } from 'store/main/actionCreators';
import styles from './styles.module.scss';

export const WethSubscription: React.FC = () => {
  const dispatch = useDispatch();

  const handleDaiSubscription = useCallback(() => {
    dispatch(wethSubscription());
  }, [dispatch]);

  return (
    <Card title="Approve ETHx Subscription">
      <Button
        onClick={handleDaiSubscription}
        label="Approve ETHx Subscription" 
        className={cx(styles.button, styles.button_margin)}
      />
    </Card>
  ); 
};

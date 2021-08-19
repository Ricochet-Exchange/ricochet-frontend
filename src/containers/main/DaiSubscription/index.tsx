import React, { useCallback } from 'react';
import { Card } from 'components/layout/Card';
import { Button } from 'components/common/Button';
import cx from 'classnames';
import { useDispatch } from 'react-redux';
import { daiSubscription } from 'store/main/actionCreators';
import styles from './styles.module.scss';

export const DaiSubscription: React.FC = () => {
  const dispatch = useDispatch();

  const handleDaiSubscription = useCallback(() => {
    dispatch(daiSubscription());
  }, [dispatch]);

  return (
    <Card title="Approve DAIx Subscription">
      <Button
        onClick={handleDaiSubscription}
        label="Approve DAIx Subscription" 
        className={cx(styles.button, styles.button_margin)}
      />
    </Card>
  ); 
};

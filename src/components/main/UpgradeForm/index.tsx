import React, { ChangeEvent } from 'react';
import { Button } from 'components/common/Button';
import { Input } from 'components/common/Input';
import styles from './styles.module.scss';

type Props = {
  disabledApprove?: boolean;
  disabledUpgrade?: boolean;
  value: string;
  error?: string;
  onUpgrade: () => void;
  onApprove: () => void;
  onChange: (e:ChangeEvent<HTMLInputElement>) => void;
};

export const UpgradeForm: React.FC<Props> = ({
  value,
  disabledApprove,
  disabledUpgrade,
  error,
  onUpgrade,
  onApprove, 
  onChange,
}) => (
  <>
    <div className={styles.error}>{error}</div>
    <div className={styles.form}>
      <Input
        placeholder="Amount"
        value={value}
        onChange={onChange}
        className={styles.input}
        error={!!error}
      />
      <Button 
        label={disabledApprove ? 'Approved' : 'Approve'} 
        onClick={onApprove} 
        className={styles.button}
        disabled={disabledApprove}
      />
      <Button 
        label="Upgrade" 
        onClick={onUpgrade}
        className={styles.button}
        disabled={disabledUpgrade}
      />
    </div>
  </>
);

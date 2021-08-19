import React, { ChangeEvent } from 'react';
import { Button } from 'components/common/Button';
import styles from './styles.module.scss';

type Props = {
  disabledApprove?: boolean;
  disabledUpgrade?: boolean;
  value: string;
  onUpgrade: () => void;
  onApprove: () => void;
  onChange: (e:ChangeEvent<HTMLInputElement>) => void;
};

export const UpgradeForm: React.FC<Props> = ({
  value,
  disabledApprove,
  disabledUpgrade,
  onUpgrade,
  onApprove, 
  onChange,
}) => (
  <>
    <div className={styles.form}>
      <input
        type="number"
        className={styles.input}
        placeholder="Amount"
        value={value}
        onChange={onChange}
      />
      <Button 
        label="Approve" 
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

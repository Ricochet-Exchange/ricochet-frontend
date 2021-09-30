import React, { ChangeEvent, useState } from 'react';
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
  onAmount: (amount: string) => void;
  balance: string;
};

export const UpgradeForm: React.FC<Props> = ({
  value,
  disabledApprove,
  disabledUpgrade,
  error,
  onUpgrade,
  onApprove, 
  onAmount,
  balance,
}) => {
  const [maxed, setMaxed] = useState<boolean>(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMaxed(false);
    onAmount(e.target.value);
  };
  const handleMaxAmountClick = () => {
    setMaxed(true);
    onAmount(balance);
  };
  return (
    <>
      <div className={styles.error}>{error}</div>
      <div className={styles.form}>
        <Input
          placeholder="Amount"
          value={value}
          onChange={handleChange}
          className={styles.input}
          error={!!error}
        />
        <Button
          disabled={maxed}
          presentation="link"
          onClick={handleMaxAmountClick} 
          label="MAX"
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
};

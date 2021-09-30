import React, { ChangeEvent, useState } from 'react';
import { Button } from 'components/common/Button';
import { Input } from 'components/common/Input';
import styles from './styles.module.scss';
import WarningIcon from '../../../assets/images/error_circle_warning_icon.svg';

type Props = {
  value: string;
  error?: string;
  onClick: () => void;
  onAmount: (amount: string) => void;
  balance: string;
};

export const DowngradeForm: React.FC<Props> = ({
  onClick, 
  onAmount,
  value,
  error,
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
          className={styles.input}
          placeholder="Amount"
          value={value}
          onChange={handleChange}
          error={!!error}
        />
        <Button
          disabled={maxed}
          presentation="link"
          onClick={handleMaxAmountClick} 
          label="MAX"
        />
        <Button 
          label="Downgrade" 
          onClick={onClick} 
          className={styles.button}
        />
        {maxed && (
        <div className={styles['warning-alert']}>
          <img src={WarningIcon} alt="Warning" />
          Alert: if you are currently streaming with this token, 
          downgrading your entire balance puts you at risk of liquidation.
        </div>
        )}
      </div>
    </>
  );
};

import React, { ChangeEvent } from 'react';
import { Button } from 'components/common/Button';
import { Input } from 'components/common/Input';
import styles from './styles.module.scss';

type Props = {
  value: string;
  error?: string;
  onClick: () => void;
  onChange?: (e:ChangeEvent<HTMLInputElement>) => void;
};

export const DowngradeForm: React.FC<Props> = ({
  onClick, 
  onChange,
  value,
  error,
}) => (
  <>
    <div className={styles.error}>{error}</div>
    <div className={styles.form}>
      <Input
        className={styles.input}
        placeholder="Amount"
        value={value}
        onChange={onChange}
        error={!!error}
      />
      <Button 
        label="Downgrade" 
        onClick={onClick} 
        className={styles.button}
      />
    </div>
  </>
);

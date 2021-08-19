import React, { ChangeEvent } from 'react';
import { Button } from 'components/common/Button';
import styles from './styles.module.scss';

type Props = {
  value: string;
  onClick: () => void;
  onChange?: (e:ChangeEvent<HTMLInputElement>) => void;
};

export const DowngradeForm: React.FC<Props> = ({
  onClick, 
  onChange,
  value,
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
        label="Downgrade" 
        onClick={onClick} 
        className={styles.button}
      />
    </div>
  </>
);

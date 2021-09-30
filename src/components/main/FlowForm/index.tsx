import React, { ChangeEvent } from 'react';
import { Button } from 'components/common/Button';
import { Input } from 'components/common/Input';
import { trimPad } from 'utils/balances';
import styles from './styles.module.scss';

type Props = {
  onStart: () => void;
  onStop: () => void;
  onChange?: (e:ChangeEvent<HTMLInputElement>) => void;
  balance?: string;
  token: string;
  flowsOwned?: string;
  totalFlows?: number;
  value: string;
  error?: string;
  placeholder?: string;
};

export const FlowForm: React.FC<Props> = ({
  onStart, onStop, balance = '', token,
  totalFlows = '', flowsOwned = '',
  value,
  onChange,
  error,
  placeholder = '-',
}) => (
  <>
    <div className={styles.balance}>
      {`Your Balance: ${trimPad(balance, 6)} ${token}`}
    </div>
    <div className={styles.error}>{error}</div>
    <div className={styles.form}>
      <Input
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        error={!!error}
      />
      <Button
        label="Start/Edit"
        onClick={onStart}
        className={styles.button}
      />
      <Button
        label="Stop"
        className={styles.button}
        onClick={onStop}
      />
    </div>
    <div className={styles.subscription}>
      {`${token}/month`}
    </div>
    <p className={styles.balance_text}>
      <span>Total Value Streaming:</span>
      <span className={styles.black}>{` ${flowsOwned} `}</span>
      <span>{`${token}/month`}</span>
    </p>
    <p className={styles.balance_text}>
      <span>Total Streams:</span>
      <span className={styles.black}>{` ${totalFlows}`}</span>
    </p>
  </>
);

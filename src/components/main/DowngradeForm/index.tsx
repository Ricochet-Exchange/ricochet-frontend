import React, { ChangeEvent, useState } from 'react';
import { Button } from 'components/common/Button';
import { Input } from 'components/common/Input';
import web3 from 'utils/web3instance';
import styles from './styles.module.scss';

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
  const [absoluteMax, setAbsoluteMax] = useState<boolean>(false);
  const [maxed, setMaxed] = useState<boolean>(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAbsoluteMax(false);
    setMaxed(false);
    onAmount(e.target.value);
  };
  const handleMaxAmountClick = () => {
    setAbsoluteMax((prev) => {
      if (prev === true) {
        setMaxed(true);
        // full balance
        onAmount(balance);
      } else {
        // partial balance
        const balanceBN = web3.utils.toBN(web3.utils.toWei(balance));
        const percent = balanceBN.div(web3.utils.toBN(100));
        const amount = web3.utils.fromWei(percent.mul(web3.utils.toBN(99)));
        onAmount(amount);
      }
      return true;
    });
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
          label={absoluteMax ? 'MAX(100%)' : 'MAX(99%)'}
          title="Downgrade 99% or 100% of your balance (May result in error if there is an outgoing stream)."
        />
        <Button 
          label="Downgrade" 
          onClick={onClick} 
          className={styles.button}
        />
      </div>
    </>
  );
};

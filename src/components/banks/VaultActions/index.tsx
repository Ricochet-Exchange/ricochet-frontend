import React, { FC, MouseEvent } from 'react';
import cx from 'classnames';
import { Button } from 'components/common/Button';

import styles from './styles.module.scss';

type Props = {
  className?: string,
  section: string,
  activeTransaction: string,
  onClick: (e: MouseEvent) => void,
  transactionHash: string,
};

export const VaultActions: FC<Props> = ({
  className,
  section,
  activeTransaction,
  onClick,
  transactionHash,
}) => (
  // can use activeTransaction to set a class on active state
  <div className={cx(styles.VaultActions, className)}>
    {section === 'locked' ? (
      <>
        <Button
          label="withdraw"
          id="withdraw"
          className={styles.button}
          disabled={Boolean(transactionHash || activeTransaction)}
          onClick={onClick}
        />
        <Button
          label="deposit"
          id="deposit"
          className={styles.button}
          disabled={Boolean(transactionHash || activeTransaction)}
          onClick={onClick}
        />
      </>
    ) : (
      <>
        <Button
          label="borrow"
          id="borrow"
          className={styles.button}
          disabled={Boolean(transactionHash || activeTransaction)}
          onClick={onClick}
        />
        <Button
          label="repay"
          id="repay"
          className={styles.button}
          disabled={Boolean(transactionHash || activeTransaction)}
          onClick={onClick}
        />
      </>
    )}
  </div>
);

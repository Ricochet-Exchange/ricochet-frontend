import React, { FC, MouseEvent } from 'react';
import cx from 'classnames';
import { Button } from 'components/common/Button';
import { useTranslation } from 'i18n';
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
}) => {
  const { t } = useTranslation('main');
  return (
    // can use activeTransaction to set a class on active state
    <div className={cx(styles.VaultActions, className)}>
      {section === 'locked' ? (
        <>
          <Button
            label={t('Withdraw')}
            id="withdraw"
            className={styles.button}
            disabled={Boolean(transactionHash || activeTransaction)}
            onClick={onClick}
          />
          <Button
            label={t('Deposit')}
            id="deposit"
            className={styles.button}
            disabled={Boolean(transactionHash || activeTransaction)}
            onClick={onClick}
          />
        </>
      ) : (
        <>
          <Button
            label={t('Borrow')}
            id="borrow"
            className={styles.button}
            disabled={Boolean(transactionHash || activeTransaction)}
            onClick={onClick}
          />
          <Button
            label={t('Repay')}
            id="repay"
            className={styles.button}
            disabled={Boolean(transactionHash || activeTransaction)}
            onClick={onClick}
          />
        </>
      )}
    </div>
  );
};

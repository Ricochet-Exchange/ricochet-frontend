import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { TokenType } from 'store/banks/types';

import styles from './styles.module.scss';

type Props = {
  vault?: boolean,
  coll?: boolean,
  debtToken: TokenType,
  collateralToken: TokenType,
};

export const BankStatusBar: FC<Props> = ({
  vault, coll, collateralToken, debtToken,
}) => {
  const granularity = 1000000;
  const { t } = useTranslation();

  return (
    <>
      {vault
        ? (
          <>
            {coll
              ? (
                <div className={styles.vaultDetail}>
                  <p className={styles.title}>
                    {`${collateralToken.symbol} ${t('Price')} (USD)`}
                  </p>
                  <h3 className={styles.value}>
                    {`${+collateralToken.price / granularity} $`}
                  </h3>
                </div>
              ) : (
                <div className={styles.vaultDetail}>
                  <p className={styles.title}>
                    {`${debtToken.symbol} ${t('Price')} (USD)`}
                  </p>
                  <h3 className={styles.value}>
                    {`${+debtToken.price / granularity} $`}
                  </h3>
                </div>
              )}
          </>
        ) : (
          <>
            <div className={styles.bankDetail}>
              <p className={styles.title}>
                {`${collateralToken.symbol} ${t('Price')} (USD)`}
              </p>
              <h3 className={styles.value}>
                {`${+collateralToken.price / granularity} $`}
              </h3>
            </div>
            <div className={styles.bankDetail}>
              <p className={styles.title}>
                {`${debtToken.symbol} ${t('Price')} (USD)`}
              </p>
              <h3 className={styles.value}>
                {`${+debtToken.price / granularity} $`}
              </h3>
            </div>
          </>
        )}
    </>
  );
};

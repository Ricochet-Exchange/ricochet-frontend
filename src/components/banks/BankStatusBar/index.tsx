import React, { FC } from 'react';
import { TokenType } from 'store/banks/types';

import './styles.scss';

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

  return (
    <>
      {vault
        ? (
          <>
            {coll
              ? (
                <div className="VaultDetail">
                  <p>
                    {`${collateralToken.symbol} Price (USD)`}
                  </p>
                  <h3>
                    {`${+collateralToken.price / granularity} $`}
                  </h3>
                </div>
              ) : (
                <div className="VaultDetail">
                  <p>
                    {`${debtToken.symbol} Price (USD)`}
                  </p>
                  <h3>
                    {`${+debtToken.price / granularity} $`}
                  </h3>
                </div>
              )}
          </>
        ) : (
          <>
            <div className="BankDetail">
              <p>
                {`${collateralToken.symbol} Price (USD)`}
              </p>
              <h3>
                {`${+collateralToken.price / granularity} $`}
              </h3>
            </div>
            <div className="BankDetail">
              <p>
                {`${debtToken.symbol} Price (USD)`}
              </p>
              <h3>
                {`${+debtToken.price / granularity} $`}
              </h3>
            </div>
          </>
        )}
    </>
  );
};

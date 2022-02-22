import React, { FC, useCallback, useState } from 'react';
import { disablePageScroll, enablePageScroll } from 'scroll-lock';
import { SignInButton } from 'components/banks/SignInButton';
import { Button } from 'components/common/Button';
import { BankType } from 'store/banks/types';
import { ModalCreateVaultContainer } from 'containers/main/ModalCreateVaultContainer';
import { Coin, iconsCoin } from 'constants/coins';
import { FontIcon, FontIconName } from 'components/common/FontIcon';
import styles from './styles.module.scss';

type Props = {
  bank: BankType;
  accountAddress: string;
  handleSignIn: () => void;
};

export const BankDetails: FC<Props> = ({
  bank,
  accountAddress,
  handleSignIn,
}) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const handleOnCloseModal = useCallback(() => {
    setVisibleModal(false);
    enablePageScroll();
  }, [setVisibleModal]);

  const handleVisionModal = useCallback(() => {
    setVisibleModal(true);
    disablePageScroll();
  }, [setVisibleModal]);

  return (
    <>
      <tr className={styles.bankDetails}>
        <td>
          <h3>{bank.name}</h3>
        </td>
        <td>
          <div className={styles.priceWithIcon}>
            <img
              src={iconsCoin[bank.debtToken.symbol as Coin]}
              alt={bank.debtToken.symbol}
            />
            <h3>{(+bank.reserveBalance / 1e18).toFixed()}</h3>
          </div>
        </td>
        <td>
          <div className={styles.priceWithIcon}>
            <img
              src={iconsCoin[bank.collateralToken.symbol as Coin]}
              alt={bank.collateralToken.symbol}
            />
            <h3>{`${+bank.collateralToken.price / 1000000} $`}</h3>
          </div>
        </td>
        <td>
          <div className={styles.priceWithIcon}>
            <img
              src={iconsCoin[bank.debtToken.symbol as Coin]}
              alt={bank.debtToken.symbol}
            />
            <h3>{`${+bank.debtToken.price / 1000000} $`}</h3>
          </div>
        </td>
        <td>
          <h3>{`${+bank.interestRate / 100} %`}</h3>
        </td>
        <td>
          <h3>{`${+bank.originationFee / 100} %`}</h3>
        </td>
        <td>
          <h3>{`${bank.collateralizationRatio} %`}</h3>
        </td>
        <td>
          <h3>{`${bank.liquidationPenalty} %`}</h3>
        </td>
        <td>
          {accountAddress ? (
            <>
              {!bank.vault.hasVault ? (
                <Button
                  label=""
                  className={styles.button}
                  onClick={handleVisionModal}
                >
                  <FontIcon name={FontIconName.Plus} size={12} />
                </Button>
              ) : null}
            </>
          ) : (
            <SignInButton onClick={handleSignIn} />
          )}
        </td>
      </tr>

      <ModalCreateVaultContainer
        bank={bank}
        onCloseModal={handleOnCloseModal}
        visibleModal={visibleModal}
      />
    </>
  );
};

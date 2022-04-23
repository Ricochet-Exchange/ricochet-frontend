import React, { FC, useCallback, useState } from 'react';
import { disablePageScroll, enablePageScroll } from 'scroll-lock';
import { SignInButton } from 'components/banks/SignInButton';
import { Button } from 'components/common/Button';
import { BankType } from 'store/banks/types';
import { getAddressLink } from 'utils/getAddressLink';
import { AddressLink } from 'components/common/AddressLink';
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

  const link = getAddressLink(bank.bankAddress);

  const handleVisionModal = useCallback(() => {
    setVisibleModal(true);
    disablePageScroll();
  }, [setVisibleModal]);

  function formatter(num: any, digits: number) {
    const lookup = [
      { value: 1, symbol: '' },
      { value: 1e3, symbol: 'K' },
      { value: 1e6, symbol: 'M' },
      { value: 1e9, symbol: 'G' },
      { value: 1e12, symbol: 'T' },
      { value: 1e15, symbol: 'P' },
      { value: 1e18, symbol: 'E' },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    // eslint-disable-next-line
    let item = lookup.slice().reverse().find(function (item) {
      return num >= item.value;
    });
    return item ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol : num.toFixed(digits);
  }

  return (
    <>
      <tr className={styles.bankDetails}>
        <td>
          <div className={styles.bankText}>
            <h3 className={styles.bankName}>{bank.name}</h3>
            <AddressLink addressLink={link} />
          </div>
        </td>
        <td>
          <div className={styles.priceWithIcon}>
            <img
              src={iconsCoin[bank.debtToken.symbol as Coin]}
              alt={bank.debtToken.symbol}
            />
            <h3>{formatter((+bank.reserveBalance / 1e18), 2)}</h3>
          </div>
        </td>
        <td>
          <div className={styles.priceWithIcon}>
            <img
              src={iconsCoin[bank.collateralToken.symbol as Coin]}
              alt={bank.collateralToken.symbol}
            />
            <h3>{`${formatter((+bank.collateralToken.price / 1000000), 2)} $`}</h3>
          </div>
        </td>
        <td>
          <div className={styles.priceWithIcon}>
            <img
              src={iconsCoin[bank.debtToken.symbol as Coin]}
              alt={bank.debtToken.symbol}
            />
            <h3>{`${formatter((+bank.debtToken.price / 1000000), 2)} $`}</h3>
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

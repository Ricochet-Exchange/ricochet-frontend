import React, { FC, useCallback, useState } from 'react';
import { disablePageScroll, enablePageScroll } from 'scroll-lock';
import cx from 'classnames';
import { truncateAddr } from 'utils/helpers';
import { SignInButton } from 'components/banks/SignInButton';
import { EtherscanLink } from 'components/banks/EtherScanLink';
import { Button } from 'components/common/Button';
import { BankStatusBar } from 'components/banks/BankStatusBar';
import { BankType } from 'store/banks/types';
import { ModalCreateVaultContainer } from 'containers/main/ModalCreateVaultContainer';
import styles from './styles.module.scss';

type Props = {
  bank: BankType,
  accountAddress: string,
  handleSignIn: () => void,
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
      <div className={styles.bankDetails}>
        <div className={styles.bankDetails__header}>
          <div className={styles.column_header}>
            <h2 className={styles.bankName}>{bank.name}</h2>
            <p className={styles.address}>{truncateAddr(bank.bankAddress)}</p>
            <EtherscanLink className={styles.etherLink} path="address" hash={bank.bankAddress} />
          </div>
          {accountAddress ? (
            <>
              {!bank.vault.hasVault ? (
                <Button
                  label="+ create vault"
                  className={styles.button}
                  onClick={handleVisionModal}
                />
              ) : null}
            </>
          ) : (
            <SignInButton
              onClick={handleSignIn}
            />
          )}
        </div>

        <div className={styles.bankDetails__content}>
          
          <div className={styles.bankDetail_firstColumn}>
            <div className={cx(styles.bankDetail, styles.flexer)}>
              <p className={styles.text}>Available for borrow</p>
              <div className={styles.bigDetail}>
                <h1 className={styles.balance}>{(+bank.reserveBalance / 1e18).toFixed()}</h1>
                <h3 className={styles.symbol}>{bank.debtToken.symbol}</h3>
              </div>
            </div>
          </div>
          <div className={styles.bankDetail_secondColumn}> 
            <div className={styles.bankDetails__columns}>
              <BankStatusBar debtToken={bank.debtToken} collateralToken={bank.collateralToken} />
            </div>
            <div className={styles.bankDetails__columns}>
              <div className={styles.bankDetail}>
                <p className={styles.text}>Interest Rate</p>
                <h3 className={styles.value}>
                  {`${+bank.interestRate / 100} %`}
                </h3>
              </div>
              <div className={styles.bankDetail}>
                <p className={styles.text}>Origination Fee</p>
                <h3 className={styles.value}>
                  {`${+bank.originationFee / 100} %`}
                </h3>
              </div>
            </div>

            <div className={styles.bankDetails__columns}>
              <div className={styles.bankDetail}>
                <p className={styles.text}>Collateralization Ratio</p>
                <h3 className={styles.value}>
                  {`${bank.collateralizationRatio} %`}
                </h3>
              </div>
              <div className={styles.bankDetail}>
                <p className={styles.text}>Liquidation Penalty</p>
                <h3 className={styles.value}>
                  {`${bank.liquidationPenalty} %`}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ModalCreateVaultContainer
        bank={bank}
        onCloseModal={handleOnCloseModal}
        visibleModal={visibleModal}
      />
    </>
  );
};

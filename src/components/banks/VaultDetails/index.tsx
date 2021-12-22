import React, { FC, MouseEvent } from 'react';
import cx from 'classnames';
import { VaultActions } from 'components/banks/VaultActions';
import { truncateAddr, getVaultCalcValues } from 'utils/helpers';
import { BankStatusBar } from 'components/banks/BankStatusBar';
import { BankType } from 'store/banks/types';
import { VaultTransactionContainer } from 'containers/main/VaultTransactionContainer';
import { FontIcon, FontIconName } from 'components/common/FontIcon';
import styles from './styles.module.scss';

type Props = {
  bank: BankType,
  activeTransaction: string,
  transactionHash: string,
  onClick: (e: MouseEvent) => void,
  setActiveTransaction: (transaction: string) => void,
  setTransactionHash: (transactionHash: string) => void,
};

export const VaultDetails: FC<Props> = ({
  bank,
  activeTransaction,
  transactionHash,
  onClick,
  setActiveTransaction,
  setTransactionHash,
}) => {
  const vaultCalcValues = getVaultCalcValues(bank);

  return (
    <div className={styles.VaultDetails}>
      <div className={styles.VaultDetails__header}>
        <div className={styles.header_column}>
          <div className={cx(styles.VaultDetails__Column, styles.collrat)}>
            <p>Collateralization Ratio</p>
            <div className={cx(styles.BigDetail, styles.collateralPrice)}>
              <h1 className={styles.tellorgreen}>
                {+bank.vault.collateralizationRatio / 100}
              </h1>
              <h3 className={styles.tellorgreen}>%</h3>
            </div>
          </div>
          <div className={styles.VaultDetails__Column}>
            <div className={styles.VaultDetail}>
              <p>Liquidation Price</p>
              <div className={cx(styles.BigDetail, styles.liqprice)}>
                <h1>{vaultCalcValues.liquidationPrice.toFixed(2)}</h1>
                <h3>
                  {bank.collateralToken.symbol}
                  /USD
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.VaultDetails__Bank}>
          <p>This vault is part of</p>
          <div className={styles.BankData}>
            <div className={styles.BankDataTxt}>
              <p className={styles.BankName}>{bank.name}</p>
              <p>{truncateAddr(bank.bankAddress)}</p>
            </div>
            <FontIcon
              className={styles.bankIcon}
              name={FontIconName.Bank}
              size={26}
            />
          </div>
        </div>
      </div>

      <div className={cx(styles.VaultDetails__content, styles.firstrow)}>
        <div className={styles.VaultDetails__Column}>
          <div className={styles.VaultDetail}>
            <p>Total Collateral Locked</p>
            <h3>
              {(+bank.vault.collateralAmount / 1e18).toFixed(4)}
              {' '}
              {bank.collateralToken.symbol}
            </h3>
          </div>
        </div>
        <div className={styles.VaultDetails__Column}>
          <div className={styles.VaultDetail}>
            <p>Available to withdraw</p>
            <h3>
              {vaultCalcValues.withdrawAvailable.toFixed(4)}
              {' '}
              {bank.collateralToken.symbol}
            </h3>
          </div>
        </div>
        <div className={cx(styles.VaultDetails__Column, styles.flexer)}>
          <BankStatusBar
            vault
            coll
            debtToken={bank.debtToken}
            collateralToken={bank.collateralToken}
          />
        </div>
        <VaultActions
          section="locked"
          activeTransaction={activeTransaction}
          onClick={onClick}
          transactionHash={transactionHash}
        />
      </div>

      <div className={styles.VaultDetails__content}>
        <div className={styles.VaultDetails__Column}>
          <div className={styles.VaultDetail}>
            <p>Total Debt Owed</p>
            <h3>
              {(+bank.vault.debtAmount / 1e18).toFixed(4)}
              {' '}
              {bank.debtToken.symbol}
            </h3>
          </div>
        </div>
        <div className={styles.VaultDetails__Column}>
          <div className={styles.VaultDetail}>
            <p>Available to borrow</p>
            <h3>
              {vaultCalcValues.borrowAvailable > +bank.reserveBalance ?
                (+bank.reserveBalance / 1e18).toFixed()
                : vaultCalcValues.borrowAvailable.toFixed(4)}
              {' '}
              {bank.debtToken.symbol}
            </h3>
          </div>
        </div>
        <div className={cx(styles.VaultDetails__Column, styles.flexer)}>
          <BankStatusBar
            vault
            debtToken={bank.debtToken}
            collateralToken={bank.collateralToken}
          />
        </div>
        <VaultActions
          section="borrow"
          activeTransaction={activeTransaction}
          onClick={onClick}
          transactionHash={transactionHash}
        />
      </div>
      {activeTransaction ? (
        <VaultTransactionContainer
          activeTransaction={activeTransaction}
          setActiveTransaction={setActiveTransaction}
          transactionHash={transactionHash}
          setTransactionHash={setTransactionHash}
          bank={bank}
        />
      ) : null}
    </div>
  );
};

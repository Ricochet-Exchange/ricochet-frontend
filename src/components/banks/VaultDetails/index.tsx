import React, { FC, MouseEvent } from 'react';

import { VaultActions } from 'components/banks/VaultActions';
import Icons from 'assets/icons/Icons';
import { truncateAddr, getVaultCalcValues } from 'utils/helpers';
import { BankStatusBar } from 'components/banks/BankStatusBar';
import { BankType } from 'store/banks/types';
import { VaultTransactionContainer } from 'containers/main/VaultTransactionContainer';
import './VaultDetails.scss';

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
    <div className="VaultDetails">
      <div className="VaultDetails__header">
        <div className="VaultDetails__Column collrat">
          <p>Collateralization Ratio</p>
          <div className="BigDetail">
            <h1 className="tellorgreen">
              {+bank.vault.collateralizationRatio / 100}
            </h1>
            <h3 className="tellorgreen">%</h3>
          </div>
        </div>
        <div className="VaultDetails__Column">
          <div className="VaultDetail">
            <p>Liquidation Price</p>
            <div className="BigDetail liqprice">
              <h1>{vaultCalcValues.liquidationPrice.toFixed(2)}</h1>
              <h3>
                {bank.collateralToken.symbol}
                /USD
              </h3>
            </div>
          </div>
        </div>
        <div className="VaultDetails__Bank">
          <p>This vault is part of</p>
          <div className="BankData">
            <div className="BankDataTxt">
              <p className="BankName">{bank.name}</p>
              <p>{truncateAddr(bank.bankAddress)}</p>
            </div>
            <Icons.Bank fill="#848484" />
          </div>
        </div>
      </div>

      <div className="VaultDetails__content firstrow">
        <div className="VaultDetails__Column">
          <div className="VaultDetail">
            <p>Total Collateral Locked</p>
            <h3>
              {(+bank.vault.collateralAmount / 1e18).toFixed(4)}
              {' '}
              {bank.collateralToken.symbol}
            </h3>
          </div>
        </div>
        <div className="VaultDetails__Column">
          <div className="VaultDetail">
            <p>Available to withdraw</p>
            <h3>
              {vaultCalcValues.withdrawAvailable.toFixed(4)}
              {' '}
              {bank.collateralToken.symbol}
            </h3>
          </div>
        </div>
        <div className="VaultDetails__Column flexer">
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

      <div className="VaultDetails__content">
        <div className="VaultDetails__Column">
          <div className="VaultDetail">
            <p>Total Debt Owed</p>
            <h3>
              {(+bank.vault.debtAmount / 1e18).toFixed(4)}
              {' '}
              {bank.debtToken.symbol}
            </h3>
          </div>
        </div>
        <div className="VaultDetails__Column">
          <div className="VaultDetail">
            <p>Available to borrow</p>
            <h3>
              {vaultCalcValues.borrowAvailable.toFixed(4)}
              {' '}
              {bank.debtToken.symbol}
            </h3>
          </div>
        </div>
        <div className="VaultDetails__Column flexer">
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

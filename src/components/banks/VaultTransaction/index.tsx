import React, { FC, ChangeEvent } from 'react';
import { Button, Input } from 'antd';
import { getVaultTxCalcValues } from 'utils/helpers';
import { EtherscanLink } from 'components/banks/EtherScanLink';
import { ApproveToken } from 'components/banks/ApproveToken';

import { LoadingWrapper } from 'components/common/LoadingWrapper';
import { BankType } from 'store/banks/types';
import './VaultTransaction.scss';

type Props = {
  bank: BankType,
  isLoadingTransaction: boolean,
  isLoadingApprove: boolean,
  activeTransaction: string,
  value: string,
  localApproved: boolean,
  error: string,
  transactionHash: string,
  onApproveClick: () => void,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  onMaxRepay: () => void,
  onCancel: () => void,
  onMakeAction: () => void,
};

export const VaultTransaction: FC<Props> = ({
  bank,
  isLoadingTransaction,
  isLoadingApprove,
  activeTransaction,
  value,
  localApproved,
  error,
  transactionHash,
  onApproveClick,
  onChange,
  onMaxRepay,
  onCancel,
  onMakeAction,
}) => {
  const needsRepayUnlock = () => {
    const isRepay = activeTransaction === 'repay';
    const needsApproval =
      +bank.debtToken.unlockedAmount === 0 ||
      +value > +bank.debtToken.unlockedAmount;
    return isRepay && needsApproval && !localApproved;
  };

  const isCollateral =
    activeTransaction === 'withdraw' || activeTransaction === 'deposit';

  const vaultTxCalcValues = getVaultTxCalcValues(
    bank,
    activeTransaction,
    value,
  );
  
  return (
    <div className="VaultTransaction">
      <LoadingWrapper
        isLoading={isLoadingTransaction}
        className="fullframe"
        classNameLoader="loader"
      >
        <>
          <div className="VaultTransaction__preview">
            <div className="VaultDetail">
              <p>New collateralization ratio</p>
              <h3>
                {vaultTxCalcValues.newCollateralizationRatio === Infinity
                  ? ''
                  : vaultTxCalcValues.newCollateralizationRatio.toFixed(2)}
                {' '}
                %
              </h3>
            </div>
            <div className="VaultDetail">
              <p>New liquidation price</p>
              <h3>
                {vaultTxCalcValues.newLiquidationPrice.toFixed(4)}
                {' '}
                {bank.collateralToken.symbol}
                /USD
              </h3>
            </div>
          </div>
          <div className="VaultTransaction__form__Total">
            <div className="VaultTransaction__form">
              {needsRepayUnlock() ? (
                <>
                  <p>Please give allowance for your repay to continue.</p>
                  <ApproveToken
                    isLoadingApprove={isLoadingApprove}
                    onApproveClick={onApproveClick}
                  />
                </>
              ) : (
                <>
                  <p>
                    How much
                    {' '}
                    {isCollateral
                      ? bank.collateralToken.symbol
                      : bank.debtToken.symbol}
                    {' '}
                    {`do you wish to ${activeTransaction}?`}
                  </p>

                  <Input
                    type="number"
                    size="large"
                    value={value}
                    onChange={onChange}
                    addonAfter={
                      isCollateral
                        ? bank.collateralToken.symbol
                        : bank.debtToken.symbol
                    }
                  />
                </>
              )}
            </div>
            <div className="VaultTransaction__buttons">
              {activeTransaction === 'repay' ? (
                <Button type="link" onClick={onMaxRepay}>
                  repay max
                </Button>
              ) : null}
              <Button type="link" onClick={onCancel}>
                cancel
              </Button>
              <Button
                type="primary"
                shape="round"
                size="large"
                className="purplebutton"
                onClick={onMakeAction}
                disabled={!value}
              >
                {activeTransaction}
              </Button>
            </div>
          </div>

          {error ? (
            <div>
              <p>{error}</p>
            </div>
          ) : null}
        </>
      </LoadingWrapper>
      {transactionHash ? <EtherscanLink path="tx" hash={transactionHash} /> : null}
    </div>
  );
};

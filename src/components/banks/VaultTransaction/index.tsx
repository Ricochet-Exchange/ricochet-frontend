import React, { FC, ChangeEvent } from 'react';
import { TextInput } from 'components/common/TextInput';
import { Button } from 'components/common/Button';
import { getVaultTxCalcValues } from 'utils/helpers';
import { EtherscanLink } from 'components/banks/EtherScanLink';
import { ApproveToken } from 'components/banks/ApproveToken';
import { LoadingWrapper } from 'components/common/LoadingWrapper';
import { BankType } from 'store/banks/types';
import styles from './styles.module.scss';

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
  onMaxAmount: () => void,
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
  onMaxAmount,
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
    <div className={styles.VaultTransaction}>
      <LoadingWrapper
        loadingBar
        isLoading={isLoadingTransaction}
        className={styles.fullframe}
        classNameLoader={styles.loader}
        loadingReason="This transaction is being processed, check your Metamask wallet extension and please do NOT leave or refresh this page until confirmation is complete."
      >
        <>
          <div className={styles.VaultTransaction__preview}>
            <div className={styles.VaultDetail}>
              <p>New collateralization ratio</p>
              <h3>
                {vaultTxCalcValues.newCollateralizationRatio === Infinity
                  ? ''
                  : vaultTxCalcValues.newCollateralizationRatio.toFixed(2)}
                {' '}
                %
              </h3>
            </div>
            <div className={styles.VaultDetail}>
              <p>New liquidation price</p>
              <h3>
                {vaultTxCalcValues.newLiquidationPrice.toFixed(4)}
                {' '}
                {bank.collateralToken.symbol}
                /USD
              </h3>
            </div>
          </div>
          <div className={styles.VaultTransaction__form__Total}>
            <div className={styles.VaultTransaction__form}>
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

                  <TextInput
                    type="number"
                    min="1"
                    value={value}
                    onChange={onChange}
                    right={(
                      <div className={styles.right}>
                        {isCollateral ?
                          bank.collateralToken.symbol
                          : bank.debtToken.symbol}
                      </div>
                    )}
                  />
                </>
              )}
            </div>
            <div className={styles.VaultTransaction__buttons}>
              {activeTransaction === 'repay' ? (
                <Button
                  label="Repay max"
                  disabled={activeTransaction === 'repay' && needsRepayUnlock()}
                  onClick={onMaxRepay}
                  className={styles.linkButton}
                />
              ) : null}
              <Button
                disabled={(activeTransaction === 'repay' && needsRepayUnlock())}
                label="Max"
                className={styles.linkButton}
                onClick={onMaxAmount}
              />
            </div>
            
            <Button
              label={activeTransaction}
              className={styles.actionButton}
              onClick={onMakeAction}
              disabled={!value}
            />

            <Button
              label="Cancel"
              onClick={onCancel}
              className={styles.linkButton}
            />
          </div>

          {error ? (
            <div className={styles.errorWrap}>
              <p> 
                Transactions take time to verify, please check your wallet and refresh the page.
              </p>
            </div>
          ) : null}
        </>
      </LoadingWrapper>
      {transactionHash ? <EtherscanLink path="tx" hash={transactionHash} /> : null}
    </div>
  );
};

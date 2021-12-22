import React, { ChangeEvent, FC } from 'react';
import { TextInput } from 'components/common/TextInput';
import cx from 'classnames';
import { ApproveToken } from 'components/banks/ApproveToken';
import { LoadingWrapper } from 'components/common/LoadingWrapper';
import { EtherscanLink } from 'components/banks/EtherScanLink';
import { Button } from 'components/common/Button';
import { BankType } from 'store/banks/types';
import { VaultType } from 'types/vaultType';
import styles from './styles.module.scss';

type Props = {
  bank: BankType,
  vaultData: VaultType,
  transactionHash: string,
  isLoadingSubmit: boolean,
  isLoadingApprove: boolean,
  error: string,
  localApproved: boolean,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  onSubmit: () => void,
  onApproveClick: () => void,
};

export const DepositBorrow: FC<Props> = ({
  bank,
  vaultData,
  transactionHash,
  isLoadingSubmit,
  isLoadingApprove,
  error,
  localApproved,
  onChange,
  onSubmit,
  onApproveClick,
}) => {
  const needsUnlock =
    +vaultData.depositAmount > +bank.collateralToken.unlockedAmount &&
    !localApproved;

  return (
    <>
      <LoadingWrapper
        isLoading={isLoadingSubmit}
        classNameLoader={styles.loader}
      >
        <div className={styles.createVault_steps}>
          <div className={styles.createVault_step}>
            <p className={styles.text}>
              {`How much ${vaultData.collateralToken} do you want to lock up as
              collateral?`}
            </p>
            <TextInput
              name="depositAmount"
              value={vaultData.depositAmount}
              onChange={onChange}
              right={<div className={styles.right}>{vaultData.collateralToken}</div>}
              type="number"
            />

            {needsUnlock ? (
              <>
                <p className={styles.smalltxt}>
                  Please give allowance for your collateral to continue.
                </p>
                <ApproveToken
                  onApproveClick={onApproveClick}
                  isLoadingApprove={isLoadingApprove}
                />
              </>
            ) : null}
          </div>
          <div className={styles.createVault_step}>
            <p className={cx(styles.text, needsUnlock && styles.disabled)}>
              {`How much ${vaultData.debtToken} do you want to borrow?`}
            </p>
            <TextInput
              name="borrowAmount"
              disabled={needsUnlock}
              value={vaultData.borrowAmount}
              onChange={onChange}
              right={<div className={styles.right}>{vaultData.debtToken}</div>}
              type="number"
            />

            {error ? (
              <div className={styles.errorWrap}>
                <p className={cx(styles.text, styles.error)}>
                  {error}
                </p>
              </div>
            ) : null}
          </div>
          <div className={styles.createVault_submitter}>
            <Button
              className={styles.button}
              disabled={needsUnlock}
              onClick={onSubmit}
              label="submit"
            />
            <p className={cx(styles.smalltxt, needsUnlock && styles.disabled)}>
              Upon submitting, 2 transactions will be initiated.
            </p>
          </div>
        </div>
      </LoadingWrapper>
      {transactionHash ? <EtherscanLink path="tx" hash={transactionHash} /> : null}
    </>
  );
};

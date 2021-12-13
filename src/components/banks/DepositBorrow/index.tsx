import React, { ChangeEvent, FC } from 'react';
import { Input } from 'antd';
import cx from 'classnames';
import { ApproveToken } from 'components/banks/ApproveToken';
import { LoadingWrapper } from 'components/common/LoadingWrapper';
import { EtherscanLink } from 'components/banks/EtherScanLink';
import ButtonNew from 'components/common/ButtonNew';
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
        <div className={styles.CreateVault__Steps}>
          <div className={styles.CreateVault__Step}>
            <p className={styles.text}>
              {`How much ${vaultData.collateralToken} do you want to lock up as
              collateral?`}
            </p>
            <Input
              type="number"
              name="depositAmount"
              size="large"
              value={vaultData.depositAmount}
              onChange={onChange}
              addonAfter={vaultData.collateralToken}
            />

            {needsUnlock ? (
              <>
                <p className="smalltxt">
                  Please give allowance for your collateral to continue.
                </p>
                <ApproveToken
                  onApproveClick={onApproveClick}
                  isLoadingApprove={isLoadingApprove}
                />
              </>
            ) : null}
          </div>
          <div className={styles.CreateVault__Step}>
            <p className={cx(styles.text, needsUnlock ? 'disabled' : '')}>
              {`How much ${vaultData.debtToken} do you want to borrow?`}
            </p>
            <Input
              type="number"
              name="borrowAmount"
              size="large"
              disabled={needsUnlock}
              value={vaultData.borrowAmount}
              onChange={onChange}
              addonAfter={vaultData.debtToken}
            />

            {error ? (
              <div>
                <p className={styles.error}>
                  {error}
                </p>
              </div>
            ) : null}
          </div>
          <div className={styles.CreateVault__Submitter}>
            <ButtonNew
              className={styles.button}
              disabled={needsUnlock}
              onClick={onSubmit}
            >
              submit
            </ButtonNew>
            <p className={`smalltxt  ${needsUnlock && 'disabled'}`}>
              Upon submitting, 2 transactions will be initiated.
            </p>
          </div>
        </div>
      </LoadingWrapper>
      {transactionHash ? <EtherscanLink path="tx" hash={transactionHash} /> : null}
    </>
  );
};

import React, { ChangeEvent, FC } from 'react';
import { TextInput } from 'components/common/TextInput';
import cx from 'classnames';
import { ApproveToken } from 'components/banks/ApproveToken';
import { LoadingWrapper } from 'components/common/LoadingWrapper';
import { EtherscanLink } from 'components/banks/EtherScanLink';
import { Button } from 'components/common/Button';
import { BankType } from 'store/banks/types';
import { VaultType } from 'types/vaultType';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

type Props = {
  bank: BankType,
  vaultData: VaultType,
  transactionHash: string,
  isLoadingSubmit: boolean,
  isLoadingApprove: boolean,
  localApproved: boolean,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  onSubmit: () => void,
  error: string,
  onApproveClick: () => void,
};

export const Deposit: FC<Props> = ({
  bank,
  vaultData,
  transactionHash,
  isLoadingSubmit,
  isLoadingApprove,
  localApproved,
  onChange,
  onSubmit,
  onApproveClick,
  error,
}) => {
  const needsUnlock =
    +vaultData.depositAmount > +bank.collateralToken.unlockedAmount &&
    !localApproved;
  const { t } = useTranslation();

  return (
    <>
      <LoadingWrapper
        loadingType="spinner"
        isLoading={isLoadingSubmit}
        classNameLoader={styles.loader}
      >
        <div className={styles.createVault_steps}>
          <div className={styles.createVault_step}>
            <p className={styles.text}>
              {`${t('How much')} ${vaultData.collateralToken} ${t('do you want to lock up as collateral?')}`}
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
                  {t('Please give allowance for your collateral to continue.')}
                </p>
                <ApproveToken
                  onApproveClick={onApproveClick}
                  isLoadingApprove={isLoadingApprove}
                />
              </>
            ) : null}
          </div>
          <div className={styles.createVault_submitter}>
            <Button
              className={styles.button}
              disabled={needsUnlock}
              onClick={onSubmit}
              label={t('Submit')}
            />
            <p className={cx(styles.smalltxt, needsUnlock && styles.disabled)}>
              {t('Upon submitting, 1 transactions will be initiated.')}
            </p>
          </div>
        </div>
      </LoadingWrapper>
      {transactionHash ? <EtherscanLink path="tx" hash={transactionHash} /> : console.log(error)}
    </>
  );
};

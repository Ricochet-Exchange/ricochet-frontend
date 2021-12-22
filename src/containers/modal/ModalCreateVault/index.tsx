import React, { ChangeEvent, FC } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'components/common/Button';
import Icons from 'assets/icons/Icons';
import { BankType } from 'store/banks/types';
import { DepositBorrow } from 'components/banks/DepositBorrow';
import { VaultType } from 'types/vaultType';
import ReactModal from 'react-modal';
import { FontIcon, FontIconName } from 'components/common/FontIcon';
import styles from './styles.module.scss';

type Props = {
  bank: BankType,
  vaultData: VaultType,
  step: number,
  error: string,
  transactionHash: string,
  isLoadingSubmit: boolean,
  isLoadingApprove: boolean,
  localApproved: boolean,
  visibleModal: boolean,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  onSubmit: () => void,
  onStartClick: () => void,
  onApproveClick: () => void,
  onCloseModal: () => void,
};

export const ModalCreateVault: FC<Props> = ({
  bank,
  vaultData,
  step,
  error,
  transactionHash,
  isLoadingSubmit,
  isLoadingApprove,
  localApproved,
  visibleModal,
  onStartClick,
  onChange,
  onSubmit,
  onApproveClick,
  onCloseModal,
}) => {
  const renderStep = () => {
    switch (step) {
      case 1: {
        return (
          <>
            <p className={styles.create_text}>
              You&apos;re creating a vault for
              <br />
              <strong>
                {`${bank.name} ${bank.collateralToken.symbol}-
                ${bank.debtToken.symbol}`}
              </strong>
            </p>
            <Button
              label="start"
              className={styles.start_button}
              onClick={onStartClick}
            />
          </>
        );
      }
      case 2: {
        return (
          <DepositBorrow
            bank={bank}
            vaultData={vaultData}
            transactionHash={transactionHash}
            isLoadingSubmit={isLoadingSubmit}
            isLoadingApprove={isLoadingApprove}
            localApproved={localApproved}
            onChange={onChange}
            onSubmit={onSubmit}
            error={error}
            onApproveClick={onApproveClick}
          />
        );
      }
      case 3: {
        return (
          <>
            <p>Setup succesful!</p>
            <Icons.Vmark className={styles.vmark} />
            <Link
              to="/vaults?new=true"
              className={styles.link}
            >
              <Button
                label="view vault"
                className={styles.view_button}
                onClick={onCloseModal}
              >
                <Icons.Vault fill="#678eb5" />
              </Button>
            </Link>
          </>
        );
      }
      default: {
        return null;
      }
    }
  };

  return (
    <ReactModal
      isOpen={visibleModal}
      className={styles.modal}
      overlayClassName={styles.modal_overlay}
      preventScroll
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.create_title}>
            Creating a Vault
          </h2>
          <div className={styles.close_wrap}>
            <button className={styles.close_btn} onClick={onCloseModal}>
              <FontIcon name={FontIconName.Close} className={styles.close} size={24} />
            </button>
          </div>
          {renderStep()}          
        </div>
      </div>
      <div className={styles.backdrop} onClick={onCloseModal} role="presentation" />
    </ReactModal>
  );
};

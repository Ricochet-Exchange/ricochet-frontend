import React, { ChangeEvent, FC } from 'react';
import { Link } from 'react-router-dom';
import { ButtonNew } from 'components/common/ButtonNew';
import Icons from 'assets/icons/Icons';
import { BankType } from 'store/banks/types';
import { DepositBorrow } from 'components/banks/DepositBorrow';
import { VaultType } from 'types/vaultType';
import { Button, Modal } from 'antd';
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
            <ButtonNew
              className={styles.start_button}
              onClick={onStartClick}
            >
              start
            </ButtonNew>
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
            <Icons.Vmark className="vmark" />
            <Link to="/vaults?new=true">
              <Button className="biggestbutton heavyshadow" size="large">
                <Icons.Vault fill="#4F56B5" />
                view vault
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
    <Modal
      wrapClassName="vertical-center-modal"
      visible={visibleModal}
      onCancel={onCloseModal}
      maskClosable={false}
      footer={null}
      closeIcon={<Icons.Xmark width="22px" />}
    >
      <h2 className={styles.create_title}>
        Creating a Vault
      </h2>
      {renderStep()}
    </Modal>
  );
};

import React, { FC, useCallback, useState } from 'react';
import { Button } from 'antd';
import { truncateAddr } from 'utils/helpers';
import { SignInButton } from 'components/banks/SignInButton';
import { EtherscanLink } from 'components/banks/EtherScanLink';
import { BankStatusBar } from 'components/banks/BankStatusBar';
import { BankType } from 'store/banks/types';
import './styles.scss';
import { ModalCreateVaultContainer } from 'containers/main/ModalCreateVaultContainer';

type Props = {
  bank: BankType,
  accountAddress: string,
  isReadOnly: boolean,
};

export const BankDetails: FC<Props> = ({
  bank,
  accountAddress,
  isReadOnly,
}) => {
  const [visibleModal, setVisibleModal] = useState(false);

  const handleOnCloseModal = useCallback(() => {
    setVisibleModal(false);
  }, [setVisibleModal]);

  const handleVisionModal = useCallback(() => {
    setVisibleModal(true);
  }, [setVisibleModal]);
  
  return (
    <>
      <div className="BankDetails">
        <div className="BankDetails__header">
          <h2>{bank.name}</h2>
          <p>{truncateAddr(bank.bankAddress)}</p>
          <EtherscanLink className="flexer" path="address" hash={bank.bankAddress} />
          <div className="flexer" />
          {accountAddress ? (
            <>
              {!bank.vault.hasVault ? (
                <Button
                  shape="round"
                  size="large"
                  className="purpleoutlined createvaultbtn"
                  onClick={handleVisionModal}
                >
                  + create vault
                </Button>
              ) : null}
            </>
          ) : (
            <SignInButton
              size="small"
              color="purple"
              isReadOnly={isReadOnly}
            />
          )}
        </div>

        <div className="BankDetails__content">
          <div className="BankDetail flexer">
            <p>Available for borrow</p>
            <div className="BigDetail">
              <h1>{(+bank.reserveBalance / 1e18).toFixed()}</h1>
              <h3>{bank.debtToken.symbol}</h3>
            </div>
          </div>
          <div className="BankDetails__Column">
            <BankStatusBar debtToken={bank.debtToken} collateralToken={bank.collateralToken} />
          </div>
          <div className="BankDetails__Column">
            <div className="BankDetail">
              <p>Interest Rate</p>
              <h3>
                {`${+bank.interestRate / 100} %`}
              </h3>
            </div>
            <div className="BankDetail">
              <p>Origination Fee</p>
              <h3>
                {`${+bank.originationFee / 100} %`}
              </h3>
            </div>
          </div>

          <div>
            <div className="BankDetail">
              <p>Collateralization Ratio</p>
              <h3>
                {`${bank.collateralizationRatio} %`}
              </h3>
            </div>
            <div className="BankDetail">
              <p>Liquidation Penalty</p>
              <h3>
                {`${bank.liquidationPenalty} %`}
              </h3>
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

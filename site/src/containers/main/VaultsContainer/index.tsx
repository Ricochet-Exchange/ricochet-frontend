import React, {
  MouseEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'components/common/Button';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { selectBanks } from 'store/banks/selectors';
import { BankType } from 'store/banks/types';
import { selectMain } from 'store/main/selectors';
import { SignInButton } from 'components/banks/SignInButton';
import { LoadingWrapper } from 'components/common/LoadingWrapper';
import { VaultDetails } from 'components/banks/VaultDetails';
import { useDispatch } from 'react-redux';
import { banksGetData } from 'store/banks/actionCreators';
import { InvestNav } from 'components/layout/InvestNav';
import { Routes } from 'constants/routes';
import { mainCheck } from 'store/main/actionCreators';
import { ModalType } from 'store/modal/types';
import { FontIcon, FontIconName } from 'components/common/FontIcon';
import { modalShow } from 'store/modal/actionCreators';
import styles from './styles.module.scss';

export const VaultsContainer = () => {
  const dispatch = useDispatch();
  const { banks } = useShallowSelector(selectBanks);
  const { address: accountAddress, isLoading, isReadOnly } = useShallowSelector(selectMain);
  const [hasVault, setHasVault] = useState(false);
  const [activeTransaction, setActiveTransaction] = useState('');
  const [transactionHash, setTransactionHash] = useState('');

  useEffect(() => {
    if (!banks[0]) dispatch(banksGetData());
  }, [banks]);

  const handleOnClick = useCallback((e: MouseEvent) => {
    e.preventDefault();
    setActiveTransaction(e.currentTarget.id);
  }, [setActiveTransaction]);

  const handleSignIn = useCallback(() => {
    if (isReadOnly) {
      dispatch(modalShow(ModalType.Metamask));
    } else dispatch(mainCheck());
  }, [dispatch, modalShow, isReadOnly]);

  useEffect(() => {
    if (banks) {
      setHasVault(
        banks.some((bank: BankType) => bank.vault.hasVault),
      );
    }
  }, [banks]);

  const renderVaults = () => (
    banks.map((bank: BankType) => {
      if (bank.vault.hasVault) {
        return (
          <VaultDetails
            key={bank.bankAddress}
            bank={bank}
            activeTransaction={activeTransaction}
            transactionHash={transactionHash}
            onClick={handleOnClick}
            setTransactionHash={setTransactionHash}
            setActiveTransaction={setActiveTransaction}
          />
        );
      }
      return null;
    })
  );

  return (
    <div className={styles.outer_container}>
      <InvestNav />
      <div className={styles.container}>
        {accountAddress ? (
          <>
            <LoadingWrapper
              isLoading={isLoading}
              className={styles.fullframe}
            >
              <div className={styles.contentTotal}>
                {hasVault ? (
                  <>{renderVaults()}</>
                ) : (
                  <div className={styles.vault_empty}>
                    <p>
                      You didn&apos;t create a vault yet.
                      <br />
                      <strong>Choose a bank to create a vault with.</strong>
                    </p>
                    <Link
                      className={styles.link}
                      to={Routes.Banks}
                    >
                      <Button
                        className={styles.view_button}
                        label="view banks"
                      >
                        <FontIcon
                          className={styles.bankIcon}
                          name={FontIconName.Bank}
                          size={26}
                        />
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </LoadingWrapper>
          </>
        ) : (
          <div className={styles.container}>
            <p>Sign in to see your vaults</p>
            <SignInButton
              onClick={handleSignIn}
            />
          </div>
        )}
      </div>
    </div>
  );
};

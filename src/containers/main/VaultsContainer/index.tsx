import { useShallowSelector } from 'hooks/useShallowSelector';
import React, {
  MouseEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { selectBanks } from 'store/banks/selectors';
import { BankType } from 'store/banks/types';
import { selectMain } from 'store/main/selectors';
import Icons from 'assets/icons/Icons';
import { SignInButton } from 'components/banks/SignInButton';
import { LoadingWrapper } from 'components/common/LoadingWrapper';
import { VaultDetails } from 'components/banks/VaultDetails';
import { useDispatch } from 'react-redux';
import { banksGetData } from 'store/banks/actionCreators';
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
    <>
      {accountAddress ? (
        <>
          <LoadingWrapper
            isLoading={isLoading}
            className="fullframe"
          >
            <div className="ContentTotal">
              {hasVault ? (
                <>{renderVaults()}</>
              ) : (
                <div className="Vault__Empty">
                  <p>
                    You didn&apos;t create a vault yet.
                    <br />
                    <strong>Choose a bank to create a vault with.</strong>
                  </p>
                  <Link to="/">
                    <Button className="biggestbutton heavyshadow" size="large">
                      <Icons.Bank fill="#4F56B5" />
                      view banks
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
          <SignInButton isReadOnly={isReadOnly} />
        </div>
      )}
    </>
  );
};

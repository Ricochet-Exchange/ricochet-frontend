import React, {useCallback, useEffect, useState } from 'react';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { selectBanks } from 'store/banks/selectors';
import { BankType } from 'store/banks/types';
import { selectMain } from 'store/main/selectors';
import { SignInButton } from 'components/banks/SignInButton';
import { LoadingWrapper } from 'components/common/LoadingWrapper';
import { VaultDetails } from 'components/banks/VaultDetails';
import { useDispatch } from 'react-redux';
import { banksGetData } from 'store/banks/actionCreators';
import { Routes } from 'constants/routes';
import { InvestNav } from 'components/layout/InvestNav';
import { connectWeb3Modal } from 'store/main/actionCreators';
import { FontIcon, FontIconName } from 'components/common/FontIcon';
import { useTranslation } from 'react-i18next';
import { RICAddress, USDCxAddress } from 'constants/polygon_config';
import { NavLink } from 'components/common/NavLink';
import styles from './styles.module.scss';

export const VaultsContainer = () => {
  const state = useShallowSelector(selectMain);
  const { balances } = state;
  const dispatch = useDispatch();
  const { banks } = useShallowSelector(selectBanks);
  const { address: accountAddress, isLoading } = useShallowSelector(selectMain);
  const [hasVault, setHasVault] = useState(true);
  const [activeTransaction, setActiveTransaction] = useState('');
  const [transactionHash, setTransactionHash] = useState('');
  const { t } = useTranslation();
  const [vaultID, setVaultID] = useState('');

  const handleOnClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setActiveTransaction(e.currentTarget.id);
    },
    [setActiveTransaction]
  );

  const handleSignIn = useCallback(() => {
    dispatch(connectWeb3Modal());
  }, [dispatch]);

  useEffect(() => {
    if (banks.length !== 0) dispatch(banksGetData());
  }, [banks]);

  useEffect(() => {
    if (banks) {
      setHasVault(banks.some((bank: BankType) => bank.vault.hasVault));
    }
  }, [banks]);

  const renderVaults = () =>
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
            balanceRIC={balances && balances[RICAddress]}
            balanceUSDCx={balances && balances[USDCxAddress]}
            onMouseDown={(e: any) => {
              setVaultID(e.target.value);
            }}
            vaultID={vaultID}
          />
        );
      }
      return null;
    });

  return (
    <div className={styles.outer_container}>
      <InvestNav />
      <div className={styles.container}>
        {accountAddress ? (
          <>
            <LoadingWrapper
              isLoading={isLoading}
              className={styles.fullframe}
              loadingType="spinner"
            >
              <div className={styles.contentTotal}>
                {hasVault ? (
                  <>{renderVaults()}</>
                ) : (
                  <div className={styles.vault_empty}>
                    <NavLink href={Routes.Banks}>
                      <a className={styles.nav_link}>
                        <FontIcon name={FontIconName.Lock} size={16} />
                        <div className={styles.nav_text}>
                          {t('Create a Vault in Bank')}
                        </div>
                      </a>
                    </NavLink>
                  </div>
                )}
              </div>
            </LoadingWrapper>
          </>
        ) : (
          <div className={styles.container}>
            <p>{t('Sign in to see your vaults')}</p>
            <SignInButton onClick={handleSignIn} />
          </div>
        )}
      </div>
    </div>
  );
};

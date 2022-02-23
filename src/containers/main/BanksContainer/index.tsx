import React, { useCallback, useEffect, useState } from 'react';
import { BankDetails } from 'components/banks/BankDetails';
import { LoadingWrapper } from 'components/common/LoadingWrapper';
import { selectMain } from 'store/main/selectors';
import { selectBanks } from 'store/banks/selectors';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { SignInButton } from 'components/banks/SignInButton';
import { BankType } from 'store/banks/types';
import { useDispatch } from 'react-redux';
import { banksGetData } from 'store/banks/actionCreators';
import { LoadingPopUp } from 'components/common/LoadingPopUp';
import { connectWeb3Modal } from 'store/main/actionCreators';
import { InvestNav } from 'components/layout/InvestNav';
import styles from './styles.module.scss';

export const BanksContainer = () => {
  const dispatch = useDispatch();
  const { banks } = useShallowSelector(selectBanks);
  const { address: accountAddress, isLoading } = useShallowSelector(selectMain);
  const [hasBanks, setHasBank] = useState(false);

  const handleSignIn = useCallback(() => {
    dispatch(connectWeb3Modal());
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading) dispatch(banksGetData());
  }, [isLoading]);

  useEffect(() => {
    if (banks) {
      setHasBank(banks.length !== 0);
    }
  }, [banks]);

  const renderBanks = () =>
    banks.map((bank: BankType) => (
      <BankDetails
        key={bank.bankAddress}
        bank={bank}
        accountAddress={accountAddress}
        handleSignIn={handleSignIn}
      />
    ));

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
                {hasBanks ? (
                  <table className={styles.dextable}>
                    <thead>
                      <tr>
                        <td className={styles.section}>Name</td>
                        <td className={styles.section}>
                          Available for
                          <br />
                          borrow
                        </td>
                        <td className={styles.section}>
                          Collateral Price
                          <br />
                          in
                          <span className={styles.blue}> USD</span>
                        </td>
                        <td className={styles.section}>
                          Debt Price
                          <br />
                          in
                          <span className={styles.blue}> USD</span>
                        </td>
                        <td className={styles.section}>Interest Rate</td>
                        <td className={styles.section}>Origination Fee</td>
                        <td className={styles.section}>Collateralization Ratio</td>
                        <td className={styles.section}>Liquidation Penalty</td>
                        <td>Create Vault</td>
                      </tr>
                    </thead>
                    <tbody>{renderBanks()}</tbody>
                  </table>
                ) : (
                  <div className={styles.bank_empty}>
                    <LoadingPopUp />
                  </div>
                )}
              </div>
            </LoadingWrapper>
          </>
        )
          : 
          (
            <div className={styles.sign_container}>
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

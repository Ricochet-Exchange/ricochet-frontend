import React, { useCallback, useEffect } from 'react';
import { BankDetails } from 'components/banks/BankDetails';
import { LoadingWrapper } from 'components/common/LoadingWrapper';
import { selectMain } from 'store/main/selectors';
import { selectBanks } from 'store/banks/selectors';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { BankType } from 'store/banks/types';
import { useDispatch } from 'react-redux';
import { banksGetData } from 'store/banks/actionCreators';
import { connectWeb3Modal } from 'store/main/actionCreators';
import { InvestNav } from 'components/layout/InvestNav';
import styles from './styles.module.scss';

export const BanksContainer = () => {
  const dispatch = useDispatch();
  const { banks } = useShallowSelector(selectBanks);
  const { address: accountAddress, isLoading } = useShallowSelector(selectMain);

  const handleSignIn = useCallback(() => {
    dispatch(connectWeb3Modal());
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading) dispatch(banksGetData());
  }, [isLoading]);

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
        <LoadingWrapper
          isLoading={isLoading}
          className={styles.fullframe}
        >
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
        </LoadingWrapper>
      </div>
    </div>
  );
};

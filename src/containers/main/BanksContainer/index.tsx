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
  const { banks, isLoading: isLoadingBank } = useShallowSelector(selectBanks);
  const { address: accountAddress, isLoading } = useShallowSelector(selectMain);

  const handleSignIn = useCallback(() => {
    dispatch(connectWeb3Modal());
  }, [dispatch]);
  
  useEffect(() => {
    if (!isLoading) dispatch(banksGetData());
  }, [isLoading]);

  const renderBanks = () => (
    banks.map((bank: BankType) => (
      <BankDetails
        key={bank.bankAddress}
        bank={bank}
        accountAddress={accountAddress}
        handleSignIn={handleSignIn}
      />
    ))
  );

  return (
    <div className={styles.outer_container}>
      <InvestNav />
      <div className={styles.container}>
        <LoadingWrapper
          isLoading={isLoadingBank || isLoading}
          className={styles.fullframe}
        >
          <div className={styles.contentTotal}>{renderBanks()}</div>
        </LoadingWrapper>
      </div>
    </div>
  );
};

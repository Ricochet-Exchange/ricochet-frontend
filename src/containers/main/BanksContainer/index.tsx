import React, {
  useEffect,
} from 'react';
import { BankDetails } from 'components/banks/BankDetails';
import { LoadingWrapper } from 'components/common/LoadingWrapper';
import { selectMain } from 'store/main/selectors';
import { selectBanks } from 'store/banks/selectors';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { BankType } from 'store/banks/types';
import { useDispatch } from 'react-redux';
import { banksGetData } from 'store/banks/actionCreators';
import './styles.scss';

export const BanksContainer = () => {
  const dispatch = useDispatch();
  const { banks } = useShallowSelector(selectBanks);
  const { address: accountAddress, isLoading } = useShallowSelector(selectMain);

  useEffect(() => {
    if (!banks[0]) dispatch(banksGetData());
  }, [banks]);

  const renderBanks = () => (
    banks.map((bank: BankType) => (
      <BankDetails
        key={bank.bankAddress}
        bank={bank}
        accountAddress={accountAddress}
      />
    ))
  );

  return (
    <div>
      <LoadingWrapper
        isLoading={isLoading}
        className="fullframe"
      >
        <div className="ContentTotal">{renderBanks()}</div>
      </LoadingWrapper>
    </div>
  );
};

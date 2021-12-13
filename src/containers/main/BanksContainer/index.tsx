import React, {
  useCallback,
  useState,
} from 'react';
import { BankDetails } from 'components/banks/BankDetails';
import { LoadingWrapper } from 'components/common/LoadingWrapper';
import { selectMain } from 'store/main/selectors';
import { selectBanks } from 'store/banks/selectors';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { BankType } from 'store/banks/types';
import './styles.scss';

export const BanksContainer = () => {
  const { banks } = useShallowSelector(selectBanks);
  const { address: accountAddress, isLoading } = useShallowSelector(selectMain);
  const [visibleModal, setVisibleModal] = useState(false);
  const handleOnCloseModal = useCallback(() => {
    setVisibleModal(false);
  }, [setVisibleModal]);

  const handleVisionModal = () => {
    setVisibleModal(true);
  };

  const renderBanks = () => (
    banks.map((bank: BankType) => (
      <BankDetails
        key={bank.bankAddress}
        bank={bank}
        accountAddress={accountAddress}
        visibleModal={visibleModal}
        onCreateVault={handleVisionModal}
        onCloseModal={handleOnCloseModal}
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

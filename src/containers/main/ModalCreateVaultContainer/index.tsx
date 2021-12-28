import { ModalCreateVault } from 'containers/modal/ModalCreateVault';
import { useShallowSelector } from 'hooks/useShallowSelector';
import React, {
  FC,
  ChangeEvent,
  useCallback,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { banksApproveToken, banksMakeBorrow, banksMakeDeposit } from 'store/banks/actionCreators';
import { selectBanks } from 'store/banks/selectors';
import { BankType } from 'store/banks/types';
import { VaultType } from 'types/vaultType';

type Props = {
  bank: BankType,
  visibleModal: boolean,
  onCloseModal: () => void,
};

export const ModalCreateVaultContainer: FC<Props> = ({
  bank,
  onCloseModal,
  visibleModal,
}) => {
  const dispatch = useDispatch();
  const { isLoadingSubmit, isLoadingApprove } = useShallowSelector(selectBanks);
  const [step, setStep] = useState(1);
  const [vaultData, setVaultData] = useState({
    collateralToken: bank.collateralToken.symbol,
    debtToken: bank.debtToken.symbol,
    depositAmount: '0',
    borrowAmount: '0',
  });
  const [error, setError] = useState('');
  const [transactionHash, setTransactionHash] = useState('');
  const [localApproved, setLocalApproved] = useState(false);
  const handleSetVault = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const update = { [e.target.name]: e.target.value };
    setVaultData((prevState: VaultType) => (
      { ...prevState, ...update }
    ));
  }, []);

  const handleOnStartClick = useCallback(() => {
    setStep(2);
  }, [setStep]);

  const callbackSubmit = (newTransactionHash: string, newError?: string) => {
    setTransactionHash(newTransactionHash);
    if (newError) {
      setError(newError);
    } else setStep(3);
  };

  const callbackApprove = (newError?: string) => {
    if (newError) {
      setError(newError);
    } else setLocalApproved(true);
  };

  const handlerOnSubmit = useCallback(() => {
    // TODO: some validation to ensure balance of collateral token?
    if (+vaultData.depositAmount > 0) {
      dispatch(banksMakeDeposit(vaultData.depositAmount, bank.bankAddress, callbackSubmit));
    }

    if (+vaultData.borrowAmount > 0) {
      dispatch(banksMakeBorrow(vaultData.borrowAmount, bank.bankAddress, callbackSubmit));
    }
  }, [dispatch, vaultData, bank]);

  const handleApproveToken = useCallback(() => {
    dispatch(banksApproveToken(
      bank.collateralToken.address,
      bank.bankAddress,
      callbackApprove,
    ));
  }, [dispatch, bank]);

  const handleOnCloseModal = useCallback(() => {
    onCloseModal();
    setError('');
  }, [onCloseModal, setError]);

  return (
    <ModalCreateVault
      bank={bank}
      vaultData={vaultData}
      step={step}
      transactionHash={transactionHash}
      isLoadingSubmit={isLoadingSubmit}
      isLoadingApprove={isLoadingApprove}
      error={error}
      visibleModal={visibleModal}
      localApproved={localApproved}
      onChange={handleSetVault}
      onSubmit={handlerOnSubmit}
      onStartClick={handleOnStartClick}
      onApproveClick={handleApproveToken}
      onCloseModal={handleOnCloseModal}
    />
  );
};

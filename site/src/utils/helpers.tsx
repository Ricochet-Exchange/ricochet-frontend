import { BankType } from 'store/banks/types';

export const truncateAddr = (addr: string) => (
  `${addr.slice(0, 6)}...${addr.slice(-4)}`
);

export const getVaultCalcValues = (bank: BankType) => {
  const cR = +bank.collateralizationRatio / 100;
  const aD = +bank.vault.debtAmount / 10 ** +bank.debtToken.decimals;
  const pD = +bank.debtToken.price / +bank.debtToken.granularityPrice;
  const aC =
    +bank.vault.collateralAmount / 10 ** +bank.collateralToken.decimals;
  const pC =
    +bank.collateralToken.price / +bank.collateralToken.granularityPrice;
  const liquidationPrice = (cR * aD * pD) / aC;
  const withdrawAvailable = aC - (cR * aD * pD) / pC;
  const borrowAvailable = (aC * pC) / pD / cR - aD;

  return {
    liquidationPrice,
    withdrawAvailable,
    borrowAvailable,
  };
};

const getAcModifier = (aC: number, activeTransaction: string, value: string) => {
  if (
    activeTransaction === 'borrow' ||
    activeTransaction === 'repay' ||
    !+value
  ) {
    return aC;
  }
  if (activeTransaction === 'withdraw') {
    return aC - +value;
  }
  return aC + +value;
};

const getAdModifier = (aD: number, activeTransaction: string, value: string) => {
  if (
    activeTransaction === 'withdraw' ||
    activeTransaction === 'deposit' ||
    !+value
  ) {
    return aD;
  } 
  if (activeTransaction === 'borrow') {
    return aD + +value;
  }
  return aD - +value;
};

export const getVaultTxCalcValues = (bank: BankType, activeTransaction: string, value: string) => {
  const cR = +bank.collateralizationRatio / 100;
  let aD = +bank.vault.debtAmount / 10 ** +bank.debtToken.decimals;
  aD = getAdModifier(aD, activeTransaction, value);
  const pD = +bank.debtToken.price / +bank.debtToken.granularityPrice;
  let aC = +bank.vault.collateralAmount / 10 ** +bank.collateralToken.decimals;
  aC = getAcModifier(aC, activeTransaction, value);
  const pC =
    +bank.collateralToken.price / +bank.collateralToken.granularityPrice;

  const newLiquidationPrice = (cR * aD * pD) / aC;
  const newCollateralizationRatio = ((aC * pC) / aD) * pD;

  return {
    newLiquidationPrice,
    newCollateralizationRatio: !+value
      ? +bank.vault.collateralizationRatio / 100
      : newCollateralizationRatio * 100,
  };
};

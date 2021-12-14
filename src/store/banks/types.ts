export type BanksState = {
  tokenPairs: string[],
  activePair: string,
  bankAddresses: string[],
  banks: BankType[],
  isLoadingSubmit: boolean,
  isLoadingApprove: boolean,
  isLoadingTransaction: boolean,
};

export type BankType = {
  bankAddress: string,
  vault: VaultType,
  debtToken: TokenType,
  collateralToken: TokenType,
  interestRate: string,
  originationFee: string,
  collateralizationRatio: string,
  liquidationPenalty: string,
  reserveBalance: string,
  reserveCollateralBalance: string,
  name: string,
};

export type VaultType = {
  collateralAmount: string,
  repayAmount: string,
  debtAmount: string,
  collateralizationRatio: number,
  hasVault: boolean,
};

export type TokenType = {
  address: string,
  symbol: string,
  decimals: string,
  unlockedAmount: string,
  price: string,
  granularityPrice: string,
};

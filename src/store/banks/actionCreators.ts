import { BanksActionTypes } from './actionTypes';
import { BanksState } from './types';

export const banksSetState = (payload: Partial<BanksState>) => ({
  type: BanksActionTypes.SET_STATE,
  payload,
});

export const banksGetData = () => ({
  type: BanksActionTypes.LOAD_DATA,
});

export const banksMakeDeposit = (
  depositAmount: string,
  bankAddress: string,
  callback: (transactionHash: string, error?: string) => void,
) => ({
  type: BanksActionTypes.MAKE_DEPOSIT,
  payload: {
    depositAmount, bankAddress, callback, 
  },
});

export const banksMakeBorrow = (
  borrowAmount: string,
  bankAddress: string,
  callback: (transactionHash: string, error?: string) => void,
) => ({
  type: BanksActionTypes.MAKE_BORROW,
  payload: {
    borrowAmount, bankAddress, callback, 
  },
});

export const banksApproveToken = (
  tokenAddress: string,
  bankAddress: string,
  callback: (error?: string) => void,
) => ({
  type: BanksActionTypes.APPROVE_TOKEN,
  payload: {
    tokenAddress,
    bankAddress,
    callback,
  },
});

export const banksMakeTransaction = (
  transactionType: string,
  amount: string,
  bankAddress: string,
  callback: (transactionHash: string, error?: string) => void,
) => ({
  type: BanksActionTypes.MAKE_TRANSACTION,
  payload: {
    transactionType, amount, bankAddress, callback, 
  },
});

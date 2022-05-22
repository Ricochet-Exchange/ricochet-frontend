import { call, put, select } from 'redux-saga/effects';
import { Unwrap } from 'types/unwrap';
import { getAddress } from 'utils/getAddress';
import { getContract } from 'utils/getContract';
import { makeBorrow, makeDeposit, makeRepay, makeWithdraw } from 'api/ethereum';
import BankAbi from 'constants/Bank.json';
import { selectMain } from 'store/main/selectors';
import { banksMakeTransaction, banksSetState } from '../actionCreators';

export function* makeTransactionSaga({ payload }: ReturnType<typeof banksMakeTransaction>) {
	try {
		yield put(banksSetState({ isLoadingTransaction: true }));
		const { web3 }: ReturnType<typeof selectMain> = yield select(selectMain);
		const accountAddress: Unwrap<typeof getAddress> = yield call(getAddress, web3);
		const bankContract = getContract(payload.bankAddress, BankAbi.abi, web3);
		if (payload.transactionType === 'withdraw') {
			const { transactionHash } = yield call(makeWithdraw, bankContract, accountAddress, payload.amount);
			payload.callback(transactionHash);
		}

		if (payload.transactionType === 'deposit') {
			const { transactionHash } = yield call(makeDeposit, bankContract, accountAddress, payload.amount);
			payload.callback(transactionHash);
		}

		if (payload.transactionType === 'borrow') {
			const { transactionHash } = yield call(makeBorrow, bankContract, accountAddress, payload.amount);
			payload.callback(transactionHash);
		}

		if (payload.transactionType === 'repay') {
			const { transactionHash } = yield call(makeRepay, bankContract, accountAddress, payload.amount);
			payload.callback(transactionHash);
		}
	} catch (e) {
		payload.callback('', 'Transaction Error');
	} finally {
		yield put(banksSetState({ isLoadingTransaction: false }));
	}
}

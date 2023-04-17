import { all, call } from 'redux-saga/effects';

import {
	checkIfApproveDai,
	checkIfApproveMatic,
	checkIfApproveUsdc,
	checkIfApproveWbtc,
	checkIfApproveWeth,
	checkIfApproveIbAlluoUSD,
	checkIfApproveIbAlluoETH,
	checkIfApproveIbAlluoBTC,
} from './checkIfApprove';

export function* readApprovalsSaga(action: any) {
	yield all([
		call(checkIfApproveUsdc),
		call(checkIfApproveDai),
		call(checkIfApproveWeth),
		call(checkIfApproveWbtc),
		call(checkIfApproveMatic),
		call(checkIfApproveIbAlluoUSD),
		call(checkIfApproveIbAlluoETH),
		call(checkIfApproveIbAlluoBTC),
	]);
}

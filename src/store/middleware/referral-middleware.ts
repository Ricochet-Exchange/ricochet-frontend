import { Middleware } from 'redux';
import { Cookies } from 'react-cookie';
import { MainActionTypes } from '../main/actionTypes';

const cookies = new Cookies();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const referralMiddleware: Middleware = (store) => (next) => (action) => {
	const referralId = cookies.get('referralId', { doNotParse: true });
	if (referralId && action.type === MainActionTypes.START_FLOW) {
		const actionWithReferralId = { ...action };
		actionWithReferralId.payload.config.referralId = referralId;
		return next(actionWithReferralId);
	}
	return next(action);
};

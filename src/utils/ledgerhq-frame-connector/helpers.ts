import { THIRTY_DAYS_DURATION } from '../../constants/referralExpiry';

export const isIframe = (): boolean => {
	try {
		return window.self !== window.top;
	} catch (error) {
		return false;
	}
};
const params = new URLSearchParams(window.self.location.search);
export const isLedgerDappBrowserProvider = (() => {
	let state: boolean | null = null;

	return (): boolean => {
		if (typeof state === 'boolean') return state;
		if (typeof window === 'undefined') return false;
		try {
			const isEmbed = !!params.get('embed');
			state = isIframe() && isEmbed;
		} catch (error) {
			state = false;
		}
		return !!state;
	};
})();

export const isLedgerReferralIdSetIntoCookies = () => {
	const params = new URLSearchParams(window.self.location.search);
	const referralId = params.get('ref');
	if (referralId === 'ledger') {
		const expires = new Date(new Date().getTime() + THIRTY_DAYS_DURATION);
		setCookie('referralId', referralId, expires);
		return true;
	}
	return false;
};

function setCookie(cname: string, cvalue: string, expires: Date) {
	document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

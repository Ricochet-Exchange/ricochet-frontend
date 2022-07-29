import { THIRTY_DAYS_DURATION } from '../../constants/referralExpiry';

export const isIframe = (): boolean => {
	try {
		return window.self !== window.top;
	} catch (error) {
		return false;
	}
};
const params = new URLSearchParams(window.self.location.search);

function checkAndStoreLedgerReferralIdIntoCookies() {
	try {
		const ledgerLiveURLParam = params.get('params');
		const dappUrlParams = new URLSearchParams(JSON.parse(ledgerLiveURLParam!)?.dappUrl);
		const referralId = dappUrlParams?.get('ref');
		console.log(referralId === 'ledgerlive');
		if (referralId === 'ledgerlive') {
			const expires = new Date(new Date().getTime() + THIRTY_DAYS_DURATION);
			setCookie('referralId', referralId, expires);
			return true;
		}
		return false;
	} catch (e) {
		console.error('Error occurred while parsing ledger live query param', e);
		return false;
	}
}

function setCookie(cname: string, cvalue: string, expires: Date) {
	document.cookie = cname + '=' + cvalue + ';expires=' + expires.toUTCString() + ';path=/';
}

export const isLedgerDappBrowserProvider = (() => {
	let state: boolean | null = null;
	return (): boolean => {
		if (typeof state === 'boolean') return state;
		if (typeof window === 'undefined') return false;
		try {
			const isEmbed = !!params.get('embed');
			const referralIdSetIntoCookies = checkAndStoreLedgerReferralIdIntoCookies();
			if (!referralIdSetIntoCookies)
				console.warn('Referral ID missing from query param or ledger ?ref=<code> changed.');
			state = isIframe() && isEmbed;
		} catch (error) {
			state = false;
		}
		return !!state;
	};
})();

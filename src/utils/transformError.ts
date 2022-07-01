export const transformError = (e?: any) => {
	if (e?.data?.error) {
		return e.data.error;
	}
	if (e?.errorObject.code === 4001) {
		return e?.errorObject.message;
	}
	if (e?.errorObject.code === -32603) {
		return e?.errorObject.message;
	}
	if (e?.errorObject?.error?.message.startsWith('execution reverted: ')) {
		return e?.errorObject?.error?.message.slice('execution reverted: '.length);
	}
	if (e.code === 4001) {
		return e?.message;
	}
	if (e.code === -32603) {
		return e.data?.message;
	}
	return 'Operation failed. Refresh the page or try again later.';
};

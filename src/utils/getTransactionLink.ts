export const getTransactionLink = (transactionHash: string) => {
	const link = `https://polygonscan.com/tx/${transactionHash}`;
	return link;
};

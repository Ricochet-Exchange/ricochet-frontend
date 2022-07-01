import { BigNumber, ethers } from 'ethers';

export const calculateStreamed = (streamedUntilUpdatedAt: string, balanceTimestamp: string, flowRate: string) => {
	const streamedUntilUpdatedAtBN = BigNumber.from(streamedUntilUpdatedAt);
	const balanceTimestampBN = BigNumber.from(balanceTimestamp).mul(1e3);
	const currentTimestampBN = BigNumber.from(new Date().getTime());
	const flowRateBN = BigNumber.from(flowRate);

	let streamed;

	if (flowRateBN.isZero()) {
		streamed = ethers.utils.formatEther(streamedUntilUpdatedAtBN);
	} else {
		streamed = ethers.utils.formatEther(currentTimestampBN.sub(balanceTimestampBN).mul(flowRateBN).div(1e3));
	}

	return streamed;
};

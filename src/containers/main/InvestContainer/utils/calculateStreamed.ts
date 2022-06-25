import { BigNumber, ethers } from 'ethers';

export const calculateStreamed = (balance: string, balanceTimestamp: string, flowRate: string) => {
	const balanceBN = BigNumber.from(balance);
	const balanceTimestampBN = BigNumber.from(balanceTimestamp).mul(1e3);
	const currentTimestampBN = BigNumber.from(new Date().getTime());
	const flowRateBN = BigNumber.from(flowRate);

	let streamedSoFar;

	if (flowRateBN.isZero()) {
		streamedSoFar = ethers.utils.formatEther(balanceBN);
	} else {
		streamedSoFar = ethers.utils.formatEther(
			balanceBN.add(currentTimestampBN.sub(balanceTimestampBN)).mul(flowRateBN).div(1e3),
		);
	}

	return streamedSoFar;
};

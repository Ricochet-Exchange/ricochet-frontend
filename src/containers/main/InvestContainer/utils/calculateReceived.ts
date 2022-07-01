import { BigNumber, ethers } from 'ethers';

export const calculateReceived = (
	publisherIndexValue: string,
	subscriberIndexValueUntilUpdatedAt: string,
	subscriberUnits: string,
) => {
	const publisherIndexValueBN = BigNumber.from(publisherIndexValue);
	const subscriberIndexValueUntilUpdatedAtBN = BigNumber.from(subscriberIndexValueUntilUpdatedAt);
	const subscriberUnitsBN = BigNumber.from(subscriberUnits);

	const publisherSubscriberDifference = publisherIndexValueBN
		.sub(subscriberIndexValueUntilUpdatedAtBN)
		.mul(subscriberUnitsBN);

	const received = ethers.utils.formatEther(publisherSubscriberDifference);

	return received;
};

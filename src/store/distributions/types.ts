export interface DistributionState {
	framework?: any;
	distributions: Distribution[];
	isLoading: boolean;
}

export interface Distribution {
	id: string;
	createdAtBlockNumber: number;
	createdAtTimestamp: number;
	updatedAtTimestamp: number;
	lastDistributionDate: number;
	updatedAtBlockNumber: number;
	approved: boolean;
	indexValueUntilUpdatedAt: string;
	indexValueCurrent: string;
	totalAmountReceivedUntilUpdatedAt: string;
	units: string;
	indexTotalUnits: string;
	index: string;
	indexId: number;
	token: string;
	subscriber: string;
	publisher: string;
	symbol: string;
	name: string;
}

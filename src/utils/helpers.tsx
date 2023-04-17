export const truncateAddr = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

export const getVaultCalcValues = (bank: any) => {
	const collateralizationRatio = (5 + +bank.collateralizationRatio) / 100;
	const debtAmount = +bank.vault.debtAmount / 10 ** +bank.debtToken.decimals;
	const debtPrice = +bank.debtToken.price / +bank.debtToken.granularityPrice;
	const collateralAmount = +bank.vault.collateralAmount / 10 ** +bank.collateralToken.decimals;
	const priceCollateral = +bank.collateralToken.price / +bank.collateralToken.granularityPrice;
	const liquidationPrice = (collateralizationRatio * debtAmount * debtPrice) / collateralAmount;
	const withdrawAvailable = collateralAmount - (collateralizationRatio * debtAmount * debtPrice) / priceCollateral;
	const borrowAvailable = (collateralAmount * priceCollateral) / debtPrice / collateralizationRatio - debtAmount;
	return {
		liquidationPrice,
		withdrawAvailable,
		borrowAvailable,
	};
};

const getAcModifier = (collateralAmount: number, activeTransaction: string, value: string) => {
	if (activeTransaction === 'borrow' || activeTransaction === 'repay' || !+value) {
		return collateralAmount;
	}
	if (activeTransaction === 'withdraw') {
		return collateralAmount - +value;
	}
	return collateralAmount + +value;
};

const getAdModifier = (debtAmount: number, activeTransaction: string, value: string) => {
	if (activeTransaction === 'withdraw' || activeTransaction === 'deposit' || !+value) {
		return debtAmount;
	}
	if (activeTransaction === 'borrow') {
		return debtAmount + +value;
	}
	return debtAmount - +value;
};

export const getVaultTxCalcValues = (bank: any, activeTransaction: string, value: string) => {
	const collateralizationRatio = +bank.collateralizationRatio / 100;

	let debtAmount = +bank.vault.debtAmount / 10 ** +bank.debtToken.decimals;
	debtAmount = getAdModifier(debtAmount, activeTransaction, value);

	const debtPrice = +bank.debtToken.price / +bank.debtToken.granularityPrice;

	let collateralAmount = +bank.vault.collateralAmount / 10 ** +bank.collateralToken.decimals;
	collateralAmount = getAcModifier(collateralAmount, activeTransaction, value);

	const priceCollateral = +bank.collateralToken.price / +bank.collateralToken.granularityPrice;

	const newLiquidationPrice = (collateralizationRatio * debtAmount * debtPrice) / collateralAmount;
	const newCollateralizationRatio = ((collateralAmount * priceCollateral) / debtAmount) * debtPrice;

	return {
		newLiquidationPrice,
		newCollateralizationRatio: !+value ? +bank.vault.collateralizationRatio / 100 : newCollateralizationRatio * 100,
	};
};

export const DISCORD_LINK = 'https://discord.gg/HPUs46akfY';
export const TUTORIAL_LINK = 'https://docs.ricochet.exchange/';
export const RICOCHET_LEGACY_LINK = 'https://legacy.ricochet.exchange/';
export const SUPPORT = 'https://discord.com/channels/862796510604296263/864667072357597185';

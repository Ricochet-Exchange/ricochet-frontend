import {ethers} from 'ethers';

const calculateStreamedSoFar = (
    balance,
    balanceTimestamp,
    flowRate,
) => {
    const balanceBigNumber = ethers.BigNumber.from(balance);
    const flowRateBigNumber = ethers.BigNumber.from(flowRate);
    const balanceTimestampBigNumber =
        ethers.BigNumber.from(balanceTimestamp).mul(1000);

    const currentTimestampBigNumber = ethers.BigNumber.from(
        new Date().getTime()
    );

    return flowRateBigNumber.isZero() ? ethers.utils.formatEther(balanceBigNumber)
        : ethers.utils.formatEther(balanceBigNumber.add(
        currentTimestampBigNumber
            .sub(balanceTimestampBigNumber)
            .mul(flowRateBigNumber)
            .div(1000)));
};

export default calculateStreamedSoFar;
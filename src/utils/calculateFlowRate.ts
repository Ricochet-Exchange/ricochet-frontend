import { ethers } from 'ethers';

export function calculateFlowRate(amountInEther: number) {
  if (
    typeof Number(amountInEther) !== 'number' ||
    Number.isNaN(Number(amountInEther)) === true
  ) {
    console.log(typeof Number(amountInEther));
  } else if (typeof Number(amountInEther) === 'number') {
    const monthlyAmount = ethers.utils.parseEther(amountInEther.toString());
    const calculatedFlowRate = Math.floor(+(monthlyAmount) / 3600 / 24 / 30);
    return calculatedFlowRate;
  }
}

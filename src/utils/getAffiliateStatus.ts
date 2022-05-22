import { getContract } from 'utils/getContract';
import Web3 from 'web3';

// eslint-disable-next-line @typescript-eslint/naming-convention
export enum AFFILIATE_STATUS {
  'INACTIVE' = 'inactive',
  'REGISTERING' = 'registering',
  'AWAITING_VERIFICATION' = 'awaitingVerification',
  'ENABLED' = 'enabled',
}

const validations = (input: string): [boolean, string][] => {
  const criteria: [boolean, string][] = [
    [new Blob([input]).size <= 32, 'Cannot be larger than 32 characters (Some characters count as 2)'],
    [input.length > 1, 'Must be at least 2 characters'],
  ];
  return criteria;
};

export const filterValidationErrors = (input: string) =>
  validations(input).reduce<string[]>((acc: string[], each) => {
    if (each[0] === false) {
      return [...acc, each[1]];
    }
    return acc;
  }, []);

export const getAffiliateStatus = async (
  contract: ReturnType<typeof getContract>,
  address: string,
  web3: Web3,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setCurrentReferralId = (referralId: string) => {},
) => {
  const affiliateId: string =
    await contract.methods.addressToAffiliate(address.toLowerCase()).call();
  const res: any = await contract.methods.affiliates(affiliateId).call();

  if (web3.utils.toBN(res.addr).isZero()) {
    return AFFILIATE_STATUS.INACTIVE;
  } 
  
  if (res.enabled === false) {
    return AFFILIATE_STATUS.AWAITING_VERIFICATION;
  }

  if (filterValidationErrors(res.id).length === 0) {
    setCurrentReferralId(res.id);
    return AFFILIATE_STATUS.ENABLED;
  }
};

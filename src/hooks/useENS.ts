import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

const useENS = (
  address: string | null | undefined,
): { ensName: string | null } => {
  const [ensName, setENSName] = useState<string | null>(null);

  useEffect(() => {
    const resolveENS = async () => {
      if (address && ethers.utils.isAddress(address)) {
        const provider = new ethers.providers.JsonRpcProvider('https://cloudflare-eth.com');
        const name = await provider.lookupAddress(address);
        setENSName(name);
      }
    };
    resolveENS();
  }, [address]);

  return { ensName };
};

export default useENS;

import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

const useENS = (
  address: string | null | undefined,
): { ensName: string | null; ensAvatar: string | null } => {
  const [ensName, setENSName] = useState<string | null>(null);
  const [ensAvatar, setENSAvatar] = useState<string | null>(null);

  useEffect(() => {
    const resolveENS = async () => {
      if (address && ethers.utils.isAddress(address)) {
        const provider = await ethers.providers.getDefaultProvider();
        const name = await provider.lookupAddress(address);
        if (name) {
          const avatar = await provider.getAvatar(name);
          setENSAvatar(avatar);
        }
        setENSName(name);
      }
    };
    resolveENS();
  }, [address]);

  return { ensName, ensAvatar };
};

export default useENS;

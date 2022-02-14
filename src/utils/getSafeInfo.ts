import SafeAppsSDK, { SafeInfo } from '@gnosis.pm/safe-apps-sdk';
import { SafeAppProvider } from '@gnosis.pm/safe-apps-provider';

const SDK = new SafeAppsSDK();

export const getConnectedSafe = async (): Promise<SafeInfo | undefined> => SDK.safe.getInfo();

export const isIFrame = () => window?.parent !== window;
export const isSafeApp = async (): Promise<boolean> => {
  // check if we're in an iframe
  if (!isIFrame()) {
    return false;
  }
  const safe = await getConnectedSafe();
  return !!safe;
};

export const getProvider = async (): Promise<SafeAppProvider> => {
  const safe = await getConnectedSafe();
  if (!safe) throw Error('Could not load Safe information');
  return new SafeAppProvider(safe, SDK);
};

export const getSafeProvider = async (): Promise<SafeAppProvider | undefined> => {
  if (await isSafeApp()) {
    return getProvider();
  }
  return undefined;
};

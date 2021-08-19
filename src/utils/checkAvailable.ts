export const checkAvailable = async () => {
  const { ethereum } = (window as any);
  if (!ethereum) {
    return false;
  }

  await ethereum.enable();
  return parseInt(ethereum.networkVersion, 10) !== Number(process.env.REACT_APP_CHAIN_ID);
};

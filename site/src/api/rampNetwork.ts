import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk';

export function invokeRamp(config: {
  hostLogoUrl: string,
  userAddress: string,
}, onPurchase: Function): any {
  new RampInstantSDK({
    hostAppName: 'Ricochet Exchange',
    defaultAsset: 'MATIC',
    swapAsset: 'MATIC_USDC,MATIC_DAI,MATIC_ETH,MATIC',
    ...config,
  })
    .on('*', (event) => {
      console.log(event);
      if (event.type === 'PURCHASE_SUCCESSFUL') {
        onPurchase(event);
      }
    })
    .show();
}

import { Flow } from 'types/flow';

export const getOwnedFlows = (flows: Flow[], tokenAddress: string) => {
  const sum = flows.reduce((acc, flow) => {
    if (flow.token.id === tokenAddress.toLowerCase()) {
      return acc + parseInt(flow.flowRate, 10);
    }
    return acc;
  }, 0);
  return ((sum / 10 ** 18) * (30 * 24 * 60 * 60)).toFixed(3);
};

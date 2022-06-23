export const getSushiSwapPoolPriceByBlock = (poolAddress: string, blockNumber: number) => `{
  pair(id: "${poolAddress.toLowerCase()}", block: { number: ${blockNumber} }) {
    token0Price
    token0 {
      symbol
    }
    token1Price
    token1 {
      symbol
    }
    reserve0
    reserve1
    reserveUSD
  }
}`;

export const getSushiPoolPrices = (poolAddress: string) => `{
  pair(id: "${poolAddress.toLowerCase()}") {
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

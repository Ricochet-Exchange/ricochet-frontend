import { Token } from "@uniswap/sdk-core";
import { ChainId } from "@uniswap/smart-order-router";
import {
  DAIxAddress,
  USDCxAddress,
  WETHxAddress,
  MKRxAddress,
  WBTCxAddress,
  MATICxAddress,
  SUSHIxAddress,
  IDLExAddress,
  DAIAddress,
  USDCAddress,
  MKRAddress,
  WETHAddress,
  WBTCAddress,
  SUSHIAddress,
  IDLEAddress,
} from "constants/polygon_config";

export const getUnderlyingSupertoken = async (Supertoken: string) => {
  const WMATIC = new Token(
    ChainId.POLYGON,
    "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270", // 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270
    18, // decimals
    "WMATIC",
    "Wrapped Matic"
  );

  const USDC = new Token(
    ChainId.POLYGON,
    USDCAddress,
    6,
    "USDC",
    "USD Coin"
  );

  const DAI = new Token(
    ChainId.POLYGON,
    DAIAddress,
    18, // decimals
    "DAI",
    "Dai Stablecoin"
  );

  const MKR = new Token(
    ChainId.POLYGON,
    MKRAddress,
    18, // decimals,
    "MKR",
    "Maker"
  );

  const WETH = new Token(
    ChainId.POLYGON,
    WETHAddress,
    18, // decimals
    "WETH",
    "Wrapped Ether"
  );

  const WBTC = new Token(
    ChainId.POLYGON,
    WBTCAddress,
    18, // decimals,
    "WBTC",
    "Wrapped BTC"
  );

  const SUSHI = new Token(
    ChainId.POLYGON,
    SUSHIAddress,
    18, // decimals,
    "SUSHI",
    "SushiToken"
  );

  const IDLE = new Token(
    ChainId.POLYGON,
    IDLEAddress,
    18, // decimals,
    "IDLE",
    "Idle"
  );

  if (Supertoken === MATICxAddress) {
    return WMATIC;
  }
  if (Supertoken === USDCxAddress) {
    return USDC;
  }
  if (Supertoken === DAIxAddress) {
    return DAI;
  }
  if (Supertoken === MKRxAddress) {
    return MKR;
  }
  if (Supertoken === WETHxAddress) {
    return WETH;
  }
  if (Supertoken === WBTCxAddress) {
    return WBTC;
  }
  if (Supertoken === SUSHIxAddress) {
    return SUSHI;
  }
  if (Supertoken === IDLExAddress) {
    return IDLE;
  }
  console.log("Error in getUnderlyingToken()");
};

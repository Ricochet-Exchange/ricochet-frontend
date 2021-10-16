import { useEffect, useState, HTMLProps } from "react";
import { AbiItem } from "web3-utils";
import BigNumber from "bignumber.js";
import ABI from "./abi.json";
import web3 from "utils/web3instance";
import { usdcxRicExchangeAddress } from "constants/polygon_config";

type Props = {
  // any additional props here
} & HTMLProps<HTMLSpanElement>;

// load abi, create contract instance, get price, normalize price, quicc maths, return
const getPrice = async (): Promise<string> => {
  const abi: AbiItem = JSON.parse(JSON.stringify(ABI));
  const contract = new web3.eth.Contract(abi, usdcxRicExchangeAddress);
  const price = await contract.methods.getSharePrice().call();
  const normalizedPrice = typeof price === "string" ? price : price.toString();
  return new BigNumber(normalizedPrice)
    .dividedBy(new BigNumber(10).pow(new BigNumber(18)))
    .toString();
};

// return null if no price fetched, else return inline element
export default function Price(props: Props) {
  const [price, setPrice] = useState("");

  useEffect(() => {
    getPrice().then((p) => setPrice(p));
  });

  return <span {...props}>{price !== "" ? price : "-"}</span>;
}

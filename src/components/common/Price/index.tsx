import React from 'react';
import { launchpadABI } from 'constants/abis';
import { usdcxRicExchangeAddress } from 'constants/polygon_config';
import { fromWei, trimPad } from 'utils/balances';
import { getContract } from 'utils/getContract';
import Web3 from 'web3';
import styles from './styles.module.scss';
import { useShallowSelector } from '../../../hooks/useShallowSelector';
import { selectMain } from '../../../store/main/selectors';

type Props = {
  // any additional props here
} & React.HTMLProps<HTMLSpanElement>;

// load abi, create contract instance, get price, normalize price, quicc maths, return
const getPrice = async (web3:Web3): Promise<string> => {
  const contract = getContract(usdcxRicExchangeAddress, launchpadABI, web3);
  const price = await contract.methods.getSharePrice().call();
  const normalizedPrice = typeof price === 'string' ? price : price.toString();
  return fromWei(normalizedPrice, 18);
};

// returns inline element, className or style can be directly applied to Price
// ie: <Price className='price' />
export default function Price(props: Props) {
  const [price, setPrice] = React.useState('');
  const {
    web3,
  } = useShallowSelector(selectMain);
  React.useEffect(() => {
    if (web3?.currentProvider === null) return;
    getPrice(web3).then((p) => setPrice(p));
  });
  
  return (
    <div className={styles.balance_container}>
      <span {...props} className={styles.balance}>{`🚀 ${trimPad(price, 2)} USDC/RIC`}</span>
    </div>
  );
}

import Web3 from 'web3';

const web3HttpProvider = new Web3.providers.HttpProvider(process.env.REACT_APP_API_NODE_URL!);
const web3 = new Web3(Web3.givenProvider ? Web3.givenProvider : web3HttpProvider);
export default web3;

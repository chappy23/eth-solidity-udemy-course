// Load environment variables.
require("dotenv").config();

import Web3 from 'web3';

const network = process.env.RINKEBY_ENDPOINT;
let web3;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  // We're in the browser and metamask is running.
  window.ethereum.request({ method: 'eth_requestAccounts' });
  web3 = new Web3(window.ethereum);
} else {
  const provider = new Web3.providers.HttpProvider(network);
  web3 = new Web3(provider);
}

export default web3;
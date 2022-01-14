import web3 from './web3';
import CompaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  CompaignFactory.abi,
  '0x331682E1A06c5DaB9E25B314b6ed249ec75658C7'
);

export default instance;
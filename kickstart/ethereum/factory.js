import web3 from './web3';
import CompaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  CompaignFactory.abi,
  '0x088877dBB5F945b646cA7c321D2f2303468c15cf'
);

export default instance;
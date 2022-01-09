const assert = require('assert');
const ganache = require('ganache-cli');
// Uppercase as its a constructor.
const Web3 = require('web3');
// Create instance of web3 to our test network.
const web3 = new Web3(ganache.provider());

const { abi, evm } = require('../compile');

let accounts;
let inbox;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // Use one account to deploy the contract
  inbox = await new web3.eth.Contract(abi)
    .deploy({
      data: evm.bytecode.object,
      arguments: ['Hi there!'],
    })
    .send({ from: accounts[0], gas: '1000000' });
});

xdescribe('Inbox', () => {
  it('should deploy contract', () => {
    assert.ok(inbox.options.address);
  });

  it('should have default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Hi there!');
  });

  it('should change message', async () => {
    await inbox.methods.setMessage('New message').send({ from: accounts[0] });
    const newMessage = await inbox.methods.message().call();

    assert.equal(newMessage, 'New message');
  });
});
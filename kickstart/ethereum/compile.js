const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
const contractFileName = "Campaign.sol";

// Delete the existing build folder.
fs.removeSync(buildPath);

// Read the contents of our smart contract.
const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf-8');

// Create the input object so it can be compiled (different to course).
const input = {
  language: 'Solidity',
  sources: {},
  settings: {
    metadata: {
      useLiteralContent: true,
    },
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

input.sources[contractFileName] = {
  content: source,
};

// Get the contract from the compiled output.
const output = JSON.parse(solc.compile(JSON.stringify(input)));
const contracts = output.contracts[contractFileName];

// Create the build folder.
fs.ensureDirSync(buildPath);

// Create a json file for all found smart contracts
for (let contract in contracts) {
  fs.outputJSONSync(path.resolve(buildPath, `${contract}.json`), contracts[contract],
  );
}

// Build files are ready to deploy.
// deploy/deploy_contract.js
const fs = require('fs');
const path = require('path');
const Web3 = require('web3');
const web3 = new Web3('http://127.0.0.1:7545'); // Ganache default

const account = (await web3.eth.getAccounts())[0];

// Load and compile
const contractPath = path.resolve(__dirname, '../contracts/MedicineRegistry.sol');
const source = fs.readFileSync(contractPath, 'utf8');
const solc = require('solc');

const input = {
  language: 'Solidity',
  sources: {
    'MedicineRegistry.sol': { content: source },
  },
  settings: { outputSelection: { '*': { '*': ['*'] } } },
};

const compiled = JSON.parse(solc.compile(JSON.stringify(input)));
const contract = compiled.contracts['MedicineRegistry.sol']['MedicineRegistry'];

const abi = contract.abi;
const bytecode = contract.evm.bytecode.object;

// Deploy
(async () => {
  const result = await new web3.eth.Contract(abi)
    .deploy({ data: '0x' + bytecode })
    .send({ from: account, gas: 1500000 });

  console.log('Contract deployed at:', result.options.address);

  fs.writeFileSync(
    path.resolve(__dirname, '../build/Contract.json'),
    JSON.stringify({ abi, address: result.options.address }, null, 2)
  );
})();

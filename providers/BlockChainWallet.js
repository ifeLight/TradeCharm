const  MyWallet = require('blockchain.info/MyWallet');
const config = require('config');

const identifier = config.get('blockchain.identifier');
const password = config.get('blockchain.password');
const apiCode= config.get('blockchain.apiCode');
const apiHost= config.get('blockchain.walletService.host');
const secondPassword= config.get('blockchain.secondPassword');

const  options = {}

if (secondPassword ) options.secondPassword = secondPassword;
if (apiCode ) options.apiCode = apiCode;
if (apiHost ) options.apiHost = apiHost;



const wallet = new MyWallet(identifier, password, options);

module.exports = wallet;
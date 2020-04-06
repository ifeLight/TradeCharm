var blockchain = require('blockchain.info')
const config = require('config')

var MyWallet = require('blockchain.info').MyWallet;
var Receive = require('blockchain.info/Receive')

const dotenv = require('dotenv')

dotenv.config()

var wallet = new MyWallet("85cab60b-7dc4-4003-907a-13c781c55760", "TradeCharm101.", {
    apiHost: "http://127.0.0.1:3000"
})

//console.log(process.env.BLOCKCHAIN_XPUB);



var myReceive = new Receive(
    process.env.BLOCKCHAIN_XPUB, 
    config.get('blockchain.callbackUri'), 
    config.get('blockchain.apiCode')
    )

//myReceive.checkgap().then(console.log).catch(console.error)
//myReceive.generate({secret: config.get('blockchain.secret')}).then(console.log).catch(console.error)



wallet.listAccounts().then(console.log).catch(console.error)



//console.log(wallet);
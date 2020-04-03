var blockchain = require('blockchain.info')

var MyWallet = require('blockchain.info').MyWallet;

var wallet = new MyWallet("85cab60b-7dc4-4003-907a-13c781c55760", "TradeCharm101.", {
    apiHost: "http://127.0.0.1:3000"
})

wallet.listAddresses().then(function (response) { console.log( response); })
.catch(console.error)
const Binance = require('binance-api-node').default;
const config = require('config');

// Authenticated client, can make signed calls
const client = Binance({
    apiKey: config.get('binance.apiKey'),
    apiSecret: config.get('binance.apiSecret'),
    //getTime: xxx, // time generator function, optional, defaults to () => Date.now()
  })


module.exports = client;
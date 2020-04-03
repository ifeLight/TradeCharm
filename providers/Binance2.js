const Binance = require('binance-api-node').default;
const dotenv = require('dotenv')

dotenv.config()

// Authenticated client, can make signed calls
const client = Binance({
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET,
    //getTime: xxx, // time generator function, optional, defaults to () => Date.now()
  })


module.exports = client;
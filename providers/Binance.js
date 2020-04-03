const Binance = require('node-binance-api');
const dotenv = require('dotenv')

dotenv.config()

const binance = new Binance().options({
    APIKEY: process.env.API_KEY,
    APISECRET: process.env.API_SECRET,
    useServerTime: true,
    recvWindow: 60000, // Set a higher recvWindow to increase response timeout
    verbose: true, // Add extra output when subscribing to WebSockets, etc
    log: log => {
        //console.log(log); // You can create your own logger here, or disable console output
    }
  });

module.exports =  binance;
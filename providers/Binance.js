const Binance = require('node-binance-api');
const config = require('config');

const binance = new Binance().options({
    APIKEY: config.get('binance.apiKey'),
    APISECRET: config.get('binance.apiSecret'),
    useServerTime: true,
    recvWindow: 60000, // Set a higher recvWindow to increase response timeout
    verbose: true, // Add extra output when subscribing to WebSockets, etc
    log: log => {
        //console.log(log); // You can create your own logger here, or disable console output
    }
  });

module.exports =  binance;
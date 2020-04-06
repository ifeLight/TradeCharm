const defer = require('config/defer').deferConfig;
const dotenv = require('dotenv');

dotenv.config()

module.exports = {
    db: {
        host: "localhost",
        port: 21017,
        username: "",
        password: "",
        dbname: "tradecharm",
        optionsCollection: process.env.OPTIONS_COLLECTION_NAME || 'options',
        uri: defer(function () {
            const { host, port, username, password, dbname} = this.db;
            if (process.env.MOGNGO_DB_URI) {
                return process.env.MOGNGO_DB_URI;
            }
            return `mongodb://${username && password ? username + ':' + password + '@ ': ''}${host}${port? ':' + port : ''}/${dbname}`;
        })
    },
    binance: {
        apiKey: process.env.BINANCE_API_KEY,
        apiSecret: process.env.BINANCE_API_SECRET,
    },
    blockchain: {
        password: process.env.BLOCKCHAIN_PASSWORD,
        identifier: process.env.BLOCKCHAIN_IDENTIFIER,
        apiCode: Boolean(process.env.BLOCKCHAIN_API_KEY) ? process.env.BLOCKCHAIN_API_KEY : null,
        secondPassword: Boolean(process.env.BLOCKCHAIN_SECOND_PASSWORD) ? process.env.BLOCKCHAIN_SECOND_PASSWORD : null,
        callbackUri: process.env.BLOCKCHAIN_CALLBACK_URI ? process.env.BLOCKCHAIN_CALLBACK_URI : "https://tradecharm/callback/blockchain",
        walletService: {
            host: process.env.WALLET_SERVICE_HOST || "http://localhost:3000",
        },
        secret: process.env.BLOCKCHAIN_CALLBACK_SECRET || "tradecharmapisecret",
    }
}
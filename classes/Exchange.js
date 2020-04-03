const client = require('../providers/Binance')
const client2 = require('../providers/Binance2')

class Exchange {
    constructor () {
        // Constructor
    }

    static async getPriceNairaFromQuantity(coin, amount) {
        try {
            let initial = 0;
            let priceNGN;
            let coinPriceUSD;
            const initialAmount = amount;
            const transactionPercent = 0.1 //in percentage
            const withdrawalCost = 250 // For the fixed withdrawal in Naira

            amount = Number(amount) - ((transactionPercent / 100) * Number(amount))
            if (coin == "BTC") {
                const book = await client2.book({ symbol: 'BTCNGN' })
                const bids = book.bids;
                const coinTicker =  await client2.avgPrice({ symbol: 'BTCUSDT' })
                
                coinPriceUSD = coinTicker.price
                for (const bid of bids) {
                    if (amount > initial) {
                        priceNGN = Number(bid.price)
                        initial = Number(bid.quantity) + initial
                        //console.log(bid);
                    } else {
                        break;
                    }
                }
            }
            const amountInUSD = Number(coinPriceUSD) * Number(amount);
            const amountInNGN = (Number(priceNGN) * Number(amount)) - withdrawalCost;
            const perDollarPriceInNGN  = Number(amountInNGN) / Number(amountInUSD)
            const obj = {
                NGN_price: priceNGN,
                COIN_USD_price: Number(coinPriceUSD),
                per_dollar_price_NGN:  perDollarPriceInNGN,
                coin_amount: initialAmount,
                USD_value: amountInUSD,
            }
            return obj;
        
        } catch (error) {
            throw error
        }
    }

    static async symbolDetails(symbol) {
        try {
            const exchangeDetails = await client.futuresExchangeInfo();
            const symbols = exchangeDetails.symbols;
            const theSymbol = symbols.find(sym => sym.symbol == symbol) 
            return theSymbol;

        } catch (error) {
            throw error
        }
    }

    static async amountConvert (amount, to, from = "USDT") {
        try {
            if (to == from) {
                return Number(amount);
            }
            const prices = await client2.futuresPrices();
            if (from == "USDT") {
                return Number(amount) / Number(prices[to + from] )
            } else {
                const val = Number(amount) *  Number(prices[from + 'USDT'] )
                return  val / Number(prices[to + 'USDT'] )
            }
            
        } catch (error) {
            throw error;
        }
    }

    static async  retouchAmountAndPrice ({price, amount, symbol, amountInCurrency = false}) {
        //This function is to to retouch the amount and price before an order
        // meant to return an object of amount and price

        try {
            let obj = {};
            const [asset] = symbol.split('USDT')
            let symbolDetails;

            if (!amountInCurrency || price) {
                symbolDetails = await Exchange.symbolDetails(symbol);
            }

            if (!amountInCurrency) {
                const positions = await Exchange.fetchPositions();
                const { leverage } = positions[symbol];
                let amountInAsset = await Exchange.amountConvert(amount, asset, "USDT");
                let leveragedAmountInAsset = Number(amountInAsset) * Number(leverage);
                const symbolAmount = Number(leveragedAmountInAsset.toFixed(symbolDetails.quantityPrecision));
                obj.amount =  Math.abs(symbolAmount);
            } else {
                obj.amount = Math.abs(amount);
            }

            if (price && price != 0) {
                price = Number(price);
                const symbolPrice = Number(price.toFixed(symbolDetails.pricePrecision));
                obj.price = Math.abs(symbolPrice)
            }
            return obj;
        } catch (error) {
            throw error;
        }
    }

    static async buyOrder ({symbol= "BTCUSDT", amount = 10, price, amountInCurrency = false})  {
        try {
            let result;
            const priceAndAmount = await Exchange.retouchAmountAndPrice({symbol, amount, price, amountInCurrency})

            if (price) {
                 result = await client.futuresBuy( symbol, priceAndAmount.amount, priceAndAmount.price ) 
            } else {
                result = await client.futuresMarketBuy( symbol, priceAndAmount.amount ) 
            }
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async cancelOrder (currency = "USDT") {
        try {
            const result = await client.futuresCancelAll( currency );
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async fetchOrders (currency = "USDT") {
        try {
            const orders = await client.futuresOpenOrders( currency );
            return orders;
        } catch (error) {
            throw error;
        }
    }

    static async fetchPositions () {
        try {
            const positions = await client.futuresPositionRisk();
            return positions;
        } catch (error) {
            throw error;
        }
    }

    static async getBalance (currency = "USDT") {
        try {
            const balances = await client.futuresBalance();
            const balance = balances.find((data) => {
                return data.asset == currency;
            })
            return balance;
        } catch (error) {
            throw error;
        }
    }

    static async getCandles ({symbol = "BTCUSDT", interval = "5m", limit = 100, startTime, endTime}) {
        try {
            const options = {};
            if (startTime) options.startTime = startTime;
            if (endTime) options.endTime = endTime;
            const candles = await client2.futuresCandles({  
                ...options,
                symbol,
                limit, 
                interval
            })
    
            return candles;
        } catch (error) {
            throw error;
        }
    }

    static async getDepth ({symbol = "BTCUSDT",  limit = 100, }) {
        try {
            const depth = await client2.futuresBook({ 
                symbol,
                limit, 
            })
    
            return depth;
        } catch (error) {
            throw error;
        }
    }

    static async sellOrder ({symbol= "BTCUSDT", amount = 10, price, amountInCurrency = false}) {
        try {
            let result;
            const priceAndAmount = await Exchange.retouchAmountAndPrice({symbol, amount, price, amountInCurrency});
            //console.log(priceAndAmount);
            if (price) {
                 result = await client.futuresSell( symbol, priceAndAmount.amount, priceAndAmount.price ) 
            } else {
                result = await client.futuresMarketSell( symbol, priceAndAmount.amount ) 
            }
    
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async getTicker (symbol = "BTCUSDT") {
        try {
            const tickers = await client2.futuresAllBookTickers();
            return tickers[symbol];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Exchange;
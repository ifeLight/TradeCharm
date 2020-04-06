const Receive = require('blockchain.info/Receive')
const config = require('config')

//const callback = ;
//const key = ;


module.exports = function (xpub, id) {
    return new Receive(xpub, callback, key, options)
}
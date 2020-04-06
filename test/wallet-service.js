const chai = require('chai')
const chaiHttp = require('chai-http')

const config = require('config')
var MyWallet = require('blockchain.info/MyWallet')

chai.use(chaiHttp);

const identifier = config.get('blockchain.')
const password = config.get('blockchain.')


describe('The Blockchain Wallet Service', () => {
    let wallet;
    before(() => {
        wallet = new MyWallet(identifier, password, options)
    });
    it('It Should be connected', () => {
        
    });
});
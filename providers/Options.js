const { MongoStorage } = require('mongodb-keyval-storage')
const config  = require('config')
const dotenv = require('dotenv')

dotenv.config()

let theStorage = new MongoStorage({
    db: config.get('db.url'),
    collectionName: config.get('db.optionsCollection')
})

module.exports = theStorage;


const mongoose = require('mongoose')
const config = require('config')

mongoose.Promise = global.Promise
const DB_URI = config.dbUrl

const connection = mongoose.connect(DB_URI, {
    useMongoClient: true,
})

require('./user')

module.exports = connection

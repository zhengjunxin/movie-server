const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const config = require('config')

const saltRounds = config.get('saltRounds')

const Schema = new mongoose.Schema({
    name: String,
    password: String,
})

Schema.pre('save', function (next) {
    const user = this
    const password = user.password

    bcrypt.genSalt(saltRounds)
        .then(salt => {
            return bcrypt.hash(password, salt)
        })
        .then(hash => {
            user.password = hash
            next()
        })
        .catch(err => {
            console.log('-err', err)
            next()
        })
})

Schema.methods = {
    comparePassword(password) {
        return bcrypt.compare(password, this.password)
    }
}

const User = mongoose.model('User', Schema)

module.exports = User
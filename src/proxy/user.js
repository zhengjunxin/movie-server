const User = require('../models/user')

exports.getUsers = () => {
    return User.find()
}
exports.add = user => {
    return User.create(user)
}
exports.update = (_id, props) => {
    return User.findOneAndUpdate({
        _id,
    }, {
        $set: props,
    }, {
        new: true,
    })
}
exports.remove = (_id) => {
    return User.findOneAndRemove({
        _id,
    })
}
exports.compare = (_id, password) => {
    return User.findById(_id)
        .then(user => {
            return user.comparePassword(password)
        })
}
exports.getUser = _id => {
    return User.findById(_id)
}
exports.getUserByName = name => {
    return User.findOne({
        name,
    })
}